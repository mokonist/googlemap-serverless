//@ts-check
const aws = require('aws-sdk');
const uuid = require('uuid/v4')
const documentClient = new aws.DynamoDB.DocumentClient({region: "ap-northeast-1"})

const TableName = "googlemap";


exports.handler = async (event, context, callback) => {
  // POSTだったら座標をDynamoDBに登録する
  if(event.httpMethod === "POST") {
    const body = JSON.parse(event.body)
    const params = {
      TableName,
      Item:{
        id: uuid(),
        lat: body.lat,
        lng: body.lng
      }
    }
    const result = await documentClient.put(params).promise();
    
    callback(null,{statusCode: result != null ? 200 : 502, headers: {"Access-Control-Allow-Origin": "*"}})
   
  }
  // GETだったら座標一覧を返却する
  if (event.httpMethod === "GET") {
    const params = {
      TableName
    }
    const result = await documentClient.scan(params).promise()

    console.log(result.Items)
    callback(null, {statusCode: 200, body: JSON.stringify(result.Items), headers: {"Access-Control-Allow-Origin": "*"}})
  }
}
