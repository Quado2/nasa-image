import axios from "axios";

import "./Apod.css";
import ImageCard from "../../components/ImageCard/ImageCard";
import Backdrop from "../../components/Backdrop/Backdrop";
import PopUp from "../../components/PopUp/PopUp";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";

function Apod() {
	const url =
		"https://api.nasa.gov/planetary/apod?api_key=NKjkCXMHHhCg3HcoUPe36Upvw9RVKcFB2JudVHeq&start_date=2022-01-01";

	const [imageData, setImageData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

	useEffect(() => {
		//fetch nominated list from local storage if it exists
		let nominatedList = window.localStorage.getItem("likedImages");
		fetchData();
		async function fetchData() {
			const apob = await axios(url);
			apob && setImageData(apob.data);
			setLoadingPage(false)
		}
		if (nominatedList !== null) {
			nominatedList = JSON.parse(nominatedList);
		}
	}, []);

	// Obtaint the latest image here
	const latestImage = imageData[imageData.length - 1];
	const latestImageTitle = latestImage && latestImage.title;
	const latestImageDate = latestImage && latestImage.date;
	const latestImageUrl = latestImage && latestImage.url;
	const latestImageExplanation = latestImage && latestImage.explanation;
  
  const newData = [...imageData]
  newData.pop();

	return (
		<div className="apod">
			<header>
				<h1>Astronomy Picture of the day</h1>
			</header>
      {loadingPage? 
      <Spinner message='Page is loading' color="green" /> 
      : 
      <main>
				<div className="apod-landing">
					<div className="apod-image">
						<img src={latestImageUrl} alt={latestImageTitle} />
					</div>
					<div className="apod-description">
						<div className="apod-title">
							<h4>{latestImageTitle}</h4>
						</div>
						<div className="apod-date">
							<h4>{latestImageDate}</h4>
						</div>
						<div className="apod-explanation">
							<p>{latestImageExplanation}</p>
						</div>
					</div>
				</div>
        <div className="other-days">
          <div className="title">
            <h2>Other days</h2>
          </div>
          <div className="cards-wrapper">
            {newData.map(data => {
              return <ImageCard key={data.url} data = {data} />
            })}
          </div>
        </div>
			</main>
    }
			
		</div>
	);
}

export default Apod;
