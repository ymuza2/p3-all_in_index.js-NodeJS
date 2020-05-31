const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const courses = require("../Course.json");

const grades = require("../Grade.json");

const students = require("../Student.json");

const st = require("./StudentType.js");

const gt = require("./GradeType.js");

const ct = require("./CourseType.js");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCourse: {
      type: ct,
      description: "Add a Course",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const course = {
          id: courses.length + 1,
          name: args.name,
          description: args.description,
        };
        courses.push(course);
        return course;
      },
    },
    addGrade: {
      type: gt,
      description: "Add a Grade",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const grade = {
          id: grades.length + 1,
          grade: args.grade,
          studentID: args.studentID,
          courseID: args.courseID,
        };
        grades.push(grade);
        return grade;
      },
    },

    addStudent: {
      type: st,
      description: "Add a Student",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const student = {
          id: students.length + 1,
          name: args.name,
          lastname: args.studentID,
          courseID: args.courseID,
        };
        students.push(student);
        return student;
      },
    },
  }),
});
