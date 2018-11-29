module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marcoRoutes = require("../routes/marco");
    app.use(staticRoutes);
    app.use(marcoRoutes);
  }
}
