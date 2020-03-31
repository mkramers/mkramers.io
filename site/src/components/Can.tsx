import rules from "../AuthRules";
import {useAuth0} from "../auth0/react-auth0-spa";

type CanProps = {
    action: string
    data?: any
    yes: () => any,
    no?: () => any,
};

const check = (rules: any, role: string | null, action: string, data: any) => {
    if (!role) {
        return false;
    }

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

function Can({action, data, yes = () => null, no = () => null}: CanProps) {
    const {user} = useAuth0();

    return check(rules, user?.role, action, data)
        ? yes()
        : no();
}

export default Can;