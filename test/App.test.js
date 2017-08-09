import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/App';
import { defaultStateMock } from './mocks/AppMock';

const { describe, it, expect } = global;

describe('<App />', () => {
	it('should shallow mount for testing', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders a div with id \'#app\'', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('#app')).toHaveLength(1);
	});

	it('constructs a default state', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.state).toBeDefined();
	});

	it('loaded default state matches mock', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.state()).toEqual(defaultStateMock);
	});

	it('displays title that matches appTitle in state', () => {
		const wrapper = shallow(<App />);
		wrapper.setState({ shouldPostsUpdate: false });
		expect(wrapper.find('.app-title').text()).toEqual(wrapper.state().appTitle);
	});

	it('title display responds to changes to state', () => {
		const wrapper = shallow(<App />);
		const newTitle = 'New test title';
		wrapper.setState({ shouldPostsUpdate: false });
		wrapper.setState({ appTitle: newTitle });
		expect(wrapper.find('.app-title').text()).toEqual(newTitle);
	});

	it('displays Posts components equal to number of posts in state', () => {
		const wrapper = shallow(<App />);
		wrapper.setState({ shouldPostsUpdate: false });
		expect(wrapper.find('.post')).toHaveLength(0);
		wrapper.setState({ posts: [
			{
				id: 0,
				title: { rendered: 'New test title' },
			},
		] });
		expect(wrapper.render().find('.post')).toHaveLength(1);
	});
});
