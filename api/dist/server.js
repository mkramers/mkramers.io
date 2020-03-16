"use strict";
var express = require('express');
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
var cors = require('cors');
var schema = buildSchema("\n  type Post {\n    id: Int!\n    author: String!\n    title: String!\n    content: String!\n  }\n  \n  type Query {\n    getPosts: [Post]\n  }\n");
var root = {
    getPosts: function () {
        return [
            {
                id: 1,
                author: "mkramers",
                title: "First post",
                content: "hello world"
            },
            {
                id: 2,
                author: "mkramers",
                title: "Second post",
                content: "goodbye website"
            }
        ];
    },
};
var app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
