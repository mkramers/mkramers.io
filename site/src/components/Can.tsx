import rules from "../AuthRules";

type CanProps = {
    role: string
    action: string
    data?: any
    yes: () => any,
    no?: () => any,
};

const check = (rules: any, role: string, action: string, data: any) => {
    const permissions: any = rules[role];
    if (!permissions) {
        // role is not present in the rules
        return false;
    }

    const staticPermissions = permissions.static;

    if (staticPermissions && staticPermissions.includes(action)) {
        // static rule not provided for action
        return true;
    }

    const dynamicPermissions = permissions.dynamic;

    if (dynamicPermissions) {
        const permissionCondition = dynamicPermissions[action];
        if (!permissionCondition) {
            // dynamic rule not provided for action
            return false;
        }

        return permissionCondition(data);
    }
    return false;
};

const Can = ({role, action, data, yes = () => null, no = () => null}: CanProps) =>
    check(rules, role, action, data)
        ? yes()
        : no();

export default Can;