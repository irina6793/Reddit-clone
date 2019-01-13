// #1
const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

// #2
new() {
  return this.all();
}

create() {
  return this._isAdmin();
}

// #3
edit() {
  return this._isAdmin();
}

update() {
  return this._isAdmin();
}

destroy() {
  return this._isAdmin();
}
}
