/**
 * Index Controller
 * @module controllers/goodsController
 */
'use strict';

const myDb = require('../managers/testDbManager'),
      memDb = require('../managers/memcachedDB'),
      keyGen = require('../helpers/keyGen'),
      co   = require('co');

module.exports = {

    getId: async (ctx, next) => {
      try {
        ctx.body = await memDb.getById(ctx.params.id);
        if(ctx.body) ctx.status = 200;
        else ctx.status = 404;
      } catch (err) {
        ctx.status = 404;
      }

    },

    insert: async(ctx, next) => {
      try {
        var key = keyGen();
        await memDb.insert(key, ctx.request.body);
        ctx.status = 201;
        ctx.body = key;

      } catch (err) {
        ctx.status = 400;
      }

    },

    remove: async(ctx, next) => {
      try {
        await memDb.remove(ctx.params.id);
        ctx.status = 204;
      } catch (err) {
        ctx.status = 400;
      }
    }
};
