/*We need to modify our package json file to add this codes:

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "engines": {
    "node": "10.13.0"
  },
*/

//package.json
{
    "name": "vidly-demo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node app.js"
},
    "engines": {
    "node": "10.13.0"
},
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
    "bcrypt": "^3.0.6",
        "compression": "^1.7.2",
        "config": "^1.29.4",
        "express": "^4.17.1",
        "express-async-errors": "^2.1.0",
        "fawn": "^2.1.5",
        "helmet": "^3.11.0",
        "joi": "^13.1.0",
        "joi-objectid": "^2.0.0",
        "jsonwebtoken": "^8.5.1",
        "lodash": "^4.17.11",
        "mongoose": "^5.0.1",
        "winston": "^2.4.0",
        "winston-mongodb": "^3.0.0"
}
}
