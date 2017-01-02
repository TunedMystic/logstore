const loki = require('lokijs');

const db = new loki('db.json', {autoload: true, autoloadCallback: () => {
  console.log('getting or creating \'logs\' collection');
  const logs = db.getCollection('logs') || db.addCollection('logs');
  db.saveDatabase();
}});

module.exports = db;
