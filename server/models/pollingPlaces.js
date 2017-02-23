var _ = require('lodash'),
    moment = require('moment'),
    async = require('async'),
    uuid = require('node-uuid'),
    base = require('./base'),
    db = require('./db'),
    logger = require('../logger'),
    Users = require('./users'),
    PollingPlaces = {};


/**
 * Get a polling places by id
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
PollingPlaces.get = function(id, callback) {
    base.getObject(id, PollingPlaces.getPollingPlaces, callback);
};


/**
 * Get polling places by ids
 * @param  {[type]}   ids      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
PollingPlaces.getPollingPlaces = function(ids, callback) {
    var queryStr = "SELECT id, name, slug, address, zipcode, city, created, deleted from polling_places WHERE id IN (?)";
    db.getObjectsByIds(queryStr, ids, callback);
};


/**
 * Get pollingPlaces by zipcode
 * @param  {[type]}   id      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
PollingPlaces.getPollingPlacesByZipcode = function(zipcode, callback) {
    var queryStr = "SELECT id FROM polling_places WHERE zipcode IN (?)";
    db.getIds(queryStr, [zipcode], function(err, ids) {
        if (err) {
            return callback(err);
        }
        PollingPlaces.getPollingPlaces(ids, callback);
    });

};


/**
 * Get post by pollingPlaces id
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
PollingPlaces.get = function(id, callback) {
    base.getObject(id, PollingPlaces.getPollingPlaces, callback);
};


/**
 * Get all posts with pagination
 * @param  {[type]}   pageIndex [description]
 * @param  {[type]}   pageSize  [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
PollingPlaces.getAllPollingPlaces = function(pageIndex, pageSize, callback) {
    var getPaginationData = function(pageIndex, pageSize, callback) {
    }
    var countQueryStr = "SELECT COUNT(id) AS count FROM polling_places";
    var idsQueryStr = "SELECT id FROM polling_places ORDER BY id DESC LIMIT ?, ?";
    db.getCountAndIds(countQueryStr, idsQueryStr, [], pageIndex, pageSize, function(err, pagination) {
        if (err) {
            return callback(err);
        }
        base.getPaginationObjects(pagination, PollingPlaces.getPollingPlaces, callback);
    });
};


module.exports = PollingPlaces;