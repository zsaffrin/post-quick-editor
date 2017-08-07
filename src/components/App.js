import React, { Component } from 'react';

import {
	fetchGetJson,
	updatePost,
} from './_staticFunctions';
import Post from './Post';

require('font-awesome/css/font-awesome.min.css');
require('../styles/App.scss');

const defaultState = {
	appTitle: 'Post Quick-Editor',
	posts: [],
};

const WP_URL = 'http://localhost:8888/wp-json/wp/v2';
const WP_POSTS_API_URL = `${WP_URL}/posts`;
const WP_MEDIA_API_URL = `${WP_URL}/media`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = defaultState;
	}

	componentDidMount() {
		this.refreshPosts();
	}

	refreshPosts() {
		fetchGetJson(WP_POSTS_API_URL)
			.then(posts => this.setState({ posts }));
	}

	savePost(id, data) {
		const url = `${WP_POSTS_API_URL}/${id}`;
		updatePost(url, data)
			.then(() => this.refreshPosts);
	}

	render() {
		const { appTitle, posts } = this.state;

		let postNodes;
		if (posts.length > 0) {
			postNodes = posts.map((post) => {
				const { id, title, featured_media } = post;

				const featuredMedia = fetchGetJson(
					`${WP_MEDIA_API_URL}/${featured_media}`,
				)
					.then(media => media.source_url);

				return (
					<Post
						id={id}
						title={title.rendered}
						featuredMediaUrl={featuredMedia}
						updatePost={this.savePost}
						key={post.id}
					/>
				);
			});
		}

		return (
			<div id="app">
				<h2>{appTitle}</h2>
				<div className="posts">
					{postNodes}
				</div>
			</div>
		);
	}
}

export default App;
