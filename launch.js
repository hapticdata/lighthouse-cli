var exec = require('child_process').exec;

module.exports = function( url ){
    exec( 'open ' + url );
};
