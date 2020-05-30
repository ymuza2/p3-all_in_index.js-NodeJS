


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');


const students = require('../Student.json');
const ct = require('./Courses');


const studentType = new GraphQLObjectType({
    name:'student',
    description:'students of the school',
    fields:()=>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        lastname: {type: GraphQLNonNull(GraphQLString)},
        courseID: {type: GraphQLNonNull(GraphQLInt)},
        course:{
            type: ct,
            resolve: (student) =>{
               return  courses.find(course => course.id === student.courseID)
            }
        }
        
    })
    });

module.exports = studentType;