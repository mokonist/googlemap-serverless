sam build &&
sam package --s3-bucket BUCKET_NAME_HERE --output-template-file packaged.yaml  &&
sam deploy --template-file packaged.yaml --stack-name location-stack  --capabilities CAPABILITY_IAM
