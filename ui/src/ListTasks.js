import React from 'react';
import PropTypes from 'prop-types';
import ContainerTask from './ContainerTask';

class ListTasks extends React.Component {

	static propTypes = {
		tasks: PropTypes.array.isRequired,
	}

	render() {

		let containers = this.props.tasks.map(function(task, index) {
			return (<ContainerTask key={index} task={task}/>);
		});

		return(
			<div className="container_list">
				{containers}
			</div>
		);
	}
}

export default ListTasks;