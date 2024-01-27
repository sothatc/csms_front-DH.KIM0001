const { Cookies } = require("react-cookie");

const cookies = new Cookies();

/**
 * @param {*} name
 * @param {*} value
 * @param {} option 만료기한 (-1: 쿠키 삭제)
 * @returns
 */
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, {...option});
}

/** 쿠키 getter */
export const getCookie = (name) => {
  return cookies.get(name)
}

/** 쿠키 삭제 */
export const removeCookie = (name) => {
  return cookies.remove(name);
}

export const checkCookieTokenExistence = () => {
  return getCookie("access_token");
}

