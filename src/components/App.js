import React, { Component } from 'react';

import { fetchGetJson, updatePost, deletePost } from './_staticFunctions';
import Post from './Post';

require('../styles/App.scss');

const WP_URL = 'http://localhost:8888/wp-json/wp/v2';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appTitle: 'Post Quick-Editor',
			maxPostsToDisplay: 10,
			posts: [],
			shouldPostsUpdate: true,
		};

		this.removePost = this.removePost.bind(this);
	}

	componentDidMount() {
		this.refreshPosts();
	}

	componentDidUpdate() {
		if (this.state.shouldPostsUpdate) {
			this.refreshPosts();
		}
	}

	refreshPosts() {
		fetchGetJson(`${WP_URL}/posts?per_page=${this.state.maxPostsToDisplay}`)
			.then(posts => this.setState({
				posts,
				shouldPostsUpdate: false,
			}));
	}

	savePost(id, data) {
		const url = `${WP_URL}/posts/${id}`;
		updatePost(url, data)
			.then(() => this.refreshPosts);
	}

	removePost(id) {
		const url = `${WP_URL}/posts/${id}`;
		deletePost(url)
			.then(() => this.setState({ shouldPostsUpdate: true }));
	}

	render() {
		const { appTitle, posts } = this.state;

		const postNodes = posts ?
			posts.map((post) => {
				const { id, title, featured_media } = post;

				return (
					<Post
						id={id}
						title={title.rendered}
						featuredMedia={featured_media}
						updatePost={this.savePost}
						deletePost={this.removePost}
						wpUrl={WP_URL}
						key={post.id}
					/>
				);
			}) :
			'No posts';

		return (
			<div id="app">
				<div className="header">
					<h2 className="app-title">{appTitle}</h2>
					<div className="header-author">
						<span className="author-credit">by</span>
						<a
							href="http://zachsaffrin.com"
							target="_blank"
							rel="noreferrer noopener"
							className="author-name"
						>
							Zach Saffrin
						</a>
					</div>
				</div>
				<div className="posts">
					{postNodes}
				</div>
			</div>
		);
	}
}

export default App;
