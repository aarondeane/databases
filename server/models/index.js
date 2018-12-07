// var db = require('../db');
const Sequelize = require('sequelize')
var db = new Sequelize('Chat', 'student', 'student', {
  host: 'localhost',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

var User = db.define('User', {
  name: Sequelize.STRING,
},{
  timestamps: false
});

var Message = db.define('Messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
},{
  timestamps: false
});

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// These are the functions that actually control the sql reading/writing to the db
module.exports = {
  messages: {
    get: function (callback) {
      Message.findAll({
      where:{},
      raw : true,
      limit : 10}).then((user)=>{
        callback(null, user)
      }).catch()

        // db.query(`SELECT * FROM Messages`, (err,results)=>{
        //     if(err){
        //       throw err
        //     }else {
        //       callback (null , results)
        //     }
        // } ) 
    }, // a function which produces all the messages
    post: function (data, callback) {
      // console.log(data)
       Message.create(data).then((data) => {
          callback.end()
        })
    }
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data, callback) {
      // console.log(data);
      User.create(data ,{ fields: [ 'name'] }).then((user) => {
        callback.end()
      })
    }
  }
};

