from services import *

class User():
   pass

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }

