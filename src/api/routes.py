"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash,check_password_hash
import bcrypt

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def crear_usuarios():
    user_data=request.json
    if user_data.get("email") is None or user_data.get("password") is None:
        return jsonify(
            {
                "message":"email an password required"
            }
        ),400
    
    email=user_data.get("email")
    password=user_data.get("password")
    salt=str(bcrypt.gensalt(14))
    print("el hash",password+salt)
    password_hash=generate_password_hash(password + salt)
    user_exist= User.query.filter_by(email=email).one_or_none()  
    if user_exist is not None:
             return jsonify({
            "message":"usuario ya existente"

        }),400

    user=User()
    user.email = email
    user.password_hash = password_hash
    user.salt=salt
    user.is_active =True

    try:
        db.session.add(user)
        db.session.commit()
    except Exception as error:
        print("este es el error",error)
        print("Tipo de error",type(error))
        print("args del error",error.args)
        db.session.rollback()
        return jsonify,({

            "message": "DB error"

        }),500
    return jsonify({
        "user":user.serialize()

    }),201

@api.route("/login", methods=["POST"])
def login():
    user_data=request.json
    if user_data.get("email") is None or user_data.get("password") is None:
        return jsonify(
            {
                "message":"email an password required"
            }
        ),400
    email=user_data.get("email")
    password = user_data.get("password")
    user = User.query.filter_by(email=email).one_or_none()

    if user is None:
        return jsonify({
            "message":"credenciales invalidas"
        }),400
   
    password_is_valid= check_password_hash(user.password_hash,password + user.salt)
    
    if not password_is_valid:
         return jsonify({
            "message":"credenciales invalidas"
        }),400
    
    access_token = create_access_token(identity=user.id)
 
    return jsonify({

        "token":access_token
    }),201


@api.route("/private", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    print(user_id)
    user = User.query.get(user_id)
    return jsonify(user.serialize()),200   
