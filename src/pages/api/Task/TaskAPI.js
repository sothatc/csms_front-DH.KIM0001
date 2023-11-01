const { default: axiosInstance } = require("../axiosInstance");



const getTaskDataListAPI = async (object) => {
  const {entp_nm, task_tp, task_st_dt} = object;

  try {
    const response =  await axiosInstance.post(
      `/entp/task/getTaskList`,
      {
        entp_nm,
        task_tp,
        task_st_dt
      },
    );
    return response.data.data;
  }catch(error) {
    throw new Error(`Error: ${error}`);
  }
}

const insertTaskInfoAPI = async (object) => {
  const formData = object;
  try{
    const response = await axiosInstance.post(
      `/entp/task/setTaskInfo`,
      formData,
      {
        headers: {
          'Content-Type' : 'multipart/form-data',
        }
      }
    );
    return response.data;
  }catch(error) {
    throw new Error(`Error: ${error}`);
  }
}

export {
  insertTaskInfoAPI,
  getTaskDataListAPI,
};

