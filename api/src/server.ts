import {postgraphile} from "postgraphile/build/postgraphile";
import checkJwt from "./checkJwt";
import authErrors from "./authErrors";

const express = require('express');
const cors = require('cors');
const morgan = require("morgan");

require('dotenv').config();

let port = 5000;

let app = express();
app.use(morgan('combined'));
app.use(cors());

app.use("/graphql", [checkJwt, authErrors]);

app.use(
    postgraphile(process.env.DB_CONNECTION_STRING,
        "public",
        {
            pgSettings: (req: any) => {
                const settings = {};
                if (req.user) {
                    // @ts-ignore
                    settings["user.permissions"] = req.user.scopes;
                }
                return settings;
            },
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
        }
    ));
app.listen(port);

console.log("Started api on port: " + port);