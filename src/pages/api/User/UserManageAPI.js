import axiosInstance from "../axiosInstance";


const getUserListAPI = async(object) => {
  const {use_yn, user_id, user_nm, conn_ip, paging} = object;

  const requestData = {
    use_yn,
    user_id,
    user_nm,
    conn_ip,
  }

  if(paging) {
    requestData.paging = paging;
  }

  try{
    const response = await axiosInstance.post(
      `/user/getUserList`,
      requestData
    );

    return response.data.data;
  }catch(err) {
    throw new Error(`Error: ${err}`);
  }
}

const findUserById = async (user_id) => {

  try {
    const response = await axiosInstance.post(`/user/getUserInfo`,
      {
        user_id,
      },
    );

    return response.data;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

export {
  findUserById,
  getUserListAPI,
};
