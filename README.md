## T16-Backend

T16-Backend is a broker interface that responsible to handle each messaging stream between all clients and server based system and tools such as databases, cache tools but also socket & notification services as well. T16-Backend has a extremely lightweight structure design and could be extended easily at anytime.

This document shows all rescource URL's that implemented and responded by the service only for now.

## Base URL

`http://qeremy.com:3000`

## Endpoints

Notice: Excepting `/login`, all endpoints require `X-Access-Token` header with a valid access token provided by service. Also all endpoints require `X-Device-Id` header with a unique ID.

### Authorization

`GET /login`

#### Request Parameters

| Name | Type | Required | Description |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |



