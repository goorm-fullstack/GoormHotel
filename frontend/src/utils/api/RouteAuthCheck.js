const RouteAuthCheck = (requiredRoles, requiredAuths) => {
    const role = sessionStorage.getItem("role"); // 예시로 세션 스토리지에서 가져옴
    const permissions = JSON.parse(sessionStorage.getItem("auth")); // 예시로 세션 스토리지에서 가져옴

    const hasRole = role ? requiredRoles.includes(role) : false;
    const hasPermission = permissions ? requiredAuths.every(auth => permissions.includes(auth)) : false;
    console.log(hasRole, hasPermission)
    return hasRole && hasPermission;
};

export default RouteAuthCheck;