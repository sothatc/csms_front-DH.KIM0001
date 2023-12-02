const { default: axiosInstance } = require("../axiosInstance");



const getTaskDataListAPI = async (object) => {
  const {entp_nm, task_tp, task_st_dt, noDate, limit_num} = object;

  const requestData = {
    entp_nm,
    task_tp,
    limit_num,
  }

  if(!noDate) {
    requestData.task_st_dt = task_st_dt;
  }

  try {
    const response =  await axiosInstance.post(`/entp/task/getTaskList`, requestData);
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

const getTaskDtlInfoAPI = async (task_unq) => {

  try {
    const response = await axiosInstance.post(
      `/entp/task/getTaskDtlInfo`,
      {
        task_unq,
      },
    );
    return response.data.data;
  }catch(err) {
    throw new Error(`Error: ${err}`);
  }
}

const updateTaskInfoAPI = async (object) => {
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

const downloadTaskAtchFileAPI = async (atch_file_unq) => {
  try {
    const response = await axiosInstance.post(`/entp/task/atch/${atch_file_unq}`,
      null,
      {
        responseType: 'arraybuffer',
      },
    );
    return response;
  }catch(error) {
    throw Error(`Error: ${error}`);
  }
}

const deleteTaskInfo = async (task_unq) => {
  try {
    const response = await axiosInstance.post(`/entp/task/deleteTaskInfo`,
      {
        task_unq,
      }
    );

    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const insertTaskScheduleAPI = async (scheduleInfo) => {
  try{
    const response = await axiosInstance.post(`/entp/task/insertTaskScheduleInfo`,scheduleInfo);

    return response;

  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const getTaskScheduleInfo = async () => {
  try {
    const response = await axiosInstance.post(`/entp/task/getTaskScheduleInfo`);

    return response.data;
  }catch(err) {
    throw Error(`Axios API Error: ${err}`);
  }

}

export {
  insertTaskInfoAPI,
  getTaskDataListAPI,
  getTaskDtlInfoAPI,
  updateTaskInfoAPI,
  downloadTaskAtchFileAPI,
  deleteTaskInfo,
  insertTaskScheduleAPI,
};

