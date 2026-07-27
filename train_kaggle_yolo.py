import os
from ultralytics import YOLO

# Dataset Path
DATASET_PATH = r"C:\Users\ASUS\.cache\kagglehub\datasets\snikhilrao\crop-disease-detection-dataset\versions\1\Plant Village Dataset"

def main():
    print("Starting Ultralytics YOLOv8 Classification Training (50 Epochs) on Kaggle Crop Disease Dataset...")
    print(f"Dataset path: {DATASET_PATH}")
    
    # Check if existing checkpoint exists to resume
    checkpoint_path = r"runs/classify/agrisure_crop_disease_50epochs/weights/last.pt"
    if os.path.exists(checkpoint_path):
        print(f"Resuming training from checkpoint: {checkpoint_path}")
        model = YOLO(checkpoint_path)
        results = model.train(resume=True)
    else:
        # Load pretrained base classification model
        model = YOLO("yolov8n-cls.pt")
        results = model.train(
            data=DATASET_PATH,
            epochs=50,        # Set to 50 Epochs as requested
            imgsz=224,        # Classification resolution
            batch=32,         # Batch size
            device="cpu",     # Use CPU (or 0 for GPU if available)
            name="agrisure_crop_disease_50epochs"
        )
    
    print("\nTraining completed successfully!")
    print("Saved fine-tuned weights at: runs/classify/agrisure_crop_disease_50epochs/weights/best.pt")

if __name__ == '__main__':
    main()
