import axios from 'axios';
import * as _ from 'lodash';

const subscriptionKey = process.env.REACT_APP_FACE_API_KEY;

const baseURI = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/';

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
    var isCat = false;

    for (var i=0; i<tags.length; i++) {

        if (tags[i]['name'] === "cat") {
            isCat = true;
        }
    }

    return isCat;
};

export { retrieveTags, checkCat };
