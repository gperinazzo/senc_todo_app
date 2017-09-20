import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import PubSub from 'pubsub-js';
import complete_icon from './complete_icon.svg';
import delete_icon from './delete_icon.svg';

class ContainerTask extends React.Component {

	static propTypes = {
		task: PropTypes.object.isRequired,
	}

	_handleComplete() {
		PubSub.publish("COMPLETE_TASK", this.props.task.id);
	}

	_handleRemove() {
		PubSub.publish("REMOVE_TASK", this.props.task.id);
		alert("Não faz nada :/ Tente implementar :D");
	}

	render() {
		return (
			<div className="container_task">
				<h3> {this.props.task.title} {this.props.task.complete && <div className="badger_complete">COMPLETA</div>}</h3>
				<p> {this.props.task.description} </p>
				{ !this.props.task.complete && <Button icon={complete_icon} action={this._handleComplete.bind(this)}/> }
				<Button icon={delete_icon} action={this._handleRemove.bind(this)}/>
			</div>
		);
	}
}

export default ContainerTask;