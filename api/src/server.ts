import {postgraphile} from "postgraphile/build/postgraphile";

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const cors = require('cors');
const morgan = require("morgan");

require('dotenv').config();

let schema = buildSchema(`
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

let root = {
    getPosts: () => {
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

let port = 5000;

let app = express();
app.use(morgan('combined'));
app.use(cors());
app.use('/',
    postgraphile(process.env.DB_CONNECTION_STRING,
        "public",
        {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
        }
    ));
app.listen(port);