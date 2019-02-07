import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
				.then(users => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});

	}

	render() {
		const {robots, searchfield} = this.state
		const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		
		return !robots.length ?
		<div>
			<h1 className='tc'>Loading</h1>
			<h3 className='tc'>Been a while and not seeing anything? Your browser may be blocking some necessary scripts. Please enable them. I promise, they're safe :)</h3>
		</div> :
		(
			<div className='tc'>
				<h1 className='f1'>Robofriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		)
	}
}

export default App;