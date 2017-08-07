import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

require('../styles/Post.scss');

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			postId: props.id,
			postTitle: props.title,
			postMedia: props.featuredMediaUrl,
		};

		this.toggleEditing = this.toggleEditing.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSaveChanges = this.handleSaveChanges.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	toggleEditing() {
		this.setState({ isEditing: !this.state.isEditing });
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

	handleSaveChanges() {
		const { postId, postTitle } = this.state;
		const body = new window.FormData();
		body.append('title', postTitle);
		this.props.updatePost(postId, body);
		this.toggleEditing();
	}

	handleCancel() {
		this.revertChanges();
		this.toggleEditing();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.handleSaveChanges();
	}

	render() {
		const { isEditing, postTitle } = this.state;

		const imageField = this.state.postMedia ?
			(
				<img
					src={this.state.postMedia}
					alt={`${postTitle} featured media`}
				/>
			) :
			'';

		const titleField = isEditing ?
			(
				<form onSubmit={this.handleSaveChanges}>
					<input
						className="post-title-input"
						type="text"
						value={postTitle}
						onChange={this.handleTitleChange}
					/>
				</form>
			) :
			postTitle;

		const actionsField = isEditing ?
			(
				<div className="post-actions">
					<Button
						title="Save Changes"
						type="action"
						faIcon="check"
						action={this.handleSaveChanges}
					/>
					<Button
						title="Cancel"
						type="danger"
						faIcon="ban"
						action={this.handleCancel}
					/>
				</div>
			) :
			(
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
						action={this.handleCancel}
					/>
				</div>
			);

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
	featuredMediaUrl: PropTypes.string,
	updatePost: PropTypes.func,
};
Post.defaultProps = {
	id: 0,
	title: '',
	featuredMediaUrl: '',
	updatePost: () => {},
};

export default Post;
