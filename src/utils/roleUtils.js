export const isAdmin = (user) => user?.roles?.some(role => role.name === "ROLE_ADMIN");
export const isTester = (user) => user?.roles?.some(role => role.name === "ROLE_TESTER");
export const isOwner = (note, user) => note?.uid === user?.uid;