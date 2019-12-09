const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');

var app = express();
var upload = multer({
    dest: './datastore/configuration-thumbnail'
});

app.use((req, res, next) => {
    res.header({
        'accept': 'multipart/form-data',
        'Content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
    });

    next();
});

app.use(cors());

app.post('/writefileapi', upload.single('principleThumbnail'), (req, res) => {

    console.log(req.body);
    var option = req.body.option;
    var writePayload = req.body;

    var path = getFilePath(option);
    var thumbnailImagePath = './datastore/configuration-thumbnail/' + writePayload.principleId + ".jpeg";

    fs.writeFileSync(thumbnailImagePath, writePayload.principleThumbnail.split(",")[1], 'base64');

    writePayload.principleThumbnail = thumbnailImagePath;

    var configDataPayload = {};

    if (writePayload.storageOption === "db") {
        configDataPayload = {
            ...configDataPayload,
            "principleName": writePayload.principleName,
            "principleDescription": writePayload.principleDescription,
            "principleThumbnail": writePayload.principleThumbnail,
            "storageOption": writePayload.storageOption,
            "dbHostName": writePayload.dbHostName,
            "dbPortNumber": writePayload.dbPortNumber,
            "dbUserName": writePayload.dbUserName,
            "dbPassword": writePayload.dbPassword,
            "dbName": writePayload.dbName,
            "principleId": writePayload.principleId,
            "totalItems": 0
        }
    }else{
        configDataPayload = {
            ...configDataPayload,
            "principleName": writePayload.principleName,
            "principleDescription": writePayload.principleDescription,
            "principleThumbnail": writePayload.principleThumbnail,
            "storageOption": writePayload.storageOption,
            "configDataStore": writePayload.configDataStore,
            "principleId": writePayload.principleId,
            "totalItems": 0
        }
    }


    axios.post(
        path, {
            ...configDataPayload
        }
    ).then((response) => {
        if (response) {
            console.log("Write API : " + response);
            res.json({
                'message': 'Config File updated successfully'
            });
        }
    }).catch((error) => {
        console.log(error);
        res.json({
            'message': 'File Writing Error'
        });
    });
});


// Common File manipulation Module

var getFilePath = function (option) {
    var adminJSON = "";
    adminJSON = fs.readFileSync('./datastore/admin-datastore.json', 'utf8');

    console.log(adminJSON);

    var adminJSONParsedData = JSON.parse(adminJSON)[0].adminConsole;

    var path = "";

    switch (option) {
        case 'CENTRAL_DATASTORE':
            path = adminJSONParsedData['centralDataStore'];
            break;
        case 'CONFIG_DATASTORE':
            path = adminJSONParsedData['configDataStore'];
            break;
        case 'CONFIG_SET_DATASTORE':
            path = adminJSONParsedData['configSetDataStore'];
            break;
        default:
            console.log("Invalid Option");
    }

    return path;
}

module.exports = app;