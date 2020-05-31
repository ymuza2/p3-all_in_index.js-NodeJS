const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const students = require("./Student.json");
const courses = require("./Course.json");
const grades = require("./Grade.json");

//const courseType=require('./domain/CourseType');
//const gradeType=require('./domain/GradeType');

const studentType = new GraphQLObjectType({
  name: "student",
  description: "students of the school",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    course: {
      type: courseType,
      resolve: (student) => {
        return courses.find((course) => course.id === student.courseID);
      },
    },
  }),
});

const courseType = new GraphQLObjectType({
  name: "course",
  description: "courses available at school",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const gradeType = new GraphQLObjectType({
  name: "grade",
  description: "school grades",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLInt) },
    studentID: { type: GraphQLNonNull(GraphQLInt) },
    courseID: { type: GraphQLNonNull(GraphQLInt) },
    course: {
      type: courseType,
      resolve: (grade) => {
        return courses.find((course) => course.id === grade.courseID);
      },
    },
    student: {
      type: studentType,
      resolve: (grade) => {
        return students.find((student) => student.id === grade.studentID);
      },
    },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    students: {
      type: new GraphQLList(studentType),
      description: "List of All Students",
      resolve: () => students,
    },
    courses: {
      type: new GraphQLList(courseType),
      description: "List all courses",
      resolve: () => courses,
    },
    grades: {
      type: new GraphQLList(gradeType),
      description: "List all grades",
      resolve: () => grades,
    },
  }),
});

const rootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCourse: {
      type: courseType,
      description: "Add a Course",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
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
      type: gradeType,
      description: "Add a Grade",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLInt) },
        studentID: { type: GraphQLNonNull(GraphQLInt) },
        courseID: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const grade = {
          id: grades.length + 1,
          name: args.name,
          studentID: args.studentID,
          courseID: args.courseID,
        };
        grades.push(grade);
        return grade;
      },
    },

    addStudent: {
      type: studentType,
      description: "Add a Student",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        courseID: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const student = {
          id: students.length + 1,
          name: args.name,
          lastname: args.lastname,
          courseID: args.courseID,
        };
        students.push(student);
        return student;
      },
    },

    deleteStudent: {
      type: studentType,
      description: "delete a Student",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { id }) => {
        students.pop(id);
      },
    },

    deleteCourse: {
      type: courseType,
      description: "delete a Course",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { id }) => {
        courses.pop(id);
      },
    },

    deleteGrade: {
      type: gradeType,
      description: "delete a Grade",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { id }) => {
        grades.pop(id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server running");
});
