const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');





const courses  = require('./Course.json');

const grades = require('./Grade.json');

const students = require('./Student.json');

const rT = require('./src/Query');

const s = require('./src/Schema');





app.use('/graphql', expressGraphQL({ 
    schema: s,
    graphiql: true
}))



    app.listen(3000, ()=>{
     console.log('Server running')});