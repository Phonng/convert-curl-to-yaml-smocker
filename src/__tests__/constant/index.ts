export const getResponseArray = {
  GET_CURL_COMMAND: `curl 'https://api-man1.phongvh.vn/api/languages/all'`,
  SUCCESS_STATUS_CODES: 200,
  GET_RESPONSE: `[[{{ "Id": 1, "Code": "vi-VN", "Name": "Tiếng Việt", "FullName": "Tiếng Việt", "IsActive": true, "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png" }]`,
  GET_SMOCKERD: `- request: \n    path: /api/languages/all\n    method: GET\n  response: \n    status: 200\n    body: >\n      [\n        {\n                "Id": 1,\n                "Code": "vi-VN",\n                "Name": "Tiếng Việt",\n                "FullName": "Tiếng Việt",\n                "IsActive": true,\n                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png"\n        }\n]\n`,
}
