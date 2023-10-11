
export function convertCurlToRequestObject(curlCommand: string) {
	if (!curlCommand) return
	const requestObject = {
		path: "",
		method: "GET", // Default method is GET
	};

	const lines = curlCommand.split("\n");

	for (const line of lines) {
		if (line.trim().startsWith("curl")) {
			const urlMatches = /'([^']+)'/g.exec(line);
			if (urlMatches) {
				const url = urlMatches[1];
				const urlParts = new URL(url);
				requestObject.query_params = {}
				requestObject.path = urlParts.pathname;
				const queryParams = urlParts.searchParams;

				for (const [param, value] of queryParams) {
					requestObject.query_params[param] = value;
				}
			}
			continue
		}
		if (line.trim().includes("accept: */*")) {//#TODO: check why
			continue
		}
		if (line.trim().startsWith("-H")) {
			const headerMatches = /-H '([^:]+): ([^']+)'/g.exec(line);

			if (headerMatches) {
				const headerName = headerMatches[1];
				const headerValue = headerName === 'sec-ch-ua' && headerMatches[2] ? `'${headerMatches[2]}'` : headerMatches[2]; //#TODO: check why

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
	const parseJson = JSON.parse(object.replaceAll('\n', ''))
	return JSON.stringify(parseJson, null, 8).replace(/\n(\s*)}$/, '\n      $1}');

}
export function jsonToYaml(jsonObj: object, indent = '  ') {
	let yamlString = '';

	for (const key in jsonObj) {
		if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
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