//NOTE Data Protection header for user data. Use as a helper function within the User Data Service
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
//The code above checks Local Storage for user item. If there is a logged in user who holds accessToken (JWT),
//return HTTP Authorization header. Otherwise, return an empty object.
