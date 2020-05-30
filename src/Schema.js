

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');





const rT = require('./Query');
const rM = require('./Mutation');

const schema = new GraphQLSchema({ 
    query: rT,
    mutation: rM
});

module.exports = schema;