## T16-Backend

T16-Backend is a broker interface that responsible to handle each messaging stream between all clients and server based system and tools such as databases, cache tools but also socket & notification services as well. T16-Backend has a extremely lightweight structure design and could be extended easily at anytime.

This document shows all rescource URL's that implemented and responded by the service only for now.

## Base URL

`http://qeremy.com:3000`

## Request Headers

Expected and implemented headers are;

```
// content type for send/recv acts
Content-Type: application/json
Accept: application/json

// en or tr, default=en
Accept-Language: en

// device id that used all the time (unique)
X-Device-Id: xxx

// access token (unique)
X-Access-Token: xxx
```

## Endpoints

Notice: Excepting `/login`, all endpoints require `X-Access-Token` header with a valid access token provided by service. And all endpoints require `X-Device-Id` header with a unique value that used generated once and used for each request. Also only JSON data accepted as body data.

### Authorization

`GET /login`

#### Request Body

| Name     | Type    | Required  | Description |
| -------- | ------- | --------- | ----------- |
| email    | String  | Yes       | Client's email address. |
| password | String  | Yes       | -           |

#### Response Body

```json
{
   "error": {
      "code": 0,
      "text": ""
   },
   "data": {
      "access_token": "a9d846ab00a357e169b708c3ea5e53a4"
   }
}
```
