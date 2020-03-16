import {Post} from "../../site/src/types/Post";

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Post {
    id: Int!
    author: String!
    title: String!
    content: String!
  }
  
  type Query {
    getPosts: [Post]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    getPosts: () => {
        let posts = [
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
        return posts;
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