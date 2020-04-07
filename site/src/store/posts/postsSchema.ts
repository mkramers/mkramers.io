import {schema} from "normalizr";

const child = new schema.Entity('posts');
const postsSchema = new schema.Array(child);
child.define({children: postsSchema});

export default postsSchema;