/**
 * testDB manager
 * @module managers/memcachedDB
 */

 var Memcached = require('memcached');
 var memcached = new Memcached('localhost:11211');

module.exports = {
  getById: async (id) => {
    return new Promise((res, rej) => {
      memcached.get(id, function (err, data) {
        if(err) rej(err);
        res(data);
      })
    })
  },

  insert: async(key, data) => {
    return new Promise((res,rej) => {
      memcached.add(key, data, 100, function ( err ) {
        if(err) rej(err);
        res();
      })
    })
  },
  remove: async(key) => {
    return new Promise((res,rej) => {
      memcached.del(key, function ( err ) {
        if(err) rej(err);
        res();
      })
    })
  }
}
