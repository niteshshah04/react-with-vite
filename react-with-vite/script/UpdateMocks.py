import boto3
import json
import os

def download_and_update_s3_files(date, bucket_name, local_dir, mapping):
    s3 = boto3.client('s3')
    
    for s3_key, local_path in mapping.items():
        s3_key = s3_key.replace("{date}", date)  # Replace date placeholder if needed
        full_local_path = os.path.join(local_dir, local_path)
        os.makedirs(os.path.dirname(full_local_path), exist_ok=True)
        
        try:
            print(f"Downloading {s3_key} from S3 bucket {bucket_name}...")
            response = s3.get_object(Bucket=bucket_name, Key=s3_key)
            data = response['Body'].read().decode('utf-8')
            
            with open(full_local_path, 'w', encoding='utf-8') as f:
                f.write(data)
                
            print(f"Updated file: {full_local_path}")
        except Exception as e:
            print(f"Error downloading {s3_key}: {e}")

if __name__ == "__main__":
    date = "2025-04-11"
    bucket_name = "option-greek-data"
    local_dir = r"D:\Work\Market\FE\react-with-vite\react-with-vite"
    
    mapping = {
        f"oi-data/{date}_bullishStocks.json": "src/mock/getBullishOIDetails.json",
        f"oi-data/{date}_bearishStocks.json": "src/mock/getBearishOIDetails.json",
        f"AI/{date}/bullish.json": "src/mock/getBullishTrainedData.json",
        f"AI/{date}/bearish.json": "src/mock/getBearishTrainedData.json",
        f"oi-data/{date}_OIBuildUpMap.json": "src/mock/getGraphData.json"
    }
    
    download_and_update_s3_files(date, bucket_name, local_dir, mapping)
