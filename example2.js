var sme = require('./lib');
var fs = require('fs');

var apiPath = "./test/fixtures/expected.yml";

var output = sme.split(apiPath);

fs.writeFileSync('extensions.yml', output.extensions);
fs.writeFileSync('api.yml', output.api);
