var models = require('../../server/models'),
    support = require('../support'),
    moment = require('moment'),
    should = require('should');

/*
var newPost = function(callback) {
    support.createTestUser(function(err, result) {
        if (err) {
            callback(err);
        } else {
            if (!result.user) {
                return callback(new Error(result.status));
            }
            post = {
                author_id: result.user.id,
                title: 'test title - ' + moment().unix(),
                body: 'test body \r\n' + moment().unix(),
                slug: 'test-post-' + moment().valueOf(),
                status: 0,
            };
            models.posts.create(post, result.user, callback);
        }
    });
};
*/

describe('models/pollingPlaces', function() {
    describe('#getPollingPlaces()', function() {
        it('should match a polling place without error', function(done) {
            models.pollingPlaces.getPollingPlacesByZipcode("75011", function(err,pollingPlaces) {
                should.not.exist(err);
                should.exist(pollingPlaces);
                console.log(pollingPlaces);
                done();
            });
        });
    });

 /*   describe('#getAllPosts()', function() {
        it('should get first page posts with 2 results', function(done) {
            models.posts.getAllPosts(0, 2, function(err, result) {
                should.not.exist(err);
                should.exist(result);
                result.items.length.should.equal(2);
                console.log(result);
                done();
            });
        });
    });*/

});