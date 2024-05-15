from models import *
from services import *

@app.route('/')
def index():
    return 'Hello, World from backend'

def create_user():
    pass
def read_user():
    pass
def update_user():
    pass
def delete_user():
    pass

    
@app.route('/create_recipe',methods=['POST'])
def create_recipe():
        try:
            data = request.get_json()
            new_recipe = Recipe(title=data['title'])
            db.session.add(new_recipe)
            db.session.commit()
            return jsonify({"message": "Recipe created successfully!", "recipe": new_recipe.to_dict()}), 201

        except Exception as e:
            print(e)
            return jsonify({"error": "Could not create recipe"}), 422
  
    
def read_recipe():
    pass
def update_recipe():
    pass
def delete_recipe():
    pass

if __name__ == '__main__':
    app.run(debug=True)
