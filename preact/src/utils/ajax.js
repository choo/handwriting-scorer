import axios from 'axios';

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

export {postImage}
