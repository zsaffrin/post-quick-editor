import React from 'react';
import { shallow } from 'enzyme';

import Post from '../src/components/Post';
import { defaultStateMock } from './mocks/PostMock';

const { describe, it, expect } = global;

const postStem = (
	<Post
		id={0}
		title="test title"
		featuredMedia={0}
		updatePost={() => {}}
		deletePost={() => {}}
		wpUrl=""
		key={0}
	/>
);

describe('<Post />', () => {
	it('should shallow mount for testing', () => {
		const wrapper = shallow(postStem);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders a div with class \'.post\'', () => {
		const wrapper = shallow(postStem);
		expect(wrapper.find('.post')).toHaveLength(1);
	});

	it('constructs a default state', () => {
		const wrapper = shallow(postStem);
		expect(wrapper.state).toBeDefined();
	});

	it('default state matches mock', () => {
		const wrapper = shallow(postStem);
		expect(wrapper.state()).toEqual(defaultStateMock);
	});

	it('isEditing state renders post title editing input', () => {
		const wrapper = shallow(postStem);
		wrapper.setState({ isEditing: false });
		expect(wrapper.find('.post-title-input')).toHaveLength(0);
		wrapper.setState({ isEditing: true });
		expect(wrapper.find('.post-title-input')).toHaveLength(1);
	});

	it('isConfirmDelete state renders danger-text', () => {
		const wrapper = shallow(postStem);
		wrapper.setState({ isConfirmDelete: false });
		expect(wrapper.find('.danger-text')).toHaveLength(0);
		wrapper.setState({ isConfirmDelete: true });
		expect(wrapper.find('.danger-text')).toHaveLength(1);
	});
});
