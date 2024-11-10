export const get_date_time_string = () => {
  const dateTime = new Date();
  return dateTime.toISOString();
};

export const convert_date_to_string = (date: Date) => {
  return date.toISOString();
};
