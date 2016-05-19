[![Build Status](https://travis-ci.org/abtris/swagger-merge.svg?branch=master)](https://travis-ci.org/abtris/swagger-merge)

# Swagger merge

Merge Swagger API Document and Swagger Extensions for AWS API Gateway

## Installation

```console
npm install swagger-merge-extensions
```

## Usage

We have separate API in Swagger format and definition for AWS Gateway Integration in another file:

### Swagger file

```yml
---
swagger: "2.0"
info:
  version: "2016-04-29T09:09:33Z"
  title: "api-client"
host: "api-behind-aws-gateway.example.com"
schemes:
- "https"
paths:
  /get/{vanity}:
    get:
      produces:
      - "application/json"
      parameters:
      - name: "authentication"
        in: "header"
        required: true
        type: "string"
      - name: "vanity"
        in: "path"
        required: true
        type: "string"
      responses:
        200:
          description: "200 response"
          schema:
            $ref: "#/definitions/apiClientReponse"
  /publish/{vanity}:
    post:
      produces:
      - "application/json"
      parameters:
      - name: "content_type"
        in: "header"
        required: false
        type: "string"
      - name: "authentication"
        in: "header"
        required: true
        type: "string"
      - name: "accept"
        in: "header"
        required: false
        type: "string"
      - name: "vanity"
        in: "path"
        required: true
        type: "string"
      - name: "user_agent"
        in: "header"
        required: false
        type: "string"
      responses:
        200:
          description: "200 response"
          schema:
            $ref: "#/definitions/apiClientReponse"
definitions:
  apiClientReponse:
    type: "object"
    required:
    - "code"
    - "error"
    - "message"
    properties:
      error:
        type: "boolean"
      message:
        type: "string"
      code:
        type: "string"
```
### Extensions definitions file

```yml
---
paths:
  /get/{vanity}:
    get:
      x-amazon-apigateway-integration:
        responses:
          default:
            statusCode: "200"
        requestParameters:
          integration.request.path.vanity: "method.request.path.vanity"
          integration.request.header.authentication: "method.request.header.authentication"
        httpMethod: "GET"
        uri: "https://api.example.com/get/{vanity}"
        type: "http"
  /publish/{vanity}:
    post:
      x-amazon-apigateway-integration:
        responses:
          default:
            statusCode: "200"
        requestParameters:
          integration.request.path.vanity: "method.request.path.vanity"
          integration.request.header.authentication: "method.request.header.authentication"
        httpMethod: "POST"
        uri: "https://api.example.com/publish/{vanity}"
        type: "http"
```

We don't need integration details in generated documentation (for example: [apiary.io](https://apiary.io)).

Out scripts merge files together and we can import them into AWS Gateway

```js
var sme = require('swagger-merge-extensions');
var fs = require('fs');

var apiPath = "./test/fixtures/api.yml";
var extensionsPath = "./test/fixtures/extensions.yml";

fs.writeFileSync('api-full.yml', sme.merge( apiPath, extensionsPath));
```


### Import to AWS API Gateway

```console
aws apigateway put-rest-api  --rest-api-id $1 --mode overwrite --parameters {\"extensions\":\"integrations\"} --body file://./api.json
```
