import os
import sys
import kagglehub

def prepare_kaggle_crop_dataset():
    print("Downloading Kaggle Crop Disease Detection Dataset...")
    
    path = kagglehub.dataset_download("snikhilrao/crop-disease-detection-dataset")
    print("Dataset Downloaded Successfully!")
    print("Path to dataset files:", path)

    print("\nInspecting Dataset Structure:")
    if os.path.exists(path):
        contents = os.listdir(path)
        for item in contents:
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                sub_items = os.listdir(item_path)
                print(f"  [Folder] '{item}': contains {len(sub_items)} items/classes")
                # Print first 5 sub items if any
                for sub in sub_items[:8]:
                    print(f"    - {sub}")
            else:
                print(f"  [File] '{item}'")
                
    return path

if __name__ == '__main__':
    prepare_kaggle_crop_dataset()
