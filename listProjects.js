require('colors');
var _ = require('underscore'),
    Table = require('cli-table');


var listProjects = function( err, projects ){
    var table = new Table();

    //dont list archived projects
    projects = _.filter(projects, function(p){ return !p.archived; });

    projects.forEach(function(project){
        table.push([
            project.name,
            String(project.id).green,
            String(project.open_tickets_count).red
        ]);
    });

    console.log( table.toString() );

};


exports = module.exports = function( lighthouse, options ){
    lighthouse.listProjects(listProjects);
};
