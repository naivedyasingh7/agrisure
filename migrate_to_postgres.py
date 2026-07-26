#!/usr/bin/env python3
"""
AgriSure (KrishiNetra AI) - SQLite to PostgreSQL / Neon DB Migration Tool
Migrates all tables (farms, telemetry, claims) from local agrisure.db into a Cloud PostgreSQL database.
"""

import os
import sys
import sqlite3
import argparse

DB_PATH = "agrisure.db"

def migrate(target_url: str):
    print("=" * 60)
    print("🌾 AgriSure Database Migration: SQLite -> Cloud PostgreSQL / Neon DB")
    print("=" * 60)
    
    if not os.path.exists(DB_PATH):
        print(f"❌ Source SQLite database '{DB_PATH}' not found!")
        sys.exit(1)

    # Standardize connection string format for psycopg2/psycopg
    if target_url.startswith("postgres://"):
        target_url = target_url.replace("postgres://", "postgresql://", 1)

    # Detect PostgreSQL Driver
    pg_conn = None
    try:
        import psycopg2
        print("🔗 Connecting to Cloud PostgreSQL using psycopg2...")
        pg_conn = psycopg2.connect(target_url)
    except ImportError:
        try:
            import psycopg
            print("🔗 Connecting to Cloud PostgreSQL using psycopg...")
            pg_conn = psycopg.connect(target_url)
        except ImportError:
            print("❌ Neither 'psycopg2-binary' nor 'psycopg' module is installed.")
            print("💡 Run: pip install psycopg2-binary")
            sys.exit(1)
    except Exception as err:
        print(f"❌ Failed to connect to Cloud PostgreSQL: {err}")
        sys.exit(1)

    # Source SQLite Connection
    sqlite_conn = sqlite3.connect(DB_PATH)
    sqlite_cur = sqlite_conn.cursor()
    pg_cur = pg_conn.cursor()

    try:
        # 1. Create PostgreSQL Schema
        print("\n🛠️  Initializing PostgreSQL database schema...")
        
        pg_cur.execute('''
            CREATE TABLE IF NOT EXISTS farms (
                id TEXT PRIMARY KEY,
                farmer_name TEXT NOT NULL,
                crop TEXT NOT NULL,
                location TEXT NOT NULL,
                acreage DOUBLE PRECISION NOT NULL,
                status TEXT NOT NULL
            );
        ''')

        pg_cur.execute('''
            CREATE TABLE IF NOT EXISTS claims (
                id SERIAL PRIMARY KEY,
                farm_id TEXT NOT NULL,
                farmer_name TEXT NOT NULL,
                crop TEXT NOT NULL,
                scenario TEXT NOT NULL,
                damage_percent INTEGER NOT NULL,
                suggested_payout DOUBLE PRECISION NOT NULL,
                risk_score INTEGER NOT NULL,
                status TEXT NOT NULL,
                video_hash TEXT,
                gps_verified BOOLEAN DEFAULT TRUE,
                created_at TEXT NOT NULL,
                FOREIGN KEY(farm_id) REFERENCES farms(id)
            );
        ''')

        pg_cur.execute('''
            CREATE TABLE IF NOT EXISTS telemetry (
                id SERIAL PRIMARY KEY,
                farm_id TEXT NOT NULL,
                week TEXT NOT NULL,
                date TEXT NOT NULL,
                health_index INTEGER NOT NULL,
                ndvi_score DOUBLE PRECISION NOT NULL,
                weather TEXT NOT NULL,
                note TEXT NOT NULL,
                FOREIGN KEY(farm_id) REFERENCES farms(id)
            );
        ''')
        pg_conn.commit()
        print("✅ Schema created successfully.")

        # 2. Migrate Farms Table
        sqlite_cur.execute("SELECT id, farmer_name, crop, location, acreage, status FROM farms")
        farms_data = sqlite_cur.fetchall()
        print(f"\n📦 Migrating {len(farms_data)} farm records...")
        for row in farms_data:
            pg_cur.execute('''
                INSERT INTO farms (id, farmer_name, crop, location, acreage, status)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO UPDATE SET
                    farmer_name = EXCLUDED.farmer_name,
                    crop = EXCLUDED.crop,
                    location = EXCLUDED.location,
                    acreage = EXCLUDED.acreage,
                    status = EXCLUDED.status;
            ''', row)
        pg_conn.commit()

        # 3. Migrate Telemetry Table
        sqlite_cur.execute("SELECT id, farm_id, week, date, health_index, ndvi_score, weather, note FROM telemetry")
        telemetry_data = sqlite_cur.fetchall()
        print(f"📦 Migrating {len(telemetry_data)} telemetry history records...")
        for row in telemetry_data:
            pg_cur.execute('''
                INSERT INTO telemetry (id, farm_id, week, date, health_index, ndvi_score, weather, note)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO UPDATE SET
                    farm_id = EXCLUDED.farm_id,
                    week = EXCLUDED.week,
                    date = EXCLUDED.date,
                    health_index = EXCLUDED.health_index,
                    ndvi_score = EXCLUDED.ndvi_score,
                    weather = EXCLUDED.weather,
                    note = EXCLUDED.note;
            ''', row)
        pg_conn.commit()

        # Reset sequence for telemetry ID
        pg_cur.execute("SELECT setval(pg_get_serial_sequence('telemetry', 'id'), coalesce(max(id), 1)) FROM telemetry;")

        # 4. Migrate Claims Table
        sqlite_cur.execute("SELECT id, farm_id, farmer_name, crop, scenario, damage_percent, suggested_payout, risk_score, status, video_hash, gps_verified, created_at FROM claims")
        claims_data = sqlite_cur.fetchall()
        print(f"📦 Migrating {len(claims_data)} claim records...")
        for row in claims_data:
            # Cast integer boolean 1/0 to Python bool True/False for PostgreSQL boolean column
            row_list = list(row)
            row_list[10] = bool(row_list[10])
            pg_cur.execute('''
                INSERT INTO claims (id, farm_id, farmer_name, crop, scenario, damage_percent, suggested_payout, risk_score, status, video_hash, gps_verified, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO UPDATE SET
                    farm_id = EXCLUDED.farm_id,
                    farmer_name = EXCLUDED.farmer_name,
                    crop = EXCLUDED.crop,
                    scenario = EXCLUDED.scenario,
                    damage_percent = EXCLUDED.damage_percent,
                    suggested_payout = EXCLUDED.suggested_payout,
                    risk_score = EXCLUDED.risk_score,
                    status = EXCLUDED.status,
                    video_hash = EXCLUDED.video_hash,
                    gps_verified = EXCLUDED.gps_verified,
                    created_at = EXCLUDED.created_at;
            ''', tuple(row_list))
        pg_conn.commit()

        # Reset sequence for claims ID
        pg_cur.execute("SELECT setval(pg_get_serial_sequence('claims', 'id'), coalesce(max(id), 1)) FROM claims;")

        print("\n🎉 Migration completed successfully!")
        print("💡 Set DATABASE_URL in your environment to use the Cloud Database with backend.py:")
        print(f"   export DATABASE_URL=\"{target_url}\"")

    except Exception as err:
        pg_conn.rollback()
        print(f"\n❌ Error during migration: {err}")
        sys.exit(1)
    finally:
        sqlite_conn.close()
        pg_conn.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Migrate AgriSure SQLite database to Cloud PostgreSQL / Neon DB")
    parser.add_argument("--url", type=str, help="PostgreSQL Connection URI (e.g. postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require)")
    args = parser.parse_args()

    db_url = args.url or os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL") or os.environ.get("NEON_DB_URL")

    if not db_url:
        print("❌ Error: No PostgreSQL connection URI specified.")
        print("Usage:")
        print("  python migrate_to_postgres.py --url \"postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require\"")
        print("  OR set environment variable DATABASE_URL before running.")
        sys.exit(1)

    migrate(db_url)
