export const GET_CURL_COMMAND = `curl 'https://api-man1.phongvh.vn/api/languages/all' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'dnt: 1' \
  -H 'fingerprintkey: fb7ed6256cd1d20fd7fcc0467f4569e9_Edge_Desktop_Máy tính Mac OS' \
  -H 'isusekvclient: 1' \
  -H 'origin: https://cms-kms.phongvh.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://cms-kms.phongvh.com/' \
  -H 'retailer: cms-kms' \
  -H 'sec-ch-ua: "Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0' \
  -H 'x-language: vi-VN'`
export const SUCCESS_STATUS_CODES = 200
export const GET_RESPONSE = `[[{{ "Id": 1, "Code": "vi-VN", "Name": "Tiếng Việt", "FullName": "Tiếng Việt", "IsActive": true, "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png" }}]]`
export const GET_SMOCKERD = `- request:
    path: /api/languages/all
    method: GET
    headers:
      accept: application/json, text/plain, */*
      accept-language: en-US,en;q=0.9
      dnt: 1
      fingerprintkey: fb7ed6256cd1d20fd7fcc0467f4569e9_Edge_Desktop_Máy tính Mac OS
      isusekvclient: 1
      origin: https://cms-kms.phongvh.com
      priority: u=1, i
      referer: https://cms-kms.phongvh.com/
      retailer: cms-kms
      sec-ch-ua: '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"'
      sec-ch-ua-mobile: ?0
      sec-ch-ua-platform: "macOS"
      sec-fetch-dest: empty
      sec-fetch-mode: cors
      sec-fetch-site: cross-site
      user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0
      x-language: vi-VN
  response:
    status: 200
    body: >
      [
        {
                "Id": 1,
                "Code": "vi-VN",
                "Name": "Tiếng Việt",
                "FullName": "Tiếng Việt",
                "IsActive": true,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/vn.png"
        },
        {
                "Id": 2,
                "Code": "en-US",
                "Name": "English",
                "FullName": "Tiếng Anh",
                "IsActive": true,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/us.png"
        },
        {
                "Id": 3,
                "Code": "km-KH",
                "Name": "ភាសាខ្មែរ",
                "FullName": "Khmer (Cambodia)",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/kh.png"
        },
        {
                "Id": 4,
                "Code": "ru-RU",
                "Name": "Русский",
                "FullName": "Nga",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/ru.png"
        },
        {
                "Id": 5,
                "Code": "ja-JP",
                "Name": "日本語",
                "FullName": "Nhật Bản",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/jp.png"
        },
        {
                "Id": 6,
                "Code": "zh-CN",
                "Name": "中国人",
                "FullName": "Trung Quốc",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/cn.png"
        },
        {
                "Id": 7,
                "Code": "lo-LA",
                "Name": "ພາສາລາວ",
                "FullName": "Lào",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/la.png"
        },
        {
                "Id": 8,
                "Code": "ko-KR",
                "Name": "한국어",
                "FullName": "Hàn Quốc",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/kr.png"
        },
        {
                "Id": 9,
                "Code": "id-ID",
                "Name": "bahasa Indo",
                "FullName": "Indonesia",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/id.png"
        },
        {
                "Id": 10,
                "Code": "ms-MY",
                "Name": "Malaysia",
                "FullName": "Malaysia",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/my.png"
        },
        {
                "Id": 11,
                "Code": "my-MM",
                "Name": "မြန်မာဘာသာစကား",
                "FullName": "Myanmar (Burma)",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/mm.png"
        },
        {
                "Id": 12,
                "Code": "fil-PH",
                "Name": "Filipino",
                "FullName": "Philippines",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/ph.png"
        },
        {
                "Id": 13,
                "Code": "pt-PT",
                "Name": "Portugal",
                "FullName": "Bồ Đào Nha",
                "IsActive": false,
                "Flag": "https://cdn-app.phongvh.vn/retailler/Content/img/country-flags/pt.png"
        }
]
`
