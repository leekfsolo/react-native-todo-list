import {DateTime} from '../screens/reducer/model';

export const generateRandomId = () => Math.pow(Math.random(), 10).toString();

export const formatDate = (dateTime: DateTime) => {
  const {date, time} = dateTime;

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};
