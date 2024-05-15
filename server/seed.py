from models import *
from services import *
from faker import Faker
fake = Faker()

def drop_tables():
    db.drop_all()

def create_tables():
    db.create_all()

def add_fake_recipes(num_events=5):
    for _ in range(num_events):
        title = fake.country()
        new_recipe = Recipe(title=title)
        db.session.add(new_recipe)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        drop_tables()
        create_tables()
        add_fake_recipes()
   

