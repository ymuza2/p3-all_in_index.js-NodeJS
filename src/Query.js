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



const courses  = require('../Course.json');

const grades = require('../Grade.json');

const students = require('../Student.json');

const st = require('./Students.js');

const gt = require('./Grades.js');

const ct = require('./Courses.js');


const RootQueryType = new GraphQLObjectType({ 
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        students: {
            type: new GraphQLList(st), 
            description: 'List of All Students',
            resolve: () => students  
        },
        courses: {
            type: new GraphQLList(ct),
            description: 'List of All Courses',
            resolve: () => courses
        },
        grades: {
            type: new GraphQLList(gt),
            description: 'List of All Grades',
            resolve: () => grades
        },
        student: {
            type: st,
            description: 'Particular Student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
        grade: {
            type: st,
            description: 'Particular Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grade.find(grade => grade.id === args.id)
        },
        course: {
            type: st,
            description: 'Particular course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => course.find(course => course.id === args.id)
        },

    }),
});

module.exports = RootQueryType;


