const moment = require('moment');
const uuid = require('node-uuid');

const db = require('./database');

module.exports.getLogs = () => {
  return new Promise((resolve, reject) => {
    db.loadDatabase({}, () => {
      console.log('getting logs...');
      const items = db.getCollection('logs').find();
      resolve(items);
    });
  });
}

module.exports.addLog = (data) => {
  data = Object.assign({
    id: uuid(),
    createdOn: moment().unix()
  }, data);

  return new Promise((resolve, reject) => {
    db.loadDatabase({}, () => {
      const item = db.getCollection('logs').insert(data);
      db.saveDatabase();
      resolve(item);
    });
  });
}



// const getDb = require('./database');


// module.exports.getLogs = () => {
//   return new Promise((resolve, reject) => {
//     getDb((db) => {
//       console.log('getting logs...');
//       const items = db.getCollection('logs').find();
//       resolve(items);
//     });
//   });
// }

// module.exports.addLog = (data) => {
//   data = Object.assign({
//     id: uuid(),
//     createdOn: moment().unix()
//   }, data);

//   return new Promise((resolve, reject) => {
//     db.loadDatabase({}, () => {
//       const item = db.getCollection('logs').insert(data);
//       db.saveDatabase();
//       resolve(item);
//     });
//   });
// }
