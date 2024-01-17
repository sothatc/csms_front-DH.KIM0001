import axiosInstance from "../axiosInstance";

const submitLoginInfoAPI = async (object) => {
  const {user_id, user_pwd} = object;

  try {
    const response = await axiosInstance.post(`/user/login`,
      {
        user_id,
        user_pwd,
      },
      {
        withCredentials: true
      }
    );

    return response.data;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}


export {
  submitLoginInfoAPI
};
