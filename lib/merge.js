// https://github.com/nodeca/js-yaml
var yaml = require('js-yaml');
var fs = require('fs');
var debug = require('debug');

// http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject
var swaggerOperationObject = {
  "paths": [
    "x-amazon-apigateway-auth",
    "x-amazon-apigateway-integration"
  ]
};

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-scheme-object
var swaggerSecurityObject = {
  "securityDefinitions": [
    "x-amazon-apigateway-authorizer",
    "x-amazon-apigateway-authtype"
  ]
};

var merge = function (apiFile, extensionsFile) {
  var extensions, api;
  try {
    var apiString = fs.readFileSync(apiFile, 'utf8');
    api = yaml.safeLoad(apiString.toString());
  } catch (e) {
    console.error(e);
  }
  try {
    var extensionsString = fs.readFileSync(extensionsFile, 'utf8');
    extensions = yaml.safeLoad(extensionsString.toString());
  } catch (e) {
    console.error(e);
  }


  for (var path in extensions.paths) {
    for (var method in extensions.paths[path]) {
      api.paths[path][method]["x-amazon-apigateway-integration"] = extensions.paths[path][method]["x-amazon-apigateway-integration"];
    }
  }
  return yaml.safeDump(api);
};

var split = function(apiWithSwaggerExtensionsFile) {
  var fullApi, api = {}, extensions = { "paths": {} };
  try {
    var fullApiString = fs.readFileSync(apiWithSwaggerExtensionsFile, 'utf8');
    fullApi = yaml.safeLoad(fullApiString.toString());
  } catch (e) {
    console.error(e);
  }
  api = fullApi;
  for (var path in fullApi.paths) {
    extensions.paths[path] = {};
    for (var method in fullApi.paths[path]) {
      extensions.paths[path][method] = {};
      if (fullApi.paths[path][method]["x-amazon-apigateway-integration"]) {
        extensions.paths[path][method]["x-amazon-apigateway-integration"] = fullApi.paths[path][method]["x-amazon-apigateway-integration"];
        delete api.paths[path][method]["x-amazon-apigateway-integration"];
      }
    }
  }
  var output = {
    "extensions": extensions,
    "api": api
  };
  return output;
};

module.exports = {
  merge: merge,
  split: split
};
