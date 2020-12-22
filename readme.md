Endpoints:
/users/username
/plant/{plantid}
/plant/nickname
/plant/species
/plant/h2oFrequency
/plant/image
CRUD:
// /users
GET - { id }
PUT/PATCH - { username, phoneNumber, password }
POST - { username, password }
DELETE
// /plants
GET - { id, nickname, species, h2oFrequency, image }
POST - ''
PUT/PATCH - ''
DELETE - ''
