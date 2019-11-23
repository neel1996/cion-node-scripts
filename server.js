/*
Common server module to start all API nodes
*/

const fileManipulationAPI = require('./file-manipulation-api');
const configDataReaderAPI = require('./read-configdata-api');
const thumbnailAPI = require('./thumbnail-api');
const getConfigDataGraph = require('./getconfigapi-graph');

fileManipulationAPI.listen(5000, function(err){
    console.log("### File manipulation server module ###");

    if(err){
        console.log("Error invoking [File manipulation] API :: ", err);
    }
    else{
        console.log("Connected to [File Manipulation] API");
    }
});

configDataReaderAPI.listen(5001, function(err){
    console.log("### Configured Data Reader server module ###");

    if(err){
        console.log("Error invoking [Configuration Data Reader] API :: ", err);
    }
    else{
        console.log("Connected to [Configuration Data Reader] API");
    }
});

thumbnailAPI.listen(5002, function(err){
    console.log("### Thumbnail API server module ###");

    if(err){
        console.log("Error invoking [Thumbnail Fetch] API :: ", err);
    }
    else{
        console.log("Connected to [Thumbnail Fetch] API");
    }
});

// 
// GraphQL client API listens to 4000 series ports
//
getConfigDataGraph.listen(4001, (err) => {
    if(err){
        console.log(err);
    }
    console.log('GraphQL API for getting config data');
});