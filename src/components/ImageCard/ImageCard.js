import "./ImageCard.css";

function ImageCard({ data }) {
	const { title, date, url } = data;
	// const {nominatedList,origin,handleNominate,handleRemove} = props
	// let movieIndex;
	// // if(nominatedList !== undefined){
	// //     movieIndex = nominatedList.findIndex(x => x.imdbID === imdbID)
	// // }

	// const [animateRemoval, setAnimateRemoval] = useState(false);
	// const [animateNomination, setAnimateNomination] = useState(false);

	// const handleRemoveClicked = (id)=> (event)=>{

	//     //set off the animation and wait for some 0.5s before
	//     //continuing with the function
	//     setAnimateRemoval(true)
	//     setTimeout(function(){
	//         handleRemove(id)
	//     },500)
	// }

	// const handleNominateClicked = (id)=> (event)=>{

	//     //set off the animation and wait for some 0.5s before
	//     //continuing with the function
	//     setAnimateNomination(true)
	//     setTimeout(function(){
	//         handleNominate(id)
	//         setAnimateNomination(false)
	//     },500)
	// }

	return (
		<div>
			<div className="poster-image">
				<img alt={title} src={url} />
			</div>
			<div className="poster-lower">
				<div className="poster-info">
					<h3>{title}</h3>
					<h3>{date}</h3>
				</div>
				<div className="poster-control">
					<button>like</button>
					<button>View More</button>
				</div>
			</div>
		</div>
	);
}

export default ImageCard;
