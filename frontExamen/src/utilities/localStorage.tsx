export const saveToken = (token: string) => {
    localStorage.setItem('authToken', token);
}

export const getToken = () => {
    return localStorage.getItem('authToken');
}

export const checkToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return true;
    } else {
        return false;
    }
}

export const removeToken = () => {
    localStorage.removeItem('authToken');
}