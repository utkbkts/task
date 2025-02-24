import dayjs from "dayjs";

export const timeStamp = (unix_timestamp:any) => {
  const formattedTime = dayjs.unix(unix_timestamp).format("HH:mm:ss");
  return formattedTime;
};