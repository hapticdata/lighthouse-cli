# Lighthouse CLI

A command-line interface for the [Lighthouse Issue Tracker](http://lighthouseapp.com).

![Example output](https://i.cloudup.com/0IWuQehheY.gif)

## Current Commands
* `lh projects` list projects on your account
* `lh tickets [project]` list tickets on your project
* `lh new [project]` open a browser-tab to create a new ticket

## Installation
This application requires [Node.js](http://nodejs.org). Once you have that installed, you can install as a global package with npm:

```
sudo npm install -g lighthouse-cli
```
Now create 2 environment variables in your `.bashrc` or `.bash_profile`. You need your account (your sub-domain) and your [API token](http://help.lighthouseapp.com/kb/api/how-do-i-get-an-api-token)

```
export LIGHTHOUSE_ACCOUNT="my-subdomain"
export LIGHTHOUSE_TOKEN="my-api-token"
```


## Tips

Use `lh projects` to see your available projects. Grab the ID from that use it for the tickets command: `lh tickets ######`.

#### Available `lh tickets` options, view them at any time with `lh tickets -h`:

```
  Usage: tickets [options] [project]

  Options:

    -h, --help                       output usage information
    -r, --responsible [person]       Filter by responsible party
    -b, --reported-by [person]       Filter by person that reported
    -m, --milestone [milestone]      Filter by milestone
    -M, --not-milestone [milestone]  Filter out milestone
    -s, --state [state]              Filter by state
    -S, --not-state [state]          Filter out state
    -i, --importance [importance]    Filter by importance
    -t, --tagged [tag]               Filter by tag
    -T, --not-tagged [tag]           Filter out tag
    -u, --updated [date]             Filter by when updated
    -c, --created [date]             Filter by created date
    -o, --sOrt [type]                Order by field
    -n, --number [number]            Only show tickets of this #
    -l, --limit [number]             Limit response, max 100
    -L, --launch                     Launch the ticket(s) in your browser
    -p, --plain                      Limit response to plain text
```

#### Get your tickets that are new and are in milestone "check for launch":

```
lh tickets ###### -r kyle -s new -m launch
```

#### Tired of always including the project number? create an alias:

```
alias lht="lh tickets ######"

lht --r kyle -s new -m launch
````

Don't forget you can pipe this data to other Unix applications:

```
lht -r kyle -s new -m launch | grep "mobile"
```



Lincensed under [MIT](http://opensource.org/licenses/MIT)

Project initiated May 11th, 2014 by [Kyle Phillips](http://haptic-data.com)