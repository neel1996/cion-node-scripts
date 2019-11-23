const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

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
    var option = req.body.option;
    var writePayload = req.body;

    console.log("File : " + req.file);

    // console.log("Data : " + option + " \n " + JSON.stringify(writePayload, null, 2));

    var path = getFilePath(option);
    var thumbnailImagePath = './datastore/configuration-thumbnail/' + writePayload.configDataStore.split(".")[0].split("-")[1] + ".jpeg";

    fs.writeFileSync(thumbnailImagePath, writePayload.principleThumbnail.split(",")[1], 'base64');

    writePayload.principleThumbnail = thumbnailImagePath;
    writePayload.principleId = writePayload.configDataStore.split(".")[0].split("-")[1];

    var configFileData = fs.readFileSync(path, {encoding: 'utf8'});

    if(configFileData === "" || configFileData === undefined){
        fs.writeFile(path, "[" + JSON.stringify(writePayload) + "]", (err, writeResult) => {
            if (err) {
                console.log("Error Writing to File : " + path);
                res.json({
                    'message': 'File Writing Error'
                });
            }
            else {
                console.log("File Writing Success : " + res);
                res.json({
                    'message': 'Config File updated successfully'
                });
            }
        });
    }
    else {
        var originalContent = configFileData.toString().split(']')[0];
        var newContent = originalContent + "," + JSON.stringify(writePayload, null ,2) + ']';

        fs.writeFile(path, newContent, (err, writeResult) => {
            if (err) {
                console.log("Error Writing to File : " + path);
                res.json({
                    'message': 'File Writing Error'
                });
            }
            else {
                console.log("File Writing Success : " + res);
                res.json({
                    'message': 'Config File updated successfully'
                });
            }
        });
    }
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