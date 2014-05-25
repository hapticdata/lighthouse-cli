require('colors');
var Table = require('cli-table');


var listProjects = function( err, projects ){
    var table = new Table();

    //dont list archived projects
    projects = projects.filter(function(p){ return !p.archived; });

    projects.forEach(function(project){
        table.push([
            project.name,
            String(project.id).green,
            String(project.open_tickets_count).red
        ]);
    });

    console.log( table.toString() );

};

/**
 * list the avaialable projects on your lighthouse account
 * @param {Object} lighthouse the configured lighthouse object
 * @param {Object} options the query options
 */
exports = module.exports = function( lighthouse, options ){
    lighthouse.listProjects(listProjects);
};
