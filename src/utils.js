export const formatDate = (time) =>{

  const newDate = new Date(time);
  let day = newDate.getDate();
  day = day < 10 ? ("0" + day.toString()): day.toString()
  let month = newDate.getMonth + 1;
  month = month < 10 ? ("0" + month.toString()): month.toString()
  const year = newDate.getFullYear.toString();

  return `${year}-${month}-${day}`
}