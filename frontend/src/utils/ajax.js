import axios from 'axios';

const doAjax = (url, params, callback, errorCallback) => {
  axios.get(url, {params: params}).then(
    (result) => {
      if (callback) {
        callback(result.data);
      }
    }
  ).catch(
    (error) => {
      if (errorCallback) {
        errorCallback(error);
      } else {
        console.log(error);
      }
    }
  );
};

const postImage = async (url, params) => {
  const form = new FormData();
  for (const [k, v] of Object.entries(params)) {
    form.append(k, v);
  }
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };

  try {
    const response = await axios.post(url, form, config);
    return response.data;

  } catch (error) {
    const {
      status,
      statusText
    } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    return null;
  }
};


/**
 * for debugging without async
 */
const postImage_callback = (url, params, callback, errorCallback) => {
  const form = new FormData();
  for (const [k, v] of Object.entries(params)) {
    form.append(k, v);
  }
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };

  axios.post(url, form, config).then(
    (result) => {
      if (callback) {
        callback(result.data);
      }
    }
  ).catch(
    (error) => {
      if (errorCallback) {
        errorCallback(error);
      } else {
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
        console.log(error);
      }
    }
  );
};


export {doAjax, postImage, postImage_callback}
