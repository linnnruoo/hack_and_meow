import axios from 'axios';

const subscriptionKey = process.env.REACT_APP_CV_API_KEY;

const baseURI = process.env.REACT_APP_CV_API_ENDPOINT;

var headers = {
  'Content-Type': 'application/octet-stream',
  'Ocp-Apim-Subscription-Key': subscriptionKey 
}

const retrieveTags = async(file) => {
  let endPoint = 'tag';
  const apiUrl = `${baseURI}${endPoint}`;
  //console.log(apiUrl);
  const formData = new FormData();
  formData.append('data', file[0]);

  try {
    const promise = await axios.post(apiUrl, formData, {headers : headers});
    return promise.data.tags;
  }
  catch (error) {
    return Promise.reject(new Error(error));
  }
};

const checkCat = async(file) => {
  const tags = await retrieveTags(file);
  let isCat = false;

  for (let i=0; i<tags.length; i++) {
    if (tags[i]['name'] === "cat") {
      isCat = true;
    }
  }

  return isCat;
};

export { retrieveTags, checkCat };
