'use strict';

let _ = require('lodash');

/**
 * errorHandler - Format the body for an error response.
 *
 * The error message is marked as the title.
 * If you want to pass more information about the error, such as what exactly went wrong/how to fix it, you can pass that information in the `details` field
 *
 * @param  {type} next description
 * @return {undefined}
 */
module.exports = function *errorHandler(next) {
    try {
        yield next;
    } catch (err) {
        if (err.status < 400 || err.status >= 500 || !err.status) {
            throw err;
        }

        this.status = err.status;

        let response = {
          title: err.message
        };

        if (err.details) {
          response = _.merge(response, err.details);
        }

        this.body = response;
    }
};
