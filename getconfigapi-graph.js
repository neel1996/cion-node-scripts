const graphHTTP = require('express-graphql');
const express = require('express');
const cors = require('cors');

var graphSchema = require('./graph-schemas/configdata-graph-schema');

var app = express();

app.use(cors());

app.use(
    '/configdatagraph',
    graphHTTP({
        schema: graphSchema,
        graphiql: true
    })
);

module.exports = app;