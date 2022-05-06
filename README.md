# Web API: short-video-backend
MERN Project: Short Video App Backend

## Description:
A REST server using Express/Mongoose/NodeJS to query MongoDB for users and short videos.

The React front-end can be found at: https://short-video-frontend-a286d.web.app/

The Short Videos API can be found at: https://shortvideo-gryz.herokuapp.com/

## How-to:
Short videos can be added to the database using a POST request with a JSON. The attributes must include a url, channel, description, song, likes, shares, and messages.
The React frontend can use Google OAuth to login and push a user to the database. Also, the frontend is able to retrieve video objects through requests to this API.

## POSTMAN:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a31c611dc0df5fc63770?action=collection%2Fimport)
