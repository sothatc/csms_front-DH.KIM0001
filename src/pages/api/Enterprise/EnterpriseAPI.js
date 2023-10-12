const { default: axiosInstance } = require("../axiosInstance")


const getEnterpriseList = async (object) => {
  const{entp_tp, svc_tp, entp_nm} = object;

  try {
    const response = await axiosInstance.post(
      `/entp/enterprise/getEnterpriseList`,
      {
        entp_tp,
        svc_tp,
        entp_nm,
      },
    );
    return response.data.data;
  }catch(error) {
    throw new Error(`Error: ${error}`);
  }
}

const getEnterpriseDtlInfo = async (entp_unq) => {
  try{
    const response = await axiosInstance.post(
      `/entp/enterprise/getEnterpriseDtlInfo`,
      {
        entp_unq
      },
    );
    return response.data.data;
  }catch(error){
    throw new Error(`Error: ${error}`);
  }
}

const insertEnterprise = async (object) => {
  console.log("insertAPI");
  const formData = object;
  try{
    const response = await axiosInstance.post(
      `/entp/enterprise/setEnterpriseInfo`,
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

const updateEnterprise = async (object) => {
  const formData = object;
  try{
    const response = await axiosInstance.post(
      `/entp/enterprise/setEnterpriseInfo`,
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

const downloadAtchFile = async (atch_file_unq) => {
  try {
    const response = await axiosInstance.post(`/entp/enterprise/atch/${atch_file_unq}`,
      null,
      {
        responseType: 'arraybuffer',
      }
    );
    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}


export { getEnterpriseList, getEnterpriseDtlInfo, insertEnterprise, updateEnterprise, downloadAtchFile };