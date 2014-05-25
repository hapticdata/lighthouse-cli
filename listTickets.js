var _ = require('underscore'),
    launch = require('./launch'),
    Table = require('cli-table');


//these all connect to CLI options, use lh tickets -h to see them
var queryMap = {
    'reportedBy' : 'reported_by',
    'notResponsible' : 'not-responsible',
    'notTagged' : 'not-tagged',
    'notMilestone' : 'not-milestone',
    'notState' : 'not-state'
};

//more queryMap, values === keys
_.reduce([
    'responsible',
    'milestone',
    'state',
    'project',
    'importance',
    'tagged',
    'updated',
    'created',
    'sort'
], function( mem, val ){
    mem[val] = val;
    return mem;
}, queryMap);


/**
 * retrieve a list of tickets matching the users query
 * @param {Object} lighthouse the configured lighthouse object
 * @param {Number} projectId the project's id number, can be found with `listProjects`
 * @param {Object} options options related to the query to perform
 */
exports = module.exports = function( lighthouse, projectId, options ){
    var table = new Table();

    var query = {
        q: [],
        project: projectId
    };

    _.map( queryMap, function( val, key ){
        if( options[key] ){
            query.q.push(val+':'+options[key]);
        }
    });

    query.q = query.q.join(' ');

    if( options.limit ){
        query.limit = Number(options.limit);
    }

    lighthouse.listTickets( query, function(err, tickets){
        if( err ){
            throw err;
        }
        var numRemaining = tickets.length;

        //don't list closed tickets
        tickets = _.filter( tickets, function(t){ return !t.closed; });

        if( options.number ){
            options.number = options.number.split(' ');
            options.number = options.number.map(function(n){ return Number(n); });

            tickets = tickets.filter(function(t){
                return (options.number.indexOf(t.number) >= 0 );
            });
            //tickets = _.filter( tickets, makeFilter('number', options.number) );
        }

        _.each(tickets, function(ticket, i){
            table.push(
                [('#' + ticket.number).green,
                ticket.title,
                (ticket.assigned_user_name || '').blue,
                (ticket.milestone_title || '').grey,
                ticket.state.grey.underline,
                ticket.attachments_count > 0 ? '✓'.yellow : ''
                ]
            );

            //console.log( ticket.latest_body );
            if( options.launch ){
                launch(ticket.url);
            }
        });

        if( options.raw ){
            _.each( table, function( val ){
                console.log( val.join(' ') );
            });
        } else {
            console.log( table.toString() );
        }

        console.log( (tickets.length +' tickets listed').green );
    });
};
