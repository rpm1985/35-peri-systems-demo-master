# 35 PERI Systems Demo
[Git Repo Link](https://git.cardiff.ac.uk/c1843439/35-peri-systems-demo)

PERI systems project management tool demo.

## Setup
Clone the project

You must:
- install node
- install npm 

To use the application, you will need to run both servers.

### Database
For this application to work you will need a MongoDB database. You can recreate the database we used for development using the json files located in Backend/mockCollectionData. You will also have to change the MONGODB_URI variable in server.js (line 36) to your database's connection string. This database should be hosted in the cloud, for our development we used MongoDB Atlas to do this.

### Node Server
1. Ensure you're in the directory `./Backend`
2. `npm install`
3. `npm run dev`

### React Server
1. Ensure you're in the directory `./Frontend`
2. `npm install`
3. `npm run start`


## Maintenance

### Frontend

#### React
This application was built using React version 17.0.1. 

### Backend

#### Database

For our database we used MongoDB and then used Mongoose to ease the translation of MongoDB documents and objects in our application. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

[See MongoDB documentation](https://docs.mongodb.com/)

[See Mongoose documentation](https://www.npmjs.com/package/mongoose/v/5.11.15)

The Mongoose version used during development was 5.11.15.

#### Node

Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. 

[See documentation](https://nodejs.org/en/docs/)

#### Axios

The axios version used during development was 0.21.1

Axios is a:
> promise based HTTP client for the browser and node.js
>
>[axios README in github repo](https://github.com/axios/axios/blob/master/README.md)

It has been used in order to make post and get requests to the MongoDB database. It simplifies HTTP requests and performs CRUD 
operations in a easily readable manner. There was an option to create the HTTP requests ourselves. However, as illustrated 
in the article [Why Use Axios in Your Next App](https://medium.com/@janelle.wg/why-use-axios-in-your-next-app-c44ad3508e93),
code is much easier to write, appears much cleaner and is more readable when using axios. Readability is key to good 
quality code hence we opted for using axios.

#### Express

The Express version used during development was 4.17.1

> Express is the most popular Node web framework
>
>[MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#:~:text=Express%20is%20the%20most%20popular,different%20URL%20paths%20(routes).)

Its popularity makes it a reliable library to use and a large community support. There are plenty of tutorials available
on how to use express with Nodejs for servers. This facilitates my development of servers and enables us to gain a sound
understanding on how it works. These are aspects we value when selecting new libraries in order to permit us to easily 
learn how to use them. We have used it to host my Nodejs servers, socket.io and MongoDB, and to handle routing.
