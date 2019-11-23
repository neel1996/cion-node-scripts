/*
    API to store thumbnail in separate data file
*/

const express = require('express');
const fs = require('fs');
const cors = require('cors');

var app = express();

app.use(cors());

app.use((req,res,next)=>{
    res.header({
        'Access-Control-Allow-Origin': '*'
    });
    next();
});

app.get('/thumbnailapi/:thumbnail', (req,res)=>{
    var principleThumbnail = req.param('thumbnail');

    res.sendFile(
        __dirname + '/datastore/configuration-thumbnail/' + principleThumbnail
    );
});

module.exports = app;