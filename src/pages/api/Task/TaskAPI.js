const { default: axiosInstance } = require("../axiosInstance");


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
};

