import axiosInstance from "../axiosInstance";

const setUserInfoAPI = async(userData) => {
  try{
    const response = axiosInstance.post(`/user/setUserInfo`,
      userData
    );
    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

export {
  setUserInfoAPI,
};