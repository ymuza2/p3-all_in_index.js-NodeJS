

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');



//definido en index
//todos los nombres definidos deben significar algo
//crear carpeta domain
//todos los files de types , mutations y querys => dentro de domain
//cambiar course, grades, students por courseType, etc ,etc.
//
const rT = require('./Query'); 
const rM = require('./Mutation');

const schema = new GraphQLSchema({ 
    query: rT,
    mutation: rM
});

module.exports = schema;