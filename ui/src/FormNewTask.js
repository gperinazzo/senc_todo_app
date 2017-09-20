import React from 'react';
import PubSub from 'pubsub-js';
import InputText from './InputText';
import Button from './Button';
import add_icon from './add_icon.svg';

class FormNewTask extends React.Component {
	
	constructor() {
		super();
		this.state = {
			task: {title: '', description: ''}
		};
	}

	_handleChangeTitle(title) {
		let task = this.state.task;
		task.title = title;
		this.setState({task: task});
	}

	_handleChangeDescription(description) {
		let task = this.state.task;
		task.description = description;
		this.setState({task: task});
	}

	_handleClick() {
		PubSub.publish('ADD_TASK', this.state.task);
		this.setState({task: {title: '', description: ''}});
	}

	render() {

		return (
			<div className="container_form">
				<h4> Adicionar uma nova tarefa: </h4>
				<div className="container_fields">
					<div className="container_inputs">
						<InputText placeholder="Título" value={this.state.task.title} onChange={this._handleChangeTitle.bind(this)}/>
						<InputText placeholder="Descrição" value={this.state.task.description} onChange={this._handleChangeDescription.bind(this)}/>
					</div>
					<Button action={this._handleClick.bind(this)} icon={add_icon}/>
				</div>
			</div>
		);
		
	}
}

export default FormNewTask;