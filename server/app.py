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
        creator_photo=data.get('creator_photo')
        memory=data.get('memory')
        country = data.get('country')
        desc = data.get('desc')
        visibility = data.get('visibility', 'global')
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
            country=country,
            desc=desc,
            visibility=visibility,
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



@app.route('/recipes/<int:recipe_id>/visibility', methods=['PATCH'])
def update_visibility(recipe_id):
    try:
        data = request.get_json()
        visibility = data.get('visibility')
        clerk_id = data.get('clerk_id')

        if not visibility or not clerk_id:
            return jsonify({"error": "Visibility and clerk_id are required"}), 400

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        if recipe.user_clerk_id != clerk_id:
            return jsonify({"error": "Unauthorized"}), 403

        recipe.visibility = visibility
        db.session.commit()

        return jsonify({"message": "Visibility updated successfully", "recipe": recipe.to_dict()}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not update visibility"}), 422


@app.route('/recipes')
def get_all_recipes():
    try:
        recipes = Recipe.query.all()
        recipes_data = [recipe.to_dict() for recipe in recipes]
        return jsonify(recipes_data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch recipes"}), 422


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
    

@app.route('/family/recipes', methods=['GET'])
def get_family_recipes():
    try:
        clerk_id = request.args.get('clerk_id')

        if not clerk_id:
            return jsonify({"error": "User clerk_id is required"}), 400

        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if not user.family_id:
            return jsonify({"error": "User is not in a family"}), 400

        family = Family.query.get(user.family_id)
        if not family:
            return jsonify({"error": "Family not found"}), 404

        recipes = Recipe.query.filter_by(family_id=family.id).all()
        recipes_data = [recipe.to_dict() for recipe in recipes]

        return jsonify({"recipes": recipes_data}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/favorites/status', methods=['GET'])
def check_favorite_status():
    try:
        clerk_id = request.args.get('clerk_id')
        recipe_id = request.args.get('recipe_id')

        print(f"Received in check_favorite_status - clerk_id: {clerk_id}, recipe_id: {recipe_id}")

        if not clerk_id or not recipe_id:
            print("Missing clerk_id or recipe_id in check_favorite_status")
            return jsonify({"error": "Missing clerk_id or recipe_id"}), 400

        favorite = Favorite.query.filter_by(user_clerk_id=clerk_id, recipe_id=recipe_id).first()
        if favorite:
            print("Recipe is favorited")
            return jsonify({"isFavorited": True}), 200
        else:
            print("Recipe is not favorited")
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
            print(data)
            print("Missing clerk_id")
            return jsonify({"error": "Missing clerk_id"}), 400
        if not recipe_id:
            print("Missing recipe_id")
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
        print("Toggle favorite result:", {"message": message, "isFavorited": is_favorited})
        return jsonify({"message": message, "isFavorited": is_favorited}), 200
    except Exception as e:
        print("Error in toggle_favorite:", e)
        return jsonify({"error": "Could not toggle favorite status"}), 422


@app.route('/families', methods=['POST'])
def create_family():
    try:
        data = request.get_json()
        name = data.get('name')
        moderator_id = data.get('moderator_id')

        if not name or not moderator_id:
            return jsonify({"error": "Name and moderator_id are required"}), 400

        moderator = User.query.filter_by(clerk_id=moderator_id).first()
        if not moderator:
            return jsonify({"error": "Moderator not found"}), 404

        new_family = Family(name=name, moderator_id=moderator_id)
        db.session.add(new_family)
        db.session.commit()

        return jsonify({"success": "Family created successfully", "family": new_family.to_dict()}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not create family"}), 500
    

@app.route('/families')
def get_all_families():
    try:
        families = Family.query.all()
        families_data = [family.to_dict() for family in families]
        return jsonify(families_data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Could not fetch families"}), 422


@app.route('/family/status')
def check_family_status():
    try:
        clerk_id = request.args.get('clerk_id')  

        if not clerk_id:
            return jsonify({"error": "User clerk_id is required"}), 400

        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if user.family_id:
            family = Family.query.get(user.family_id)
            if not family:
                return jsonify({"error": "Family not found"}), 404

            return jsonify({
                "isInFamily": True,
                "familyData": {
                    "id": family.id,
                    "name": family.name,
                    "moderator_id": family.moderator_id,
                }
            }), 200
        else:
            return jsonify({"isInFamily": False}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/family/membership/<int:family_id>', methods=['POST'])
def toggle_family_membership(family_id):
    try:
        data = request.get_json()
        clerk_id = data.get('clerk_id')

        if not clerk_id:
            return jsonify({"error": "User clerk_id is required"}), 400

        family = Family.query.get(family_id)
        if not family:
            return jsonify({"error": "Family not found"}), 404

        user = User.query.filter_by(clerk_id=clerk_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if user in family.members:
            family.members.remove(user)
            user.family_id = None
            db.session.commit()
            return jsonify({"success": f"User {clerk_id} left the family"}), 200
        else:
            family.members.append(user)
            user.family_id = family.id
            db.session.commit()
            return jsonify({"success": f"User {clerk_id} joined the family"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
