var fs = require('fs');
var assert = require('chai').assert;
var swagger = require('../lib/merge');
var yaml = require('js-yaml');

var apiFile = __dirname + "/fixtures/api.yml";
var outputFile = __dirname + "/fixtures/expected.yml";
var extensionsFile = __dirname + "/fixtures/extensions.yml";


describe('Take swagger api file and swagger extensions file and merge them together', function(){
  it ('Compare with output file', function(){
    var expected = fs.readFileSync(outputFile);
    var returned = yaml.safeDump(yaml.safeLoad(expected.toString()));
    assert.deepEqual(swagger.merge(apiFile, extensionsFile), returned);
  });
});

describe('Take swagger api file with swagger extensions and split them to extensions and api standalone', function(){
  var returned;
  before(function(){
     returned = swagger.split(outputFile);
  });
  it ('Spliting files - Api check', function(){
    var expectedApi = yaml.safeLoad(fs.readFileSync(apiFile));
    var api = returned.api;
    assert.deepEqual(expectedApi, api);
  });
  it ('Spliting files - Extensions check', function(){
    var expectedExtensions = yaml.safeLoad(fs.readFileSync(extensionsFile));
    var extensions = returned.extensions;
    assert.deepEqual(expectedExtensions, extensions);
  });
});
