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

const downloadEntpAtchFileAPI = async (atch_file_unq) => {
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

const insertCustInfo = async (object) => {
  const {entp_unq, entp_tp, memb_nm, memb_pst_nm, memb_dept_nm, memb_tel, memb_email, flag} = object;

  try{
    const response = await axiosInstance.post(`/entp/enterprise/setCustInfo`,
      {
        entp_unq,
        entp_tp,
        memb_nm,
        memb_pst_nm,
        memb_dept_nm,
        memb_tel,
        memb_email,
        flag,
        principal_tp: 'N',
      }
    );
    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const getCustList = async (entp_unq) => {
  try{
    const response = await axiosInstance.post(`/entp/enterprise/getCustList`,
      {
        entp_unq,
      }
    );
    return response.data;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const getCustOneInfo = async (cust_unq) => {
  try {
    const response = await axiosInstance.post(`/entp/enterprise/getCustOneInfo`,
      {
        cust_unq,
      }
    );
    return response.data;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const getTaskMembList = async () => {
  try{
    const response = await axiosInstance.post(`/entp/task/getTaskMembList`);

    return response.data;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const deleteCustInfo = async (cust_unq) => {
  try{
    const response = await axiosInstance.post(`/entp/enterprise/deleteCustInfo`,
      {
        cust_unq,
      }
    );
    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}

const deleteEnterpriseInfo = async (entp_unq) => {
  try {
    const response = await axiosInstance.post(`/entp/enterprise/deleteEnterpriseInfo`,
      {
        entp_unq,
      }
    );
    return response;
  }catch(err) {
    throw Error(`Error: ${err}`);
  }
}


export {getEnterpriseList,
        getEnterpriseDtlInfo,
        insertEnterprise,
        updateEnterprise,
        downloadEntpAtchFileAPI,
        insertCustInfo,
        getCustList,
        getCustOneInfo,
        getTaskMembList,
        deleteCustInfo,
        deleteEnterpriseInfo,
};