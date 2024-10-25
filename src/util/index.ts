
export function convertCurlToRequestObject(curlCommand: string, options: { ignoreHeader: boolean }) {
  if (!curlCommand) return
  console.log('curlCommand', curlCommand);
  const requestObject = {
    path: "",
    method: "GET", // Default method is GET
  };
  const dataLine = curlCommand.match(/(--data|--data-raw)\s+'([^']*)'/);


  if (dataLine) {
    // curlCommand = dataLine[0].replaceAll(/\n+/g, '').replaceAll(" ", "");

    requestObject.method = 'POST'
  }

  const lines = curlCommand.split("\n");


  for (const line of lines) {
    if (line.trim().startsWith("curl")) {
      const urlMatches = /'([^']+)'/g.exec(line);
      if (urlMatches) {
        const url = urlMatches[1];
        const urlParts = new URL(url);
        requestObject.path = urlParts.pathname;
        const queryParams = urlParts.searchParams;

        if (queryParams.size)
          requestObject.query_params = {}

        for (const [param, value] of queryParams) {
          requestObject.query_params[param] = value;
        }
      }
      continue
    }
    if (line.trim().includes("accept: */*")) {//#TODO: check why
      continue
    }
    if ((line.trim().includes("-H") || line.trim().includes("--header")) && !options.ignoreHeader) {
      const formatLine = line.replaceAll(/\n+/g, '').replaceAll(" ", "")
      const headerMatches = /(-H|--header) '([^:]+): ([^']+)'/g.exec(formatLine);


      if (headerMatches) {
        const headerName = headerMatches[2];
        const headerValue = headerName === 'sec-ch-ua' && headerMatches[3] ? `'${headerMatches[3]}'` : headerMatches[3]; //#TODO: check why

        if (!requestObject.headers) {
          requestObject.headers = {};
        }
        requestObject.headers[headerName] = headerValue;
      }
      continue
    }
    if ((line.trim().startsWith("--data") || line.trim().startsWith("--data-raw"))) {
      const formatLine = line.replaceAll(/\n+/g, '').replaceAll(" ", "")
      const headerMatches = /(--data|--data-raw)'(\{(?:.|\n)*?\}|\[(?:.|\n)*?\])'/g.exec(formatLine);

      if (headerMatches) {
        const headerValue = isValidJSON(headerMatches[2]) ? JSON.parse(headerMatches[2]) : headerMatches[2];
        let body
        if (headerValue) {
          if (Array.isArray(headerValue)) {
            // Handle array of objects
            body = []
            headerValue.forEach((item, index) => {
              const newPrefix = `[${index}].`;

              body[index] = convertToBody(item, newPrefix)
            });
          } else {
            // Handle single object
            body = convertToBody(headerValue);
          }
        }
        requestObject.body = body;
      }
      continue
    }
    if (line.trim().startsWith("--request") || (line.trim().startsWith("-X"))) {
      const headerMatches = /(--request|-X)\s*('[^']*'|"[^"]*"|[^'"\s]+)/g.exec(line);
      const headerValue = headerMatches[2] ? headerMatches[2].replaceAll("'", ' ') : headerMatches[2];
      requestObject.method = headerValue;
    }
  }

  return requestObject;
}

export function convertResponseToResponseMock(object) {
  if (!object) return
  const parseJson = JSON.parse(object.replaceAll('\n', ''))

  return JSON.stringify(parseJson, null, 8).replace(/\n(\s*)}$/, '\n      $1}');

}
export function jsonToYaml(jsonObj: object, indent = '  ') {
  let yamlString = '';
  if (!jsonObj) return yamlString;
  if (Array.isArray(jsonObj)) {
    for (const object of jsonObj) {
      yamlString += jsonToYaml(object, `${indent}  `);
    }
  }
  else {
    for (const key in jsonObj) {
      if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
        const value = jsonObj[key];
        const valueType = typeof value;

        if (valueType === 'object' && !Array.isArray(value)) {
          yamlString += `${indent}${key}: \n${jsonToYaml(value, `${indent}  `)}`;
        } else if (valueType === 'object' && Array.isArray(value)) {
          yamlString += `${indent}${key}:\n`
          yamlString += jsonToYaml(value, `${indent}  `);

        }
        else {
          yamlString += `${indent}${key}: ${value}\n`;
        }
      }
    }
  }
  console.log(1)
  return yamlString;
}

const convertToBody = (obj, prefix = '') => {
  let body = {};

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        const newPrefix = `${prefix}${key}[${index}].`;
        if (typeof item === 'object') {
          const nestedObj = convertToBody(item, newPrefix);
          //if array it will display 'items[0].id' not items[0].id
          body = { ...body, ...quoteObjectKeys(nestedObj) };
        } else {
          if (item) {
            body[`${newPrefix}${key}`] = item;
          }
        }
      });
    } else if (typeof obj[key] === 'object') {
      const nestedObj = convertToBody(obj[key], `${prefix}${key}.`);
      body = { ...body, ...nestedObj };
    } else {
      if (!obj[key]) continue
      body[`${prefix}${key}`] = obj[key];
    }
  }
  return body;
};


export function getAcceptProxyOption(curl: string) {
  if (!curl) return ''
  const lines = curl.split("\n");
  const firstLine = lines?.[0]
  const requestObject = {}
  if (firstLine.trim().startsWith("curl")) {
    const urlMatches = /'([^']+)'/g.exec(firstLine);
    if (urlMatches) {
      const url = urlMatches[1];
      const urlParts = new URL(url);
      const splitEndpoint = urlParts.pathname ? urlParts.pathname.split('/') : urlParts.pathname
      const firstEndPoint = splitEndpoint?.[1]
      requestObject.request = {
        path: {
          matcher: 'ShouldMatch',
          value: `/${firstEndPoint}/.*`
        }
      }
      requestObject.proxy = {
        host: urlParts.origin,
        skip_verify_tls: true
      }
    }
  }
  return requestObject;

}


function quoteObjectKeys(obj: Record<string, any>): Record<string, any> {
  const quotedKeys: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      quotedKeys[`'${key}'`] = obj[key];
    }
  }
  return quotedKeys;
}

function isValidJSON(myString) {
  try {
    JSON.parse(myString);
    return true;
  } catch (e) {
    return false;
  }
}

