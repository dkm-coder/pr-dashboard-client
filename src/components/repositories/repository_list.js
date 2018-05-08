import io from 'socket.io-client';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

import { allRepositories } from '../../actions'

import config from '../../config';
import RepositoryItem from './repository_item'

const socket = io.connect('https://pr-dashboard-server.herokuapp.com/');

class RepositoriesList extends Component {

	componentDidMount() {
		socket.on('repos-update', this.props.allRepositories.bind(this));
		axios.get(`${config.baseServerUrl}/repos`)
			.then(res => this.props.allRepositories(res.data))
	}

	renderPullRequestItem () {
		return this.props.repos.map(repo => {
			return (
				<RepositoryItem
					key={repo._id}
					repo={repo}
					active={repo.hookEnabled}
				/>
			)
		})
	}

	render() {
		return (
			<div>
				{this.renderPullRequestItem()}
			</div>
		)
	}
}

const mapStateToProps = ({ repos }) => ({
	repos
})

const mapDispatchToProps = (dispatch) => ({
	allRepositories: (repos) => dispatch(allRepositories(repos))
})

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesList)


