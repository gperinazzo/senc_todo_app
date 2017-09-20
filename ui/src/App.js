import React from 'react';
import ListTasks from './ListTasks';
import FormNewTask from './FormNewTask';
import Axios from 'axios';
import PubSub from 'pubsub-js';
import logo from './logo_raccoon.png';
import account_icon from './account_icon.svg';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      'tasks': [],
    }

    PubSub.subscribe("COMPLETE_TASK", this._handleCompleteTask.bind(this));
    PubSub.subscribe("ADD_TASK", this._handleAddTask.bind(this));
  }

  _handleCompleteTask(msg, id) {
    Axios.patch("http://localhost:5000/tasks/" + id , {complete: true})
      .then(function(response){

        let tasks = this.state.tasks.slice(); // Copia o array!
        tasks.forEach(function(item, index) {
          if(item.id === id) {
            item.complete = true;
          }
        });
        this.setState({tasks: tasks});

      }.bind(this));
  }

  _handleAddTask(msg, task) {
    Axios.post("http://localhost:5000/tasks", task)
      .then(function(response){

        let tasks = this.state.tasks.slice(); // Copia o array!
        tasks.push(response.data);
        this.setState({tasks: tasks});

      }.bind(this));
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/tasks")
      .then(function(response){
        this.setState({tasks: response.data});
      }.bind(this));
  }
  
  render() {
    return (
      <div className="app">
        <div className="header">
          <img alt="Raccoon Logo" src={logo}/>
          <h1>  TO DO RACCOON  </h1>
          <div className="account_container">
            <img src={account_icon} alt="Account Icon"/>
            Olá, Raccooner
          </div>
        </div>
        <FormNewTask/>
        <ListTasks tasks={this.state.tasks}/>
      </div>
      
    );
  }
}

export default App;
