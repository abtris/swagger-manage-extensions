var sme = require('./lib');
var fs = require('fs');

var apiPath = "./test/fixtures/api.yml";
var extensionsPath = "./test/fixtures/extensions.yml";

fs.writeFileSync('api-full.yml', sme.merge( apiPath, extensionsPath));
