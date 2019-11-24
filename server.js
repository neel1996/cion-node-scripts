/*
Common server module to start all API nodes
*/

const fileManipulationAPI = require('./global-api-modules/file-manipulation-api');
const thumbnailAPI = require('./global-api-modules/thumbnail-api');
const getConfigDataGraph = require('./global-api-modules/getconfigapi-graph');

fileManipulationAPI.listen(5000, function(err){
    console.log("### File manipulation server module ###");

    if(err){
        console.log("Error invoking [File manipulation] API :: ", err);
    }
    else{
        console.log("Connected to [File Manipulation] API");
    }
});

thumbnailAPI.listen(5001, function(err){
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