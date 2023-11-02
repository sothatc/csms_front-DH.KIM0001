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

// const getTaskDtlInfoAPI = async (task_unq) => {
//   const {task_unq} = object;

//   try {
//     const response = await axiosInstance.post(
//       `/entp/task/getTaskDtlInfo`,
//       {
//         task_unq,
//       },
//     );
//     return response.data.data;
//   }catch(err) {
//     throw new Error(`Error: ${err}`);
//   };
// }

export {
  insertTaskInfoAPI,
  getTaskDataListAPI,
  // getTaskDtlInfoAPI,
};

