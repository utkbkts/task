import dayjs from "dayjs";

export const timeStamp = (unix_timestamp:any) => {
  const formattedTime = dayjs.unix(unix_timestamp).format("HH:mm:ss");
  return formattedTime;
};

export const updateSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string
) => {
  if (searchParams.has(key)) {
    searchParams.set(key, value);
  } else {
    searchParams.append(key, value);
  }

  return searchParams;
};