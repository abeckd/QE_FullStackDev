from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from models import db, User, Project
from helper import serialize_model
app = Flask(__name__)
 
app.config['SECRET_KEY'] = 'mysecretkey-qedev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/", methods=["GET"])
def hello_world():
    print("hola")
    return "Hello, World!"
 
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

#Project APIs#
@app.route("/projects", methods=["GET"])
def return_projects():
    project = db.session.query(Project).all()
    return serialize_model(project)

@app.route("/projects/<int:eID>", methods=["PUT"])
def update_project(eID):
    project = Project.query.get(eID)

    print(project)

    if project is None:
        return jsonify({"error": "Project not found"}), 404
    
    if 'project_name' in request.json:
        project.project_name = request.json['project_name']

    db.session.commit()
    return serialize_model(project)

@app.route("/projects/delete/<int:eID>", methods=["DELETE"])
def delete_project(eID):
    project = Project.query.get(eID)

    print(project)

    if project is None:
        return jsonify({"error": "Project not found"}), 404
    
    if project:
        print("deleting")
        print(project.project_name)
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Resource deleted successfully'})

    else:
        return jsonify({'message': 'Unknown Error'}), 500
 #/Project APIs#

if __name__ == "__main__":
    app.run(debug=True)