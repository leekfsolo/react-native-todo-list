export const generateRandomId = () => Math.pow(Math.random(), 10).toString();

export const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatTime = (time: Date) => {
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${hours}:${minutes}`;
};
