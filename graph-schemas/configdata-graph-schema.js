var { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql');
var fs = require('fs');
var axios = require('axios');

var ConfigDataType = new GraphQLObjectType({
    name: "configdatagraph",
    fields: () => ({
        principleName: { type: GraphQLString },
        principleDescription: { type: GraphQLString },
        principleThumbnail: { type: GraphQLString },
        storageOption: { type: GraphQLString },
        configDataStore: { type: GraphQLString },
        option: { type: GraphQLString },
        principleId: { type: GraphQLString },
        totalItems: {type: GraphQLInt}
    })
});

// Root Query for GraphQL

var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        configData: {
            type: new GraphQLList(ConfigDataType),
            resolve(parent, args) {
                return new Promise((resolve, reject) => {
                    axios({
                        'method': 'GET',
                        'url': 'http://localhost:5001/configureditems'
                    }).then((res) => {
                        resolve(JSON.parse(JSON.stringify(res.data.configuredItems)));
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});