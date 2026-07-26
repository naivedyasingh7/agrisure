import os
from ultralytics import YOLO

# Dataset Path
DATASET_PATH = r"C:\Users\ASUS\.cache\kagglehub\datasets\snikhilrao\crop-disease-detection-dataset\versions\1\Plant Village Dataset"

def main():
    print("Starting Ultralytics YOLOv8 Classification Training (50 Epochs) on Kaggle Crop Disease Dataset...")
    print(f"Dataset path: {DATASET_PATH}")
    
    # 1. Load pretrained base classification model
    model = YOLO("yolov8n-cls.pt")
    
    # 2. Train model on 29 crop disease categories for 50 Epochs
    results = model.train(
        data=DATASET_PATH,
        epochs=50,        # Set to 50 Epochs as requested
        imgsz=224,        # Classification resolution
        batch=32,         # Batch size
        device="cpu",     # Use CPU (or 0 for GPU if available)
        name="agrisure_crop_disease_50epochs"
    )
    
    print("\nTraining completed successfully for 50 epochs!")
    print("Saved fine-tuned weights at: runs/classify/agrisure_crop_disease_50epochs/weights/best.pt")

if __name__ == '__main__':
    main()
