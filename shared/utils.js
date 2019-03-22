/* eslint import/prefer-default-export: 0 */
import moment from 'moment';

const isToday = date => moment(date).isSame(moment(), 'day');

const isYesterday = date =>
  moment(date).isSame(moment().subtract(1, 'days'), 'day');

export const formatDate = date => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return moment(date).format('MMMM Do');
};
