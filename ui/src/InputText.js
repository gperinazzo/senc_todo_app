import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
		};
		this._handleChange = this._handleChange.bind(this);
	}

	static propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.string,
		placeholder: PropTypes.string,
	}

	componentWillReceiveProps(newProps, newState) {
		this.setState({value: newProps.value});
	}

	_handleChange() {
		this.props.onChange(this.refs.input.value);
	}

	render() {
		return (
			<input type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this._handleChange.bind(this)} ref="input"/>
		)
	}
}

export default InputText;