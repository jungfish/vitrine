var _ = require('lodash'),
    passport = require('passport'),
    uuid = require('node-uuid'),
    moment = require('moment'),

    logger = require('../logger'),
    models = require('../models'),
    mailer = require('../mail'),
    config = require('../config'),


    Givers = {};

/**
 * Get a subscribe page
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
Givers.subscribe = function(req, res, next) {
    // store the return url
    req.session.redirectUrl = req.query.returnUrl || '/';

    res.render('tunnel/tunnel', {
        title: 'Ma procuration',
        errors: null
    });
};


/**
 * Post to for new giver subscription
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
Givers.doSubscribe = function(req, res) {

    console.log("[CONTROLLER] Giver Inbound " + req);
    
    req.assert('email', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();

    var errors = req.validationErrors(true); // get errors
    var viewParams = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        pollingPlaceId: req.body.polling_place_id,
        email: req.body.email,
        errors: errors
    };
    
 function renderPage() {
     // TODO render page route
        res.render('tunnel/tunnel', viewParams);
    }

   // if we got errors
    if (errors) {
        return renderPage();
    }


    models.givers.create(viewParams, function(err, giver) {
        if (err && !_.isString(err)) {
            logger.error(err);
            return res.redirect('/error/500');
        }
        if (err || !giver) {
            viewParams.errors = {};
            if (err === 'email exists') {
                viewParams.errors.email = {
                    param: 'email',
                    msg: 'Email already exists',
                    value: ''
                };
            } else {
                viewParams.errors.general = 'Unknown error.';
            }
            return renderPage();
        }
        
        // TODO render page route
        res.redirect('/');

    });
}

module.exports = Givers;