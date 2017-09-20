import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

class Button extends React.Component {

	static propTypes = {
		icon: PropTypes.string.isRequired,
		action: PropTypes.func.isRequired,
	}

	render() {
		return(
			<div className="button" onClick={this.props.action}> <img src={this.props.icon} alt=""/> </div>
		);
	}
}

export default Button;