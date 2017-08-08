import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchGetJson } from './_staticFunctions';

import Button from './Button';

require('../styles/Post.scss');

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			isConfirmDelete: false,
			postId: props.id,
			postTitle: props.title,
			postMedia: {},
		};

		this.toggleEditing = this.toggleEditing.bind(this);
		this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.savePostChanges = this.savePostChanges.bind(this);
		this.removePost = this.removePost.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
		const { wpUrl, featuredMedia } = this.props;

		if (this.props.featuredMedia !== 0) {
			fetchGetJson(`${wpUrl}/media/${featuredMedia}`)
				.then(obj => this.setState({ postMedia: obj }));
		}
	}

	toggleEditing() {
		this.setState({ isEditing: !this.state.isEditing });
	}

	toggleConfirmDelete() {
		this.setState({ isConfirmDelete: !this.state.isConfirmDelete });
	}

	revertChanges() {
		this.setState({
			postTitle: this.props.title,
		});
	}

	handleTitleChange(e) {
		this.setState({
			postTitle: e.target.value,
		});
	}

	savePostChanges() {
		const { postId, postTitle } = this.state;
		const body = new window.FormData();
		body.append('title', postTitle);
		this.props.updatePost(postId, body);
		this.toggleEditing();
	}

	removePost() {
		this.props.deletePost(this.state.postId);
		this.toggleConfirmDelete();
	}

	handleCancel() {
		this.revertChanges();
		this.toggleEditing();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.savePostChanges();
	}

	render() {
		const { isEditing, isConfirmDelete, postTitle } = this.state;

		const imageField = this.state.postMedia.source_url ?
			(
				<img
					src={this.state.postMedia.source_url}
					alt={`${postTitle} featured media`}
				/>
			) :
			'';

		let titleField = postTitle;
		if (isEditing) {
			titleField = (
				<form onSubmit={this.savePostChanges}>
					<input
						className="post-title-input"
						type="text"
						value={postTitle}
						onChange={this.handleTitleChange}
					/>
				</form>
			);
		}
		if (isConfirmDelete) {
			titleField = (
				<div className="danger-text">
					Delete post {postTitle}?
				</div>
			);
		}

		let actionsField = (
			<div className="post-actions">
				<Button
					title="Edit"
					faIcon="pencil"
					action={this.toggleEditing}
				/>
				<Button
					title="Delete"
					type="danger"
					faIcon="times"
					action={this.toggleConfirmDelete}
				/>
			</div>
		);
		if (isEditing) {
			actionsField = (
				<div className="post-actions">
					<Button
						title="Save Changes"
						type="action"
						faIcon="check"
						action={this.savePostChanges}
					/>
					<Button
						title="Cancel"
						type="danger"
						faIcon="ban"
						action={this.handleCancel}
					/>
				</div>
			);
		}
		if (isConfirmDelete) {
			actionsField = (
				<div className="post-actions">
					<Button
						title="Delete Post"
						label="Yes, Delete"
						type="danger"
						faIcon="times"
						action={this.removePost}
					/>
					<Button
						title="Cancel"
						label="Cancel"
						faIcon="ban"
						action={this.toggleConfirmDelete}
					/>
				</div>
			);
		}

		return (
			<div className="post">
				<div className="post-image">{imageField}</div>
				<div className="post-title">{titleField}</div>
				{actionsField}
			</div>
		);
	}
}
Post.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	featuredMedia: PropTypes.number,
	updatePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	wpUrl: PropTypes.string.isRequired,
};
Post.defaultProps = {
	id: 0,
	title: '',
	featuredMedia: null,
};

export default Post;
