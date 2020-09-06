import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const postText = (text, key, algorithm, mode, isOutputFile) => {
    var bodyFormData = new FormData();
    bodyFormData.append('text', text);
    bodyFormData.append('key', key);
    bodyFormData.append('algorithm', algorithm);
    bodyFormData.append('mode', mode);

    return axios({
        url: `${API_URL}/text`,
        params: {
            output: isOutputFile? 'file': '',
        },
        method: 'post',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        return res.data.result
    })
};

export const postFileText = (text, key, algorithm, mode, isOutputFile) => {
    var bodyFormData = new FormData();
    bodyFormData.append('text', text);
    bodyFormData.append('key', key);
    bodyFormData.append('algorithm', algorithm);
    bodyFormData.append('mode', mode);

    return axios({
        url: `${API_URL}/file_text`,
        params: {
            output: isOutputFile? 'file': '',
        },
        method: 'post',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        return res.data.result
    })
};

export const postFileBinary = (text, key, algorithm, mode, isOutputFile) => {
    var bodyFormData = new FormData();
    bodyFormData.append('text', text);
    bodyFormData.append('key', key);
    bodyFormData.append('algorithm', algorithm);
    bodyFormData.append('mode', mode);

    return axios({
        url: `${API_URL}/file_binary`,
        params: {
            output: isOutputFile? 'file': '',
        },
        method: 'post',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        return res.data.result
    })
};