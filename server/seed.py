from models import *
from services import *

def create_recipe(title, creator_name, creator_nickname, creator_bio, creator_photo_public_id, memory, country, desc, ingredients, directions, user_clerk_id):
    recipe = Recipe(
        title=title,
        creator_name=creator_name,
        creator_nickname=creator_nickname,
        creator_bio=creator_bio,
        creator_photo_public_id=creator_photo_public_id,
        memory=memory,
        country=country,
        desc=desc,
        user_clerk_id=user_clerk_id,
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
            user_clerk_id="1" , 

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
        # Taiwanese Family Recipe: Beef Noodle Soup
        create_recipe(
            title="Beef Noodle Soup",
            creator_name="Pei-Ying Lin",
            creator_nickname="",
            creator_bio="The Lin family from Taiwan shares their famous Beef Noodle Soup recipe, a beloved Taiwanese comfort food.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717129636/creator7.jpg", 
            memory="The Chen family from Taiwan shares their famous Beef Noodle Soup recipe.",
            country="Taiwan",
            desc="Beef Noodle Soup is a hearty Taiwanese soup made with braised beef, noodles, and a rich broth flavored with aromatic spices.",
            ingredients=[
                {"name": "Beef shank", "quantity": 1, "unit": "lb"},
                {"name": "Beef broth", "quantity": 4, "unit": "cups"},
                {"name": "Soy sauce", "quantity": 1/4, "unit": "cup"},
                {"name": "Dark soy sauce", "quantity": 2, "unit": "tbsp"},
                {"name": "Star anise", "quantity": 3, "unit": ""},
                {"name": "Cinnamon stick", "quantity": 1, "unit": ""},
                {"name": "Ginger", "quantity": 1, "unit": "inch piece"},
                {"name": "Garlic", "quantity": 3, "unit": "cloves"},
                {"name": "Scallions", "quantity": 4, "unit": ""},
                {"name": "Dried noodles", "quantity": 8, "unit": "oz"},
                {"name": "Bok choy", "quantity": 2, "unit": ""},
                {"name": "Chopped cilantro", "quantity": 1/4, "unit": "cup"},
                {"name": "Chili oil", "quantity": 2, "unit": "tbsp"}
            ],
            directions=[
                {"step": "In a large pot, heat some oil and sear the beef shank until browned on all sides."},
                {"step": "Add beef broth, soy sauce, dark soy sauce, star anise, cinnamon stick, ginger, garlic, and scallions to the pot."},
                {"step": "Simmer covered for 2-3 hours until beef is tender, then remove beef and shred it."},
                {"step": "Cook noodles according to package instructions, then divide among bowls and top with shredded beef."},
                {"step": "Add bok choy to the broth and cook until tender, then ladle broth over noodles and beef."},
                {"step": "Garnish with chopped cilantro and drizzle with chili oil before serving."}
            ],
            user_clerk_id=1,
        )

        # Mexican Family Recipe: Tacos al Pastor
        create_recipe(
            title="Tacos al Pastor",
            creator_name="Mario Hernandez",
            creator_nickname="",
            creator_bio="The Hernandez family from Mexico shares their authentic Tacos al Pastor recipe, a classic Mexican street food favorite.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717129480/creator1.jpg", 
            memory="The Hernandez family from Mexico shares their authentic Tacos al Pastor recipe.",
            country="Mexico",
            desc="Tacos al Pastor are delicious Mexican tacos made with marinated pork, pineapple, onions, and cilantro, served on corn tortillas.",
            ingredients=[
                {"name": "Pork shoulder", "quantity": 2, "unit": "lbs"},
                {"name": "Corn tortillas", "quantity": 16, "unit": ""},
                {"name": "Pineapple", "quantity": 1, "unit": ""},
                {"name": "Onion", "quantity": 1, "unit": ""},
                {"name": "Cilantro", "quantity": 1/2, "unit": "bunch"},
                {"name": "Garlic", "quantity": 4, "unit": "cloves"},
                {"name": "Achiote paste", "quantity": 2, "unit": "tbsp"},
                {"name": "White vinegar", "quantity": 1/4, "unit": "cup"},
                {"name": "Orange juice", "quantity": 1/2, "unit": "cup"},
                {"name": "Cumin", "quantity": 1, "unit": "tsp"},
                {"name": "Oregano", "quantity": 1, "unit": "tsp"},
                {"name": "Salt", "quantity": 1, "unit": "tsp"}
            ],
            directions=[
                {"step": "Blend achiote paste, white vinegar, orange juice, cumin, oregano, salt, garlic, and a splash of water to make marinade."},
                {"step": "Slice pork shoulder thinly and marinate in the mixture for at least 2 hours or overnight."},
                {"step": "Grill marinated pork until cooked through and slightly charred, then chop into smaller pieces."},
                {"step": "Chop pineapple and onion into small pieces, and chop cilantro."},
                {"step": "Warm corn tortillas, then fill each with grilled pork, pineapple, onion, and cilantro."},
                {"step": "Serve hot with lime wedges and your favorite salsa."}
            ],
            user_clerk_id=1,
        )

        # Hungarian Family Recipe: Goulash
        create_recipe(
            title="Goulash",
            creator_name="Andras Kovacs",
            creator_nickname="",
            creator_bio="The Kovacs family from Hungary shares their traditional Goulash recipe, a hearty Hungarian stew.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717128591/creator6.jpg", 
            memory="The Kovacs family from Hungary shares their traditional Goulash recipe.",
            country="Hungary",
            desc="Goulash is a hearty Hungarian stew made with beef, onions, paprika, tomatoes, and potatoes, seasoned with Hungarian spices.",
            ingredients=[
                {"name": "Beef stew meat", "quantity": 2, "unit": "lbs"},
                {"name": "Onion", "quantity": 2, "unit": ""},
                {"name": "Potatoes", "quantity": 4, "unit": ""},
                {"name": "Tomatoes", "quantity": 3, "unit": ""},
                {"name": "Garlic", "quantity": 3, "unit": "cloves"},
                {"name": "Beef broth", "quantity": 4, "unit": "cups"},
                {"name": "Paprika", "quantity": 2, "unit": "tbsp"},
                {"name": "Caraway seeds", "quantity": 1, "unit": "tbsp"},
                {"name": "Bay leaves", "quantity": 2, "unit": ""},
                {"name": "Salt", "quantity": 2, "unit": "tsp"},
                {"name": "Black pepper", "quantity": 1, "unit": "tsp"},
                {"name": "Vegetable oil", "quantity": 2, "unit": "tbsp"}
            ],
            directions=[
                {"step": "Heat vegetable oil in a large pot over medium heat."},
                {"step": "Add diced onions and minced garlic, and sauté until softened."},
                {"step": "Add beef stew meat to the pot and brown on all sides."},
                {"step": "Stir in paprika, caraway seeds, salt, and black pepper."},
                {"step": "Add diced tomatoes, beef broth, and bay leaves to the pot."},
                {"step": "Bring to a boil, then reduce heat and simmer covered for about 1.5-2 hours until beef is tender."},
                {"step": "Add diced potatoes to the pot and continue to simmer until potatoes are cooked through."},
                {"step": "Adjust seasoning if needed, then serve hot, garnished with chopped parsley if desired."}
            ],
            user_clerk_id=1,
        )

        # Slovenian Family Recipe: Potica
        create_recipe(
            title="Potica",
            creator_name="Maja Novak",
            creator_nickname="",
            creator_bio="The Novak family from Slovenia shares their traditional Potica recipe, a sweet Slovenian nut roll.",
            creator_photo_public_id="https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717100035/creator2.jpg", 
            memory="The Novak family from Slovenia shares their traditional Potica recipe.",
            country="Slovenia",
            desc="Potica is a traditional Slovenian dessert made with sweet yeast dough rolled with a filling of ground nuts, honey, and spices.",
            ingredients=[
                {"name": "All-purpose flour", "quantity": 4, "unit": "cups"},
                {"name": "Active dry yeast", "quantity": 1, "unit": "packet"},
                {"name": "Milk", "quantity": 1, "unit": "cup"},
                {"name": "Butter", "quantity": 1/2, "unit": "cup"},
                {"name": "Granulated sugar", "quantity": 1/2, "unit": "cup"},
                {"name": "Salt", "quantity": 1/2, "unit": "tsp"},
                {"name": "Eggs", "quantity": 2, "unit": ""},
                {"name": "Ground walnuts", "quantity": 2, "unit": "cups"},
                {"name": "Honey", "quantity": 1, "unit": "cup"},
                {"name": "Cinnamon", "quantity": 1, "unit": "tsp"},
                {"name": "Vanilla extract", "quantity": 1, "unit": "tsp"},
                {"name": "Rum", "quantity": 2, "unit": "tbsp"}
            ],
            directions=[
                {"step": "In a small bowl, dissolve yeast in warm milk with a pinch of sugar and let it sit until foamy."},
                {"step": "In a large bowl, combine flour, sugar, and salt. Cut in butter until mixture resembles coarse crumbs."},
                {"step": "Add yeast mixture and beaten eggs to the flour mixture, and knead until a smooth dough forms."},
                {"step": "Cover dough and let it rise in a warm place until doubled in size, about 1 hour."},
                {"step": "In the meantime, prepare the filling by mixing ground walnuts, honey, cinnamon, vanilla extract, and rum."},
                {"step": "Roll out the dough into a rectangle, spread the filling evenly over the dough, then roll it up tightly."},
                {"step": "Place rolled dough into a greased loaf pan, cover, and let it rise again for about 30 minutes."},
                {"step": "Bake in a preheated oven at 350°F (175°C) for 45-50 minutes until golden brown and cooked through."},
                {"step": "Let it cool before slicing and serving. Enjoy your delicious Potica!"}
            ],
            user_clerk_id=1,
        )
        print("recipes seeded")




                            