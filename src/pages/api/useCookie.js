const getCookie = (key) => {
    const checkKeyExistence = document.cookie
                                .split("; ")
                                .find((current) => current.startsWith('${key}='));
    return checkKeyExistence ? true : false;
}

const getCookieValue = (key) => {
    const CookieValue = document.cookie
    .split("; ")
    .find((current) => current.startsWith('${key}='))
    .split("=")[1];
    return CookieValue;
}

const deleteCookie = (key) => {
    let today = new Date();
    today = today.toUTCString();
    document.cookie = '${key}=; path=/; expires=${today}';
}

export {
    getCookie,
    getCookieValue,
    deleteCookie
}