const moment = require('moment');
const UUID = require('uuid');
exports.relativeTime = time => moment(time).fromNow();
exports.uuid = UUID.v4();
