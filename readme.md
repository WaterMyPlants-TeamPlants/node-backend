# Water My Plants API

## API URL

https://plantswater.herokuapp.com/

## API Documentation

### General principles

#### Requests
This Web API follows the REST principles:
- resources are accessed using standard HTTPS requests
- HTTP requests are made to distinct API endpoints
- use HTTP verbs (GET, POST, PUT, DELETE, etc) based on the action taken

#### HTTP Methods and their roles
- GET - Retrieves existing resources
- POST - Creates a new resource
- PUT - Updates an existing resource
- DELETE - Deletes resources

## API Endpoints
- All Data is returned in JSON format

### Auth
#### POST /auth/register
Required fields:
```
{ 
  "password": "password", (128 char max)
  "username": "uniqueUsername", (128 char max, unique)
  "telephone": "000-000-0000" (128 char max)
}
```
Returns 
  {
    "username": "uniqueUsername",
    "id": 1
    "telephone": "000-000-0000"
  }

#### POST /auth/login
Required fields:
```
{
  "username": "uniqueUsername",
  "password": "password"
}
```
Returns 
```
{
  "user": {
        "username": "uniqueUsername",
        "id": 1,
        "telephone": "000-000-0000"
    },
    "token": "authentication token"

}
```

**ALL of the following non-auth requests require an authorization token in the header**

### Users
#### GET /api/users/:id
- Get User By ID

Returns user object

#### PUT /api/users/:id
- Update User 

Returns updated user object

### Plants

#### GET /api/plants/:id
- Get Plant By ID

Returns plant object

#### POST /api/plants
- Add Plant

Required fields:
```
{ 
  "nickname": "plant nickname",
  "species": "species name",
  "frequency": 24, (integer)
  "user_id": 2, (integer)
  "img_url": "http://plantpic.com"
}
```
Returns new plant object with id

#### PUT /api/plants/:id
- Update Plant

Returns updated plant object

#### DELETE /api/plants/:id
- Delete Plant

Returns number of deleted objects
