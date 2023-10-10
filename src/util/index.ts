
export function convertCurlToRequestObject(curlCommand) {
	if (!curlCommand) return
	const requestObject = {
		path: "",
		method: "GET", // Default method is GET
		query_params: {},
	};

	const lines = curlCommand.split("\n");

	for (const line of lines) {
		if (line.trim().startsWith("curl")) {
			const urlMatches = /'([^']+)'/g.exec(line);
			if (urlMatches) {
				const url = urlMatches[1];
				const urlParts = new URL(url);

				requestObject.path = urlParts.pathname;
				const queryParams = urlParts.searchParams;

				for (const [param, value] of queryParams) {
					requestObject.query_params[param] = value;
				}
			}
			continue
		}
		if (line.trim().includes("accept: */*")) {
			continue
		}
		if (line.trim().startsWith("-H")) {
			const headerMatches = /-H '([^:]+): ([^']+)'/g.exec(line);

			if (headerMatches) {
				const headerName = headerMatches[1];
				const headerValue = headerName === 'sec-ch-ua' && headerMatches[2] ? `'${headerMatches[2]}'` : headerMatches[2];
				if (headerName === 'sec-ch-ua')
					console.log('headerValue', headerValue);
				if (!requestObject.headers) {
					requestObject.headers = {};
				}
				requestObject.headers[headerName] = headerValue;
			}
			continue
		}
	}

	return requestObject;
}

export function convertResponseToResponseMock(object) {
	if (!object) return
	return object.replaceAll('\n', '')
}
export function jsonToYaml(jsonObj, indent = '  ') {
	let yamlString = '';

	for (const key in jsonObj) {
		if (jsonObj.hasOwnProperty(key)) {
			const value = jsonObj[key];
			const valueType = typeof value;

			if (valueType === 'object' && !Array.isArray(value)) {
				yamlString += `${indent}${key}:\n${jsonToYaml(value, `${indent}  `)}`;
			} else {
				yamlString += `${indent}${key}: ${value}\n`;
			}
		}
	}

	return yamlString;
}