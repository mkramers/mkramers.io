let joinRule = (base: string, action: string) => {
    return base + ":" + action;
};

const CREATE = "CREATE";
const READ = "READ";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

const POSTS = "POSTS";

export const POSTS_CREATE = joinRule(POSTS, CREATE);
export const POSTS_READ = joinRule(POSTS, READ);
export const POSTS_UPDATE = joinRule(POSTS, UPDATE);
export const POSTS_DELETE = joinRule(POSTS, DELETE);

let allowPostAction = (userId: string, postOwnerId: string) => {
    if (!userId || !postOwnerId) return false;
    return userId === postOwnerId;
};

const AuthRules = {
    visitor: {
        static: [
            POSTS_READ,
        ]
    },
    writer: {
        static: [
            POSTS_READ,
            POSTS_CREATE,
        ],
        dynamic: {
            POSTS_UPDATE: allowPostAction,
            POSTS_DELETE: allowPostAction,
        }
    },
    admin: {
        static: [
            POSTS_CREATE,
            POSTS_READ,
            POSTS_UPDATE,
            POSTS_DELETE,
        ]
    }
};

export default AuthRules;