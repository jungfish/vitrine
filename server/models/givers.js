var _ = require('lodash'),
    moment = require('moment'),
    async = require('async'),
    gravatar = require('gravatar'),
    uuid = require('node-uuid'),
    base = require('./base'),
    db = require('./db'),
    logger = require('../logger'),
    Users = require('./users'),
    Givers = {};



/**
 * Create a new giver
 * @param  {[type]}   giver     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Givers.create = function(giver, callback) {
    
    console.log("Givers create inbound with req " + JSON.stringify(giver) );
    var queryStr = "INSERT INTO givers (polling_place_id, firstname, lastname, email, created) VALUES (?, ?, ?, ?, ?)";
    var params = [giver.pollingPlaceId, giver.firstname, giver.lastname, giver.email, moment().unix()];
    db.insertQuery(queryStr, params, function(err, id) {
        if (err) {
            return callback(err);
        }
        Givers.get(id, callback);
    });
};

/**
 * Get givers by ids
 * @param  {[type]}   ids      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Givers.getGivers = function(ids, callback) {
    var queryStr = "SELECT * FROM givers WHERE id IN (?)";
    db.getObjectsByIds(queryStr, ids, function(err, givers) {
        if (err) {
            return callback(err);
        }
        // bind user property
        var getPropertyIdFunc = function(giver) {
            return giver.user_id;
        };
        var getPropertyObjectIdFunc = function(giver) {
            return giver.id;
        };
        var setPropertyFunc = function(giver, user) {
            giver.user = user;
        };
        // bind post with user by post.author_id
        base.setPropertyForObjects(givers, Users.getUsers, getPropertyIdFunc,
            getPropertyObjectIdFunc, setPropertyFunc, callback);
    });
};


/**
 * Get post by givers id
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Givers.get = function(id, callback) {
    base.getObject(id, Givers.getGivers, callback);
};


/**
 * Get all posts with pagination
 * @param  {[type]}   pageIndex [description]
 * @param  {[type]}   pageSize  [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
Givers.getAllGivers = function(pageIndex, pageSize, callback) {
    var getPaginationData = function(pageIndex, pageSize, callback) {
    }
    var countQueryStr = "SELECT COUNT(id) AS count FROM givers";
    var idsQueryStr = "SELECT id FROM givers ORDER BY id DESC LIMIT ?, ?";
    db.getCountAndIds(countQueryStr, idsQueryStr, [], pageIndex, pageSize, function(err, pagination) {
        if (err) {
            return callback(err);
        }
        base.getPaginationObjects(pagination, Givers.getGivers, callback);
    });
};


module.exports = Givers;