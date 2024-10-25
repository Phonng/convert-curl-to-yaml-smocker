export const getResponseArray = {
  CURL_COMMAND: `curl 'https://api-man1.phongvh.vn/api/languages/all'`,
  SUCCESS_STATUS_CODES: 200,
  RESPONSE: `[[{{ "Id": 1, "Code": "vi-VN", "Name": "Tiếng Việt", "FullName": "Tiếng Việt", "IsActive": true, "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png" }]`,
  SMOCKERD: `- request: \n    path: /api/languages/all\n    method: GET\n  response: \n    status: 200\n    body: >\n      [\n        {\n                "Id": 1,\n                "Code": "vi-VN",\n                "Name": "Tiếng Việt",\n                "FullName": "Tiếng Việt",\n                "IsActive": true,\n                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png"\n        }\n]\n`,
}

export const postDataObjectResponseObject = {
  CURL_COMMAND: `curl 'https://payment-dev.kiotfinance.vn/api-sdk/v1.0.0/generate-qr' \
  --data-raw '{{"service_type":"","qr_type":"","payment_id":"1234567","payment_code":"VCB","branch_id":"135","amount":688800,"content":"","uuid":"WN7f6d5a35-3d8d-43bb-8840-7f156d49034da98d55a9-4a69-4de9-bb84-4996d7b3889a","merchant_code":"retail","merchant_id":"1140"}'`,
  SUCCESS_STATUS_CODES: 200,
  RESPONSE: `{{"image":"data:image","transaction_id":1680473,"qr_string":"00020101021238510010A0000 6304966B","kov_code":"KOVQR05100NT","payment_req_id":"KOVQR05100NT"}`,
  SMOCKERD: `- request:
    method: POST
    path: /api-sdk/v1.0.0/generate-qr
    body:
      payment_id: '1234567'
      payment_code: VCB
      branch_id: '135'
      amount: 688800
      uuid: >-
        WN7f6d5a35-3d8d-43bb-8840-7f156d49034da98d55a9-4a69-4de9-bb84-4996d7b3889a
      merchant_code: retail
      merchant_id: '1140'
  response:
    status: 200
    body: >-
            {{"image":"data:image","transaction_id":1680473,"qr_string":"00020101021238510010A0000 6304966B","kov_code":"KOVQR05100NT","payment_req_id":"KOVQR05100NT"}
`
}