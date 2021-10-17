/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from '../@lodash';

axios.defaults.baseURL = process.env.REACT_APP_URL;

axios.interceptors.response.use(
  (response) =>
    // Do something with response data
    // console.log('10 : Do something with response data =>', response);
    response,
  (error) => {
    // Do something with response error
    console.log('Axios :=> response error =>', JSON.parse(JSON.stringify(error)));
    let newErrorMessage = '';
    if (error.response) {
      newErrorMessage += error.response.data.message;

      if (_.has(error, 'response.data.extra')) {
        newErrorMessage += ', extra: ';
        newErrorMessage += JSON.stringify(error.response.data.extra);
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      newErrorMessage = error.message;
    }

    if (error.name === 'Error') {
      newErrorMessage += `${error.message}`;
    }

    error.message = newErrorMessage;
    return Promise.reject(error);
  },
);

export default axios;
