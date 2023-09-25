import {useSession} from "./AdminAuthCheck";

const RouteAuthCheck = (requiredRoles, requiredAuths) => {
    const { sessionData } = useSession();
    const role = sessionData ? sessionData.role : null;
    const permissions = sessionData ? sessionData.authorities : null;

    const hasRole = role ? requiredRoles.includes(role) : false;
    const hasPermission = permissions ? requiredAuths.every(authorities => permissions.includes(authorities)) : false;

    return hasRole && hasPermission;
};

export default RouteAuthCheck;