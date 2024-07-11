from services import *

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    clerk_id = db.Column(db.String, unique=True, nullable=False)  # Store clerk's string ID
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    serialize_rules = ('-')

    authored_recipes = db.relationship('Recipe', back_populates='author', lazy=True)
    favorited_recipes = db.relationship('Favorite', back_populates='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'clerk_id': self.clerk_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_clerk_id = db.Column(db.String, db.ForeignKey('users.clerk_id')) 
    title = db.Column(db.String, nullable=False)
    creator_name = db.Column(db.String)  
    creator_nickname = db.Column(db.String)
    creator_bio = db.Column(db.Text)
    creator_photo_public_id = db.Column(db.String)
    memory = db.Column(db.Text)  
    country = db.Column(db.String)
    desc = db.Column(db.String)

    ingredients = db.relationship('Ingredient', backref='recipe', lazy=True)
    directions = db.relationship('Direction', backref='recipe', lazy=True)
    favorited_by = db.relationship('Favorite', back_populates='recipe', cascade='all, delete', lazy=True)

    author = db.relationship('User', back_populates='authored_recipes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_clerk_id': self.user_clerk_id,
            'title': self.title,
            'creator_name': self.creator_name,
            'creator_nickname': self.creator_nickname,
            'creator_bio': self.creator_bio,
            'creator_photo_public_id': self.creator_photo_public_id,
            'memory': self.memory,
            'country': self.country,
            'desc': self.desc,
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'directions': [direction.to_dict() for direction in self.directions]
        }


class Ingredient(db.Model, SerializerMixin):

    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    name = db.Column(db.String)
    quantity = db.Column(db.Integer)
    unit = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit
        }


class Direction(db.Model, SerializerMixin):

    __tablename__ = 'directions'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    order = db.Column(db.Integer)
    step = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'step': self.step
        }


class Favorite(db.Model, SerializerMixin):

    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_clerk_id = db.Column(db.String, db.ForeignKey('users.clerk_id')) 
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='favorited_recipes', overlaps="user_favorite")
    recipe = db.relationship('Recipe', back_populates='favorited_by', overlaps="favorited_recipe")

    def to_dict(self):
        return {
            'id': self.id,
            'user_clerk_id': self.user_clerk_id,
            'recipe_id': self.recipe_id
        }
