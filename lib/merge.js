// https://github.com/nodeca/js-yaml
var yaml = require('js-yaml');
var fs = require('fs');
var debug = require('debug');

var getResources = function() {

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

module.exports = {
  merge: merge
};
