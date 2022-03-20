const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Middlewares
    this.middlewares();

    //Application's routes
    this.routes();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    // Parser and read of the body
    this.app.use(express.json());

    //Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening to the port:", this.port);
    });
  }
}

module.exports = Server;
