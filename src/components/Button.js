import React from 'react';
import PropTypes from 'prop-types';

require('../styles/Button.scss');

const Button = ({ title, type, label, faIcon, action }) => {
	let icon;
	if (faIcon) {
		icon = <div className={`icon fa fa-${faIcon}`} />;
	}

	let labelDiv;
	if (label) {
		labelDiv = <div className="label">{label}</div>;
	}

	return (
		<button
			title={title}
			className={`button ${type}`}
			onClick={action}
		>
			{icon}
			{labelDiv}
		</button>
	);
};
Button.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	faIcon: PropTypes.string,
	action: PropTypes.func,
};
Button.defaultProps = {
	title: '',
	type: 'default',
	label: '',
	faIcon: '',
	action: () => {},
};

export default Button;
