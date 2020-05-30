
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');


const grade = require('../Grade.json');
const ct = require('./Courses');
const st = require('./Students');

const gradeType = new GraphQLObjectType({
    name:'grade',
    description:'school grades',
    fields:()=>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        grade: {type: GraphQLNonNull(GraphQLInt)},
        studentID: {type: GraphQLNonNull(GraphQLInt)},
        courseID: {type: GraphQLNonNull(GraphQLInt)},
        course:{
            type: ct,
            resolve: (grade) =>{
               return  courses.find(course => course.id === grade.courseID)
            }
        },
        student:{
            type: st,
            resolve: (grade) =>{
                return students.find(student =>student.id ===grade.studentID)
            }

        }

    })
    });

    module.exports = gradeType;