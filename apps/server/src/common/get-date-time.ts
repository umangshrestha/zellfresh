export const get_date_time_string = () => {
  const dateTime = new Date();
  return dateTime.toISOString();
};
