const Advertisement = require("./models").Advertisement;

module.exports = {

//#1
  getAllTopics(callback){
    return Advertisement.all()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisement(id, callback){
    return Advertisement.findById(id)
   .then((topic) => {
     callback(null, topic);
  })
     .catch((err) => {
      callback(err);
  })
},

//#3
  addAdvertisement(newTopic, callback){
    return Topic.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
     })
    .then((topic) => {
      callback(null, topic);
    })
   .catch((err) => {
      callback(err);
    })
  },

 updateAdvertisement(id, updatedAdvertisement, callback){
    return Advertisement.findById(id)
    .then((topic) => {
      if(!topic){
        return callback("Advertisement not found");
      }
        topic.update(updatedAdvertisement, {
        fields: Object.keys(updatedAdvertisement)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deleteAdvertisement(id, callback){
    return Advertisement.destroy({
      where: {id}
  })
   .then((topic) => {
     callback(null, topic);
   })
   .catch((err) => {
     callback(err);
   })
  }
}
