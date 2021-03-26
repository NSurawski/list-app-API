# Listy

## About

A full stack web application designed for users to create their own lists for productivity. Users can create list items,view their list and delete list items.

## Front End Repo & Deployed Links

[Front End Repository](https://github.com/NSurawski/list-app-client)

[Front End Deployed](https://nsurawski.github.io/list-app-client/#/)

## Back End Repo and Deployed Links

[Back End Repository](https://github.com/NSurawski/list-app-API)

[Back End Deployed](https://git.heroku.com/mighty-plains-75118.git)

## ERD

[ERD](https://imgur.com/QthloEA)

## Catalog of Routes

### Authentication Routes:
| Action | Method | Path |
| ----------- | ----------- | ----------- |
| Sign-Up | POST | /sign-up
| Sign-In | POST  | /sign-in
| Change-Password |  PATCH | /change-password
| Sign-Out | DELETE | /delete

### List Routes: (Token Required)
| Routes | Method | Path |
| ----------- | ----------- | ----------- |
| Create | POST | /lists
| Index User | GET | /lists/user
| Delete | DELETE | /lists/:id

## Technologies Used:
- Javascript
- Express
- Mongoose
