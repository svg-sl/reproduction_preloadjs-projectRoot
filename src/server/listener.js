#!/usr/bin/env node
const app = require('./app');
const debug = require('debug')('example:server');

const port = 8080;
app.set('port', port);

app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${port}`)
    debug(`Express server listening on port ${app.get('port')}`);
});