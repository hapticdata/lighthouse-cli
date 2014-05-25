var _ = require('underscore'),
    launch = require('./launch'),
    Table = require('cli-table');

var lowerCase = function( s ){
    return s.toLowerCase();
};

var includes = function( txt, s ){
    return s.toLowerCase().indexOf(txt.toLowerCase()) >= 0;
};

var makeFilter = function( prop, opt, transform ){
    transform = transform || _.identity;
    return function( t ){
        return t[prop] && transform( t[prop] ) === transform( opt );
    };
};


var queryMap = {
    'reportedBy' : 'reported_by',
    'notResponsible' : 'not-responsible',
    'notTagged' : 'not-tagged',
    'notMilestone' : 'not-milestone',
    'notState' : 'not-state'
};

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
            console.log( ticket.latest_body );
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

        console.log( (''+tickets.length).green + ' / ' + (numRemaining + ' tickets remaining').red );
    });
};
