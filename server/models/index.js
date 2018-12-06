var db = require('../db');
// These are the functions that actually control the sql reading/writing to the db
module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (data) {
      db.query(`INSERT INTO messages(user,text,room)VALUES("${data.username}","${data.message}","${data.roomname}")`,(err,result)=>{
        if(err){
          throw err
        }else {
          console.log('Message Posted!')
        }
      })
    }
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data) {
      db.query(`INSERT INTO User(name)VALUES('${data.username}')`,(err,result)=>{
        if(err){
          throw err
        }else {
          console.log('User Added!');
        }
      })
    }
  }
};

