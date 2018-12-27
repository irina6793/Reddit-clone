module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisement");
    const marcoRoutes = require("../routes/marco");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
    app.use(marcoRoutes);
  }
}
