from flask import jsonify
from flask import Flask, request
import mongoengine as me
from datetime import datetime


class User(me.Document):
	name = me.StringField()
	email = me.StringField()

	def to_dict(self):
		return {
			'id': str(self.id),
			'name': self.name,
			'email': self.email
		}

class Task(me.Document):
	description = me.StringField()
	deadline = me.DateTimeField()
	title = me.StringField()
	complete = me.BooleanField()
	tags = me.ListField(me.StringField())
	added = me.DateTimeField()
	user = me.ReferenceField(User)
	color = me.StringField()

	def to_dict(self):
		return {
			'id': str(self.id),
			'title': self.title,
			'description': self.description,
			'complete': self.complete,
			'tags': self.tags,
			'added': int(self.added.timestamp()),
			'user': str(self.user.id),
			'color': self.color,
			'deadline': int(self.deadline.timestamp())
		}

# Instancia um objeto do Flask
app = Flask(__name__)
me.connect('todo_app')

# Cria uma rota raiz (/)
@app.route("/users", methods=['GET'])
def get_users():
	users = User.objects.all()	
	array = []
	for user in users:
		array.append(user.to_dict())

	return jsonify(array)

@app.route('/users', methods=['POST'])
def create_user():
	if not request.is_json:
		return jsonify({'error': 'not_json'}), 400
	data = request.get_json()
	name = data.get('name')
	email = data.get('email')
	user = User(name=name, email=email)
	user.save()
	return jsonify(user.to_dict())


@app.route("/tasks", methods=['GET'])
def get_tasks():
	tasks = Task.objects.all()	
	array = []
	for task in tasks:
		array.append(task.to_dict())

	return jsonify(array)


@app.route('/tasks', methods=['POST'])
def create_tasks():
	if not request.is_json:
		return jsonify({'error': 'not_json'}), 400
	data = request.get_json()
	# Ja sabemos que a task nao esta completa,
	# e que foi adicionada agora
	task = Task(complete=False, added=datetime.now())
	task.title = data.get('title')
	task.description = data.get('description')

	# A deadline eh convertida de timestamp para datetime, e
	# zero por padrao
	task.deadline = datetime.fromtimestamp(data.get('deadline', 0))
	task.color = data.get('color')

	# Tags sao um array vazio por padrao
	task.tags = data.get('tags', [])
	task.user = User.objects.filter(id=data.get('user')).first()
	task.save()
	return jsonify(task.to_dict())


@app.route('/tasks/<string:task_id>', methods=['PATCH'])
def update_tasks(task_id):
	if not request.is_json:
		return jsonify({'error': 'not_json'}), 400
	task = Task.objects.filter(id=task_id)
	if not task:
		return jsonify({'error': 'not_found'}), 404
	data = request.get_json()
	task.complete = data.get('complete', task.complete)
	task.save()
	return jsonify(task.to_dict())

# Roda seu servidor web
if __name__ == "__main__":
	app.run(debug=True)