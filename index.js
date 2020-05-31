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

const schema = new GraphQLSchema({
  query: rootQueryType,
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
