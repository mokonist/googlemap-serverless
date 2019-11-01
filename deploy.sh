sam build &&
sam package --s3-bucket BUCKET_NAME_HERE --output-template-file template.yaml  &&
sam deploy --template-file template.yaml --stack-name location-stack  --capabilities CAPABILITY_IAM
