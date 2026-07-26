# AgriSure (KrishiNetra AI)

AgriSure / KrishiNetra AI is an AI-powered crop insurance claim verification and audit engine. It combines computer vision (Ultralytics YOLOv8), multi-source satellite telemetry (NDVI / Health Index), guided field motion proofs, and automated claim decision execution.

---

## 🌩️ Cloud Relational Database Integration (PostgreSQL / Neon DB)

AgriSure supports both local offline development using SQLite (`agrisure.db`) and production cloud hosting using **Cloud PostgreSQL / Neon DB**.

### 1. Requirements

Install PostgreSQL driver dependencies for Python:
```bash
pip install psycopg2-binary
# or
pip install psycopg
```

### 2. Configure Environment Variable

Set your PostgreSQL / Neon DB connection URI in your environment or `.env` file:
```bash
export DATABASE_URL="postgresql://username:password@ep-cool-lake-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Migrate Local SQLite Data to Cloud PostgreSQL / Neon DB

Use the built-in migration script to copy all existing farms, claims, and telemetry history from `agrisure.db` to your Cloud PostgreSQL database:

```bash
python migrate_to_postgres.py --url "postgresql://username:password@ep-cool-lake-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

---

## 🚀 Running locally

### 1. Start Python Backend API
```bash
python backend.py
```
*(Runs FastAPI server on `http://localhost:8000`)*

### 2. Start Frontend Dev Server
```bash
npm run dev
```
*(Runs Vite React application)*
