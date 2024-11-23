function getTokenFromLocalStorage() {
    try {
        const token = localStorage.getItem('User'); // 'token' là key đã lưu
        if (token) {
            return token;
        } else {
            console.warn('No token found in LocalStorage');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token from LocalStorage:', error);
        return null;
    }
}
export default getTokenFromLocalStorage;