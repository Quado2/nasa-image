
import "./Apod.css";
import ImageCard from "../../components/ImageCard/ImageCard";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState, useRef, useMemo } from "react";
import { prepareDate, fetchData} from "../../utils";

function Apod() {


	const interval = 5;
	const [imageData, setImageData] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);
	const [latestImage, setLatetestImage] = useState();
	const [dayIntervals, setDayIntervals] = useState(interval);

	const loadMoreRef = useRef();



	useEffect(() => {
		//fetch nominated list from local storage if it exists
		let likedImages = window.localStorage.getItem("likedImages");

		processData();
		async function processData() {
			const correctFormat = prepareDate(interval);
			const { latestImage, otherImages } = await fetchData(correctFormat);
			setLatetestImage(latestImage);
			setImageData(otherImages);
			setLoadingPage(false);
		}

		if (likedImages !== null) {
			likedImages = JSON.parse(likedImages);
		}
	}, []);

	const options = useMemo(
		() => ({
			root: null,
			rootMargin: "0px 0px 10px 0px",
			threshold: .01,
		}),
		[]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
        console.log("we started fetching")
				
       // processData();
       // async function processData(){
          //const correctFormat = prepareDate(dayIntervals + dayIntervals);
          //const { otherImages } = await fetchData(correctFormat);
          // setImageData([otherImages])
          // console.log("We finished fetching: ", imageData)

       // }
			}
		}, options);

		const loadMoreCurrent = loadMoreRef.current;
		loadMoreCurrent && observer.observe(loadMoreCurrent);

		return () => {
			loadMoreCurrent && observer.unobserve(loadMoreCurrent);
		};
	}, [options, dayIntervals,imageData]);

	// Obtaint the latest image here

	const latestImageTitle = latestImage && latestImage.title;
	const latestImageDate = latestImage && latestImage.date;
	const latestImageUrl = latestImage && latestImage.url;
	const latestImageExplanation = latestImage && latestImage.explanation;

	return (
		<div className="apod">
			<header>
				<h1>Astronomy Picture of the day</h1>
			</header>
			{loadingPage ? (
				<Spinner message="Page is loading" color="green" />
			) : (
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
							{imageData &&
								imageData.map((data) => {
									return <ImageCard key={data.url} data={data} />;
								})}
						</div>
					</div>
					<div ref={loadMoreRef}>
						<Spinner message="loading more ..." color="green" />
					</div>
				</main>
			)}
		</div>
	);
}

export default Apod;
