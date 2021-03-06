import {
	h,
	Component
} from 'preact';
import style from './style.less';
import axios from 'axios'; //npm module for http requests
export default class Profile extends Component {
	state = {
		search: "",
		articles: [],
		exactTerms: "",
		excludeTerms: ""

	};


	googlecse = (query) => {
		if (query) {
			this.setState({
				search: query
			});
		}
		var that = this;

		var KEY = "AIzaSyAD4W_EDH-Pwow_nqEnO4EAEhWOeqLHWtI"
		var CSE = "003584803117743572628:ne8j-9gtn0m"
		axios.get("https://www.googleapis.com/customsearch/v1?key=" + KEY + "&cx=" + CSE + "&q=" + this.state.search + "&exactTerms=" + this.state.exactTerms + "&excludeTerms=" + this.state.excludeTerms)
			.then(function(response) {

				console.log("response>", response.data.items)

				that.setState({
					articles: response.data.items
				});



			});

	}
	handleChange = function(state, e) {

		this.setState({
			[state]: e.target.value
		});

		console.log("here", this.state)
	}

	render({
		search,
		articles,
		exactTerms,
		excludeTerms


	}) {

		var Rdata = null;

		if (this.state.articles.length > 0) {
			Rdata = <this.Parent/>
		}

		return (
			<div class={style.profile}>
				
				<form onSubmit={(e) => e.preventDefault()}>
					<div class="field">

					<input class={style.myinput} type="text" name="search" placeholder="Search.." onkeyup={(e) => this.googlecse(e.target.value) }/>
					</div>
					<br/>
					
					<input type="text" name="Exact Terms" placeholder="Include Exact Terms" value={this.state.exactTerms} onChange={this.handleChange.bind(this, 'exactTerms')}/>
					<br/>
					<input type="text" name="Exclude Terms" placeholder="Exclude Terms" value={this.state.excludeTerms} onChange={this.handleChange.bind(this, 'excludeTerms')}/>
					<button class={style.button} onclick={(e)=>this.googlecse()}  type="submit">filter</button>
					<br/>
					
				</form>
				<ul>
				{this.state.articles.map(function(d){
					return   <li>
					{
						function(){
							if(d.pagemap.cse_image&&d.pagemap.cse_image.length){
								return <img src={d.pagemap.cse_image[0].src} style="width:100px;height:60px;"/>
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