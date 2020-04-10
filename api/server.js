const express = require("express");

const helmet = require("helmet");
const server = express();

//const projectsRouter = require("../routers/projectsRouter");
//const actionsRouter = require("../routers/actionsRouter");

server.use(helmet());
server.use(logger);
server.use(express.json());

server.get("/", (req, res) => {
  res.send("server is running");
});

//server.use("/api/projects", projectsRouter);
//server.use("/api/actions", actionsRouter);

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log({
    method,
    originalUrl,
    timestamp: new Date().toLocaleString(),
  });
  next();
}

module.exports = server;
