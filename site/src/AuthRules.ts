type  TS = {
    userId: string
    postOwnerId: string
};

const AuthRules = {
    visitor: {
        static: ["posts:list", "home-page:visit"]
    },
    writer: {
        static: [
            "posts:list",
            "posts:create",
            "users:getSelf",
            "home-page:visit",
            "dashboard-page:visit"
        ],
        dynamic: {
            "posts:edit": ({userId, postOwnerId}: TS) => {
                if (!userId || !postOwnerId) return false;
                return userId === postOwnerId;
            }
        }
    },
    admin: {
        static: [
            "posts:list",
            "posts:create",
            "posts:edit",
            "posts:delete",
            "users:get",
            "users:getSelf",
            "home-page:visit",
            "dashboard-page:visit"
        ]
    }
};

export default AuthRules;