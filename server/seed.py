from models import *
from services import *

def create_recipe(title, creator_name, creator_nickname, creator_bio, creator_photo_public_id, memory, country, desc, visibility, ingredients, directions, user_clerk_id, family_id=None):
    recipe = Recipe(
        title=title,
        creator_name=creator_name,
        creator_nickname=creator_nickname,
        creator_bio=creator_bio,
        creator_photo_public_id=creator_photo_public_id,
        memory=memory,
        country=country,
        desc=desc,
        visibility=visibility,
        user_clerk_id=user_clerk_id,
        family_id=family_id
    )
    db.session.add(recipe)
    db.session.commit()

    for ingredient in ingredients:
        new_ingredient = Ingredient(
            recipe_id=recipe.id,
            name=ingredient['name'],
            quantity=ingredient['quantity'],
            unit=ingredient['unit']
        )
        db.session.add(new_ingredient)

    for i, direction in enumerate(directions):
        new_direction = Direction(
            recipe_id=recipe.id,
            order=i+1,
            step=direction['step']
        )
        db.session.add(new_direction)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create the Cabrera family
        cabrera_family = Family(
            name="Cabrera",
            moderator_id="user_2gYebZGxBeBdQbTBV8SSJQ4SaHA"  # You need to replace this with the actual moderator ID
        )
        db.session.add(cabrera_family)
        db.session.commit()

        # Create Elsa Cabrera
        elsa = User(
            clerk_id="user_2hDLKhW3XuVHeefS4fO1YBVK5B1",  # You need to replace this with the actual clerk ID
            first_name="Elsa",
            last_name="Cabrera",
            family=cabrera_family  # Associate Elsa with the Cabrera family
        )
        db.session.add(elsa)
        db.session.commit()

        # Elsa's Pupusas recipe
        create_recipe(
            title="Pupusas",
            creator_name="Elsa Cabrera",
            creator_nickname="Elsa",
            creator_bio="Elsa Cabrera from El Salvador is sharing her beloved pupusas recipe. Join her in discovering the rich flavors and traditional techniques that make this dish so special.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717089424/ElsaCabrera.jpg", 
            memory="Elsa Cabrera from El Salvador is sharing her beloved pupusas recipe.",
            country="El Salvador",
            desc="Pupusas are a traditional Salvadoran dish made of thick, handmade corn tortillas filled with various ingredients.",
            visibility="family",
            ingredients=[
                {"name": "Corn flour", "quantity": "2 cups", "unit": ""},
                {"name": "Water", "quantity": "1 1/2 cups", "unit": ""},
                {"name": "Refried beans", "quantity": "1 cup", "unit": ""},
                {"name": "Cheese", "quantity": "1 cup", "unit": ""},
                {"name": "Loroco", "quantity": "1/4 cup (optional)", "unit": ""},
                {"name": "Curtido (pickled cabbage slaw)", "quantity": "For serving", "unit": ""}
            ],
            directions=[
                {"step": "Mix corn flour with water to form a pliable dough."},
                {"step": "Take a portion of dough, flatten it, and fill with refried beans, cheese, and loroco."},
                {"step": "Fold the dough over the filling to form a stuffed tortilla."},
                {"step": "Cook the pupusas on a hot griddle until golden brown on both sides."},
                {"step": "Serve hot with curtido on the side."}
            ],
            user_clerk_id="user_2hDLKhW3XuVHeefS4fO1YBVK5B1" , # Associate the recipe with Elsa
            family_id=1  # Associate the recipe with the Cabrera family
        )
        # Alice's Pandekager recipe
        create_recipe(
            title="Pandekager",
            creator_name="Alice Widman",
            creator_nickname="",
            creator_bio="Alice Widman from Denmark is delighted to share her Pandekager recipe. Learn how to make these delicious Danish pancakes, a favorite treat in her family.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092157/AliceWidman.jpg", 
            memory="Ida Widman from Denmark is delighted to share her Pandekager recipe.",
            country="Denmark",
            desc="Pandekager are thin Danish pancakes often served with sweet or savory toppings.",
            visibility="global",
            ingredients=[
                {"name": "Flour", "quantity": "1 cup", "unit": ""},
                {"name": "Milk", "quantity": "1 cup", "unit": ""},
                {"name": "Eggs", "quantity": "2", "unit": ""},
                {"name": "Sugar", "quantity": "2 tbsp", "unit": ""},
                {"name": "Butter (for frying)", "quantity": "As needed", "unit": ""}
            ],
            directions=[
                {"step": "Whisk together flour, milk, eggs, and sugar until smooth."},
                {"step": "Heat a skillet over medium heat and melt a knob of butter."},
                {"step": "Pour a small amount of batter into the skillet, tilting to spread it evenly."},
                {"step": "Cook until the edges start to brown, then flip and cook the other side."},
                {"step": "Repeat with the remaining batter, stacking the pancakes as you go."},
                {"step": "Serve warm with your choice of toppings."}
            ],
            user_clerk_id=1
        )

        # Augusto's Marinara recipe
        create_recipe(
            title="Marinara Sauce",
            creator_name="Augusto",
            creator_nickname="",
            creator_bio="Augusto from Italy brings his cherished marinara recipe. Experience the authentic taste of Italy as Anthony guides you through the process of making this classic sauce.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092325/AugustoRomano.jpg", 
            memory="Anthony from Italy brings his cherished marinara recipe.",
            country="Italy",
            desc="Marinara sauce is a classic Italian tomato sauce made with tomatoes, garlic, onions, and herbs.",
            visibility="global",
            ingredients=[
                {"name": "Tomatoes", "quantity": "2 lbs", "unit": ""},
                {"name": "Garlic", "quantity": "4 cloves", "unit": ""},
                {"name": "Onion", "quantity": "1 medium", "unit": ""},
                {"name": "Olive oil", "quantity": "2 tbsp", "unit": ""},
                {"name": "Basil", "quantity": "1/4 cup", "unit": "chopped"},
                {"name": "Oregano", "quantity": "1 tsp", "unit": ""},
                {"name": "Salt", "quantity": "To taste", "unit": ""},
                {"name": "Pepper", "quantity": "To taste", "unit": ""}
            ],
            directions=[
                {"step": "Heat olive oil in a pan and sauté minced garlic and diced onion until soft."},
                {"step": "Add crushed tomatoes, basil, oregano, salt, and pepper."},
                {"step": "Simmer the sauce for about 20 minutes, stirring occasionally."},
                {"step": "Adjust seasoning to taste and serve over cooked pasta."}
            ],
            user_clerk_id=1
        )


        # Malaysian Family Recipe: Nasi Lemak
        create_recipe(
            title="Nasi Lemak",
            creator_name="Wei Tan",
            creator_nickname="",
            creator_bio="The Tan family from Malaysia shares their beloved Nasi Lemak recipe, a traditional Malaysian coconut rice dish.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717099822/creator3.jpg", 
            memory="The Tan family from Malaysia shares their beloved Nasi Lemak recipe.",
            country="Malaysia",
            desc="Nasi Lemak is a fragrant rice dish cooked in coconut milk and pandan leaves, served with various accompaniments.",
            visibility="global",
            ingredients=[
                {"name": "Jasmine rice", "quantity": 2, "unit": "cups"},
                {"name": "Coconut milk", "quantity": 2, "unit": "cups"},
                {"name": "Pandan leaves", "quantity": 2, "unit": "leaves"},
                {"name": "Salt", "quantity": 1, "unit": "teaspoon"},
                {"name": "Sambal (chili paste)", "quantity": 1, "unit": "cup"},
                {"name": "Hard-boiled eggs", "quantity": 4, "unit": ""},
                {"name": "Fried anchovies", "quantity": 1, "unit": "cup"},
                {"name": "Cucumber slices", "quantity": 1, "unit": "cup"},
                {"name": "Roasted peanuts", "quantity": 1, "unit": "cup"}
            ],
            directions=[
                {"step": "Rinse jasmine rice until the water runs clear, then drain."},
                {"step": "In a pot, combine rice, coconut milk, pandan leaves, and salt. Bring to a boil."},
                {"step": "Once boiling, reduce heat and simmer until rice is cooked and fragrant, about 20 minutes."},
                {"step": "Serve hot with sambal, hard-boiled eggs, fried anchovies, cucumber slices, and roasted peanuts."}
            ],
            user_clerk_id=1,
        )

        # Senegalese Family Recipe: Thieboudienne
        create_recipe(
            title="Thieboudienne",
            creator_name="Ousmane Diop",
            creator_nickname="",
            creator_bio="The Diop family from Senegal shares their cherished Thieboudienne recipe, a traditional Senegalese fish and rice dish.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717120293/creator4.avif", 
            memory="The Diop family from Senegal shares their cherished Thieboudienne recipe.",
            country="Senegal",
            desc="Thieboudienne is a flavorful Senegalese dish featuring fish cooked in a tomato-based sauce with vegetables, served over rice.",
            visibility="global",
            ingredients=[
                {"name": "Fish", "quantity": 2, "unit": ""},
                {"name": "Rice", "quantity": 3, "unit": "cups"},
                {"name": "Tomatoes", "quantity": 4, "unit": ""},
                {"name": "Onion", "quantity": 2, "unit": ""},
                {"name": "Carrots", "quantity": 3, "unit": ""},
                {"name": "Potatoes", "quantity": 4, "unit": ""},
                {"name": "Eggplant", "quantity": 1, "unit": ""},
                {"name": "Cabbage", "quantity": 1, "unit": ""},
                {"name": "Garlic", "quantity": 5, "unit": "cloves"},
                {"name": "Vegetable oil", "quantity": 1, "unit": "cup"},
                {"name": "Salt", "quantity": 2, "unit": "teaspoons"},
                {"name": "Water", "quantity": 6, "unit": "cups"}
            ],
            directions=[
                {"step": "Season fish with salt and set aside."},
                {"step": "In a large pot, heat vegetable oil over medium heat. Add chopped onions and minced garlic, and sauté until softened."},
                {"step": "Add chopped tomatoes, sliced carrots, diced potatoes, diced eggplant, shredded cabbage, and salt. Cook until vegetables are slightly softened."},
                {"step": "Add seasoned fish on top of the vegetable mixture. Pour water over the fish and vegetables, covering them."},
                {"step": "Simmer until fish is cooked through and vegetables are tender. Serve hot over cooked rice."}
            ],
            user_clerk_id=1,
        )

        # Lebanese Family Recipe: Tabbouleh
        create_recipe(
            title="Tabbouleh",
            creator_name="Hilda Khalil",
            creator_nickname="",
            creator_bio="The Khalil family from Lebanon shares their treasured Tabbouleh recipe, a classic Lebanese parsley salad.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717120603/creator5.jpg", 
            memory="The Khalil family from Lebanon shares their treasured Tabbouleh recipe.",
            country="Lebanon",
            desc="Tabbouleh is a refreshing Lebanese salad made with parsley, tomatoes, mint, bulgur, and a tangy lemon dressing.",
            visibility="global",
            ingredients=[
                {"name": "Parsley", "quantity": 4, "unit": "bunches"},
                {"name": "Tomatoes", "quantity": 6, "unit": ""},
                {"name": "Bulgur wheat", "quantity": 1
        , "unit": "cup"},
                {"name": "Fresh mint leaves", "quantity": 1, "unit": "cup"},
                {"name": "Green onions", "quantity": 4, "unit": ""},
                {"name": "Lemon juice", "quantity": 1, "unit": "cup"},
                {"name": "Extra-virgin olive oil", "quantity": 1, "unit": "cup"},
                {"name": "Salt", "quantity": 2, "unit": "teaspoons"},
                {"name": "Black pepper", "quantity": 1, "unit": "teaspoon"}
            ],
            directions=[
                {"step": "Soak bulgur wheat in hot water for about 30 minutes, then drain and squeeze out excess water."},
                {"step": "Finely chop parsley, tomatoes, mint leaves, and green onions."},
                {"step": "In a large bowl, combine chopped parsley, tomatoes, mint, green onions, and soaked bulgur wheat."},
                {"step": "In a separate small bowl, whisk together lemon juice, olive oil, salt, and black pepper to make the dressing."},
                {"step": "Pour the dressing over the salad and toss to combine. Adjust seasoning if needed."},
                {"step": "Chill in the refrigerator for at least 1 hour before serving."},
                {"step": "Serve cold as a refreshing appetizer or side dish."}
            ],
            user_clerk_id=1,

        )

            