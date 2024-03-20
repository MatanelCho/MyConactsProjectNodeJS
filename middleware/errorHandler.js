const {constants} = require('../constants')

const errorHanler= (err, req, res, next) => {
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation failed", message: err.message, stackTrace: err.stack})
        break;

    case constants.NOT_FOUND:
        res.json({title:"Not found", message: err.message, stackTrace: err.stack})
        break;

    case constants.UNAHOURIZED:
        res.json({title:"Un authorized", message: err.message, stackTrace: err.stack})
        break;

    case constants.FORBIDDEN:
        res.json({title:"Forbidden", message: err.message, stackTrace: err.stack})
        break;

    case constants.SERVER_ERROR:
        res.json({title:"Server error", message: err.message, stackTrace: err.stack})
        break;

    default:
        console.log("No error, All Good!");
        break;
}

}

module.exports = errorHanler