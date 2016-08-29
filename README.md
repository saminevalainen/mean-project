# mean-project-admin

---

This is a development repository branch for MEAN web app. Originally done for school programming project, but I use this for learning and trying out different front and backend js code.

## Summary

A small MEAN (MongoDB, Express, AngularJS, Node.js) testing app.

Functionality:user can see, add, edit and delete users from the database. Purpose is to get comfortable with the JS frameworks, NoSQL databases and deploying to the cloud. Also uses auto-deployment with nodemon (local repo only). MongoDB can be hosted for example at mlab.com (free), application code (Node.js, Express, AngularJS, etc) can be hosted for example at heroku.com (free AWS instance). Works also locally.

## NOTE: This is work under progress, some bugs may and do exists, do not use for production!

#### Code:

Backend code: `server.js`

Frontend code: `public/*`

+ some configuration files on root

## How to run:

- Clone/fork the repo
- Make sure you have node.js (~6.3.1), git (~2.7.1) and npm (~3.10.3) installed
- `npm install` (see package.json and bower.json for dependency version info)
- Export MONGODB_URI that contains user, password and address to your database, for example add it to .env (project is using dotenv)
- `npm start`
- Connect to `localhost:8080/` with your favourite browser

## TODO
- [ ] Replace MongoDB Node.js driver with mongoose
- [ ] Add some testing frameworks + heavy refactoring
- [ ] Try out Socket.io