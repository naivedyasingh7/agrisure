import os

dataset_dir = r"C:\Users\ASUS\.cache\kagglehub\datasets\snikhilrao\crop-disease-detection-dataset\versions\1\Plant Village Dataset"

print("Scanning Plant Village Crop Disease categories...")
train_dir = os.path.join(dataset_dir, "Train")
if os.path.exists(train_dir):
    classes = os.listdir(train_dir)
    print(f"Found {len(classes)} crop disease categories:")
    for idx, c in enumerate(classes):
        num_images = len(os.listdir(os.path.join(train_dir, c)))
        print(f"  {idx + 1:02d}. {c} ({num_images} images)")
