/**
 * Returns a promise rejected error
 * @param res {Object}
 * @param err {String|Object}
 * @returns {Promise}
 */
export default function createError(res, msg) {
    // NOTE: We are overriding the "implementationContext" so that the error()
    // function is not part of the resulting stacktrace.
    // throw new Exception(msg, createError);
    res.status(400).send(msg)
}

/**
 * Our custom Exception class.
 */
export class Exception extends Error {
    constructor(message, context) {
        super()
        this.name = '';
        this.message = message || 'An error occurred.';
        this.context = context;
        this.stack = this.stack
                         .split('\n')
                         .filter(line => !line.match(/express\\lib|helpers\\error\.js/))
                         .join('\n')

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor || Exception)
        }
    }
}
