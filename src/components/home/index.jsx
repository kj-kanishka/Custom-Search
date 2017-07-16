import {
	h,
	Component
} from 'preact';
import style from './style.less';
import axios from 'axios'; //npm module for http requests
export default class Profile extends Component {
	state = {
		search: "",
		articles: []

	};


	hello = (query) => {
		var that = this;
		var KEY = "AIzaSyAzvprxLLASFjHotKv1Le9x297s2n1Tu3o"
		var CSE = "003584803117743572628:ne8j-9gtn0m"
		axios.get("https://www.googleapis.com/customsearch/v1?key=" + KEY + "&cx=" + CSE + "&q=" + query)
			.then(function(response) {

				console.log("response>", response.data.items)
					// console.log(">>>", that.state.count)

				that.setState({
					articles: response.data.items
				});

				// console.log("response", this.restaurants)
				// this.setState({
				// 	count: this.state.count + 1
				// });
				// this.state.restaurants = response.restaurants

			});

	}

	// change = (value) => {
	// 	console.log("event.target.value", value)
	// 	this.setState({
	// 		selected: value
	// 	});

	// 	console.log("this", this.state.selected)
	// }
	// sort = (value) => {
	// 	console.log("event.target.value", value)
	// 	this.setState({
	// 		sort: value
	// 	});

	// 	console.log("this", this.state.selected)
	// }
	// order = (value) => {
	// 	console.log("event.target.value", value)
	// 	this.setState({
	// 		order: value
	// 	});

	// 	console.log("this", this.state.selected)
	// }
	render({
		search,
		articles


	}) {

		var Rdata = null;

		if (this.state.articles.length > 0) {
			Rdata = <this.Parent/>
		}

		return (
			<div class={style.profile}>
				
				<form onSubmit={(e) => e.preventDefault()}>
					<div class="field">

					<input class={style.myinput} type="text" name="search" placeholder="Search.." onkeyup={(e) => this.hello(e.target.value) }/>
					</div>
					<br/>
					
					
					<br/>
					
				</form>
				<ul>
				{this.state.articles.map(function(d){
					return   <li >
					{
						function(){
							if(d.pagemap.cse_image&&d.pagemap.cse_image.length){
								return <img src={d.pagemap.cse_image[0].src} style="width:100px;height:50px;"/>
							}
						}()
					}
						
							<b><a href={d.link} target = "_blank"><div dangerouslySetInnerHTML={{__html: d.htmlTitle}} ></div></a></b>
							source : <u>{d.displayLink}</u>
							    <br/>
							    <br/>
							    <div dangerouslySetInnerHTML={{__html: d.htmlSnippet}}></div>
							    <hr align="left" width="100%"/>
							    <br/>
							    <br/>
							  </li>
					
				})}
				</ul>
				
			</div>
		);
	}
}