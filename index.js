const fs = require("fs");
const XMLParser = require("fast-xml-parser")

const cfgFileLocation = './nuget.config'


const curContents = fs.readFileSync(cfgFileLocation, 'utf8');

const json = XMLParser.parse(curContents, {ignoreAttributes: false});

const sourceKeys = [];

if (typeof json.configuration.packageSources != 'undefined') {
  console.log(json.configuration.packageSources);
  if (typeof json.configuration.packageSources.add != 'undefined') {
        // file has at least one <add>
        if (typeof json.configuration.packageSources.add[0] === 'undefined') {
          // file has only one <add>
          if (
            json.configuration.packageSources.add['@_value']
              .toLowerCase()
              .includes(feedUrl.toLowerCase())
          ) {
            const key = json.configuration.packageSources.add['@_key'];
            sourceKeys.push(key);
          }
        } else {
          // file has 2+ <add>
          for (
            let i = 0;
            i < json.configuration.packageSources.add.length;
            i++
          ) {
            const source = json.configuration.packageSources.add[i];
            const value = source['@_value'];
            if (value.toLowerCase().includes(feedUrl.toLowerCase())) {
              const key = source['@_key'];
              sourceKeys.push(key);
            }
          }

          // json.configuration.packageSources.add.forEach(source => {
          //   const value = source['@_value'];
          //   if (value.toLowerCase().includes(feedUrl.toLowerCase())) {
          //     const key = source['@_key'];
          //     sourceKeys.push(key);
          //   }
          // });
        }
      }
    }