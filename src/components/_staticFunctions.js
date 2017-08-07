import Promise from 'promise-polyfill';
import 'whatwg-fetch';

export const fetchGetJson = url => (
	new Promise((resolve, reject) => {
		window.fetch(url, { method: 'GET' })
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(err => reject(console.error(err)));
	})
);

export const updatePost = (url, data) => (
	new Promise((resolve, reject) => {
		window.fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				Authorization: `Basic ${window.btoa('admin:admin')}`,
			},
		}).then(response => resolve(response))
			.catch(err => reject(console.error(err)));
	})
);
