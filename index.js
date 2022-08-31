const fs = require("fs");
const XMLParser = require("fast-xml-parser")

const cfgFileLocation = './nuget.config'


const curContents = fs.readFileSync(cfgFileLocation, 'utf8');

const json = XMLParser.parse(curContents, {ignoreAttributes: false});

const sourceKeys = [];

if (typeof json.configuration?.packageSources?.add != 'undefined') {
  if (Array.isArray(json.configuration.packageSources.add)) {
    json.configuration.packageSources.add.forEach((source) => {
      const value = source["@_value"];
      if (value.toLowerCase().includes(feedUrl.toLowerCase())) {
        const key = source["@_key"];
        sourceKeys.push(key);
      }
    });
  } else {
    if (
      json.configuration.packageSources.add["@_value"]
        .toLowerCase()
        .includes(feedUrl.toLowerCase())
    ) {
      const key = json.configuration.packageSources.add["@_key"];
      sourceKeys.push(key);
    }
  }
}

