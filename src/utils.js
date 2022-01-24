import axios from 'axios'

const url =
"https://api.nasa.gov/planetary/apod?api_key=NKjkCXMHHhCg3HcoUPe36Upvw9RVKcFB2JudVHeq";

export const prepareDate = (interval) => {
	//get date from some days back
	const todayTime = new Date().getTime();
	const time = new Date(todayTime - interval * 60 * 60 * 24 * 1000).getTime();

	const newDate = new Date(time);
	let day = newDate.getDate();
	day = day < 10 ? "0" + day.toString() : day.toString();

	let month = newDate.getMonth() + 1;
	month = month < 10 ? "0" + month.toString() : month.toString();

	const year = newDate.getFullYear().toString();

	return `${year}-${month}-${day}`;
};

export async function fetchData(correctFormat) {
  const apob = await axios(url + "&start_date=" + correctFormat);
  if (apob && apob.data) {
    const otherImages = apob.data.reverse();
    const latestImage = otherImages.shift();
    const response = {
      otherImages,
      latestImage,
    };

    return response;
  }
}
