import moment from 'moment';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { SIGN_UPLOAD } from '../data/mutations';

const TODAY = 'Today';
const YESTERDAY = 'Yesterday';

const isToday = date => moment(date).isSame(moment(), 'day');

const isYesterday = date =>
  moment(date).isSame(moment().subtract(1, 'days'), 'day');

export const formatDate = date => {
  if (isToday(date)) {
    return TODAY;
  }
  if (isYesterday(date)) {
    return YESTERDAY;
  }
  return moment(date).format('MMMM Do');
};

export const uploadImage = (client, file, cb) => {
  const fileName = uuidv4();
  client
    .mutate({
      mutation: SIGN_UPLOAD,
      variables: { fileName, fileType: file.type }
    })
    .then(({ data: { signUpload } }) => {
      const options = {
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read'
        }
      };
      axios
        .put(signUpload.signedRequest, file, options)
        .then(result => {
          cb(result, fileName);
        })
        .catch(error => {
          alert('ERROR ' + JSON.stringify(error));
        });
    })
    // eslint-disable-next-line no-unused-vars
    .catch(err => {
      console.log('ERR', err);
    });
};

export const normalizeTopics = topics => {
  return topics.map(({ name, slug }) => ({
    value: slug,
    label: name
  }));
};
