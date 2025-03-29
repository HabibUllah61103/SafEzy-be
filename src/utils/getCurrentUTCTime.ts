import * as moment from 'moment-timezone';

export default function getCurrentUTCTime() {
  return moment(new Date()).utc().toDate();
}
