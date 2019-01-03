module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const postRoutes = require("../routes/posts");
    const flairRoutes = require("../routes/flairs");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisement");
    const marcoRoutes = require("../routes/marco");

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
    app.use(marcoRoutes);
  }
}
