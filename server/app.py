from models import *
from services import *

@app.route('/')
def index():
    return 'hello, from backend!'


@app.route('/users', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        clerk_id = data.get('clerk_id')  
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        if clerk_id is None:
            print("Missing required data: clerk_id:", clerk_id, "first_name:", first_name)
            return jsonify({"error": "Missing required data"}), 400

        existing_user = User.query.filter_by(clerk_id=clerk_id).first()  
        if existing_user:
            print("User already exists:", existing_user.to_dict())
            return jsonify({"message": "User already exists", "user": existing_user.to_dict()}), 200
        
        new_user = User(clerk_id=clerk_id, first_name=first_name, last_name=last_name)  
        db.session.add(new_user)
        db.session.commit()
        print("User committed to the database")

        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"error": "An error occurred: " + str(e)}), 500


@app.route('/create_recipe', methods=['POST'])
def add_recipe():
    try:
        data = request.get_json()
        clerk_id = data.get('clerk_id') 
        title = data.get('title')
        creator_name = data.get('creator_name')
        creator_nickname = data.get('creator_nickname')
        creator_bio=data.get('creator_bio')
        creator_photo_public_id = data.get('creator_photo_public_id')
        memory=data.get('memory')
        country = data.get('country')
        desc = data.get('desc')
        ingredients = data.get('ingredients')
        directions = data.get('directions')

        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found for clerk_id: {}".format(clerk_id)}), 404

        new_recipe = Recipe(
            title=title,
            creator_name=creator_name,  
            creator_nickname=creator_nickname,
            creator_bio=creator_bio,
            creator_photo_public_id=creator_photo_public_id, 
            memory=memory,
            country=country,
            desc=desc,
            author=user  
        )

        if ingredients:
            for ingredient_data in ingredients:
                ingredient = Ingredient(
                    name=ingredient_data.get('name'), 
                    quantity=ingredient_data.get('quantity'),
                    unit=ingredient_data.get('unit')
                )
                new_recipe.ingredients.append(ingredient)

        if directions:
            for direction_data in directions:
                direction = Direction(
                    order=direction_data.get('order'), 
                    step=direction_data.get('step')
                )
                new_recipe.directions.append(direction)

        db.session.add(new_recipe)
        db.session.commit()

        return jsonify({"message": "Recipe created successfully!", "recipe": new_recipe.to_dict()}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not create recipe"}), 422


@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    try:
        clerk_id = request.args.get('clerk_id')
        if not clerk_id:
            return jsonify({"error": "clerk_id is required"}), 400

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        if recipe.user_clerk_id != clerk_id:
            return jsonify({"error": "Unauthorized"}), 403

        db.session.delete(recipe)
        db.session.commit()
        
        return jsonify({"message": "Recipe deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Could not delete recipe: {str(e)}"}), 422


@app.route('/search_recipes')
def search_recipes():
    try:
        search_query = request.args.get('search_query', '')
        recipes = Recipe.query.all()
        filtered_recipes = []
        for recipe in recipes:
            inspector = inspect(recipe)
            for attr, value in inspector.attrs.items():
                if isinstance(value.value, str):
                    print(f"Checking attribute '{attr}' with value: '{value.value}'")
                    if search_query.lower() in value.value.lower():
                        filtered_recipes.append(recipe.to_dict())
                        break  

        return jsonify(filtered_recipes), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch recipes"}), 422


@app.route('/recipes')
def get_all_recipes():
    try:
        recipes = Recipe.query.all()
        recipes_data = [recipe.to_dict() for recipe in recipes]
        return jsonify(recipes_data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch recipes"}), 422


@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    try:
        print(f"Attempting to fetch recipe with ID: {recipe_id}")
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        
        if not recipe:
            print(f"Recipe not found: {recipe_id}")
            return jsonify({"error": "Recipe not found"}), 404
        
        print(f"Successfully fetched recipe: {recipe_id}")
        return jsonify(recipe.to_dict()), 200
    except Exception as e:
        print(f"Error fetching recipe with ID {recipe_id}: {e}")
        return jsonify({"error": "Could not fetch recipe"}), 422
    

@app.route('/users/<clerk_id>/recipes', methods=['GET'])
def get_authored_recipes(clerk_id):
    try:
        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        recipes = Recipe.query.filter_by(user_clerk_id=clerk_id).all()
        recipes_data = [recipe.to_dict() for recipe in recipes]
        return jsonify(recipes_data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch recipes"}), 422


@app.route('/users/<clerk_id>/favorited_recipes', methods=['GET'])
def get_favorited_recipes(clerk_id):
    try:
        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        favorited_recipes = Favorite.query.filter_by(user_clerk_id=clerk_id).all()
        favorited_recipes_data = [favorite.recipe.to_dict() for favorite in favorited_recipes]
        return jsonify(favorited_recipes_data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch favorited recipes"}), 422

@app.route('/favorites/status', methods=['GET'])
def check_favorite_status():
    try:
        clerk_id = request.args.get('clerk_id')
        recipe_id = request.args.get('recipe_id')

        if not clerk_id or not recipe_id:
            return jsonify({"error": "Missing clerk_id or recipe_id"}), 400

        favorite = Favorite.query.filter_by(user_clerk_id=clerk_id, recipe_id=recipe_id).first()
        if favorite:
            return jsonify({"isFavorited": True}), 200
        else:
            return jsonify({"isFavorited": False}), 200
    except Exception as e:
        print("Error in check_favorite_status:", e)
        return jsonify({"error": "Could not check favorite status"}), 500


@app.route('/favorites/toggle', methods=['POST'])
def toggle_favorite():
    try:
        data = request.get_json()
        clerk_id = data.get('clerk_id')
        recipe_id = data.get('recipe_id')

        if not clerk_id:
            return jsonify({"error": "Missing clerk_id"}), 400
        if not recipe_id:
            return jsonify({"error": "Missing recipe_id"}), 400

        favorite = Favorite.query.filter_by(user_clerk_id=clerk_id, recipe_id=recipe_id).first()
        if favorite:
            db.session.delete(favorite)
            is_favorited = False
            message = "Recipe unfavorited successfully"
        else:
            new_favorite = Favorite(user_clerk_id=clerk_id, recipe_id=recipe_id)
            db.session.add(new_favorite)
            is_favorited = True
            message = "Recipe favorited successfully"

        db.session.commit()
        return jsonify({"message": message, "isFavorited": is_favorited}), 200
    except Exception as e:
        print("Error in toggle_favorite:", e)
        return jsonify({"error": "Could not toggle favorite status"}), 422

if __name__ == '__main__':
    app.run(debug=True)


