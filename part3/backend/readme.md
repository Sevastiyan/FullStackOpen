# Phonebook server

Address:

`https://sevi-phonebook-app.herokuapp.com/`

## Example requests:
```
GET https://sevi-phonebook-app.herokuapp.com/api/persons

GET https://sevi-phonebook-app.herokuapp.com/api/persons/1

DELETE https://sevi-phonebook-app.herokuapp.com/api/persons/1

POST https://sevi-phonebook-app.herokuapp.com/api/persons HTTP/1.1
content-type: application/json


{
    "name": "name",
    "number": "12344"
}
```