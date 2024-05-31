# Recipe Roots

Recipe Roots is an online platform designed for sharing family recipes, with the goal of preserving and sharing authentic, culturally accurate dishes with a global audience. Users can browse family recipes from around the world and save their favorite recipes to a personal favorites list.

## Table of Contents
- [Mission](#mission)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)


## Mission

We believe that preserving family recipes is crucial to staying connected to our roots. Each recipe on our platform is a piece of history, a testament to the resilience, creativity, and love of those who came before us. By sharing these recipes, we honor our ancestors and keep their spirits alive in our kitchens.

## Features

- **Browse Recipes**: Discover family recipes from various cultures around the world.
- **Save to Favorites**: Users can save their favorite recipes for quick access.
- **Add Recipes**: Share your own family recipes with the community.
- **Featured Country Recipes**: Explore recipes from a randomly featured country.
- **Random Recipe Generator**: Get inspired by a randomly selected global recipe.

## Project Structure

reciperoots/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   ├── services/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── public/
│   └── ...
│
├── migrations/
├── venv/
├── requirements.txt
└── package.json


## Technologies

Recipe Roots is built using the following technologies:

- **Frontend**: 
  - React
  - Tailwind CSS
- **Backend**:
  - Flask
  - SQLAlchemy

## Installation

### Prerequisites

Ensure you have the following installed:

- Python 3.8+
- Node.js
- npm

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/reciperoots.git
   cd reciperoots
   ```

2. Create a virtual environment:
   ```bash
   pipenv install 
   ```

3. Install backend dependencies:
   ```bash
   pipenv shell 
   ```

4. Set up the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. Run the backend server:
   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your web browser and navigate to `http://localhost:3000` to access the Recipe Roots platform.
3. Browse recipes, add your own, and save your favorites!

## API Endpoints

### Users

- `GET /api/users`: Retrieve a list of all users.
- `GET /api/users/<id>`: Retrieve a specific user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/<id>`: Update a user by ID.
- `DELETE /api/users/<id>`: Delete a user by ID.

### Families

- `GET /api/families`: Retrieve a list of all families.
- `GET /api/families/<id>`: Retrieve a specific family by ID.
- `POST /api/families`: Create a new family.
- `PUT /api/families/<id>`: Update a family by ID.
- `DELETE /api/families/<id>`: Delete a family by ID.

### Recipes

- `GET /api/recipes`: Retrieve a list of all recipes.
- `GET /api/recipes/<id>`: Retrieve a specific recipe by ID.
- `POST /api/recipes`: Create a new recipe.
- `PUT /api/recipes/<id>`: Update a recipe by ID.
- `DELETE /api/recipes/<id>`: Delete a recipe by ID.

### Ingredients

- `GET /api/ingredients`: Retrieve a list of all ingredients.
- `GET /api/ingredients/<id>`: Retrieve a specific ingredient by ID.
- `POST /api/ingredients`: Create a new ingredient.
- `PUT /api/ingredients/<id>`: Update an ingredient by ID.
- `DELETE /api/ingredients/<id>`: Delete an ingredient by ID.

### Directions

- `GET /api/directions`: Retrieve a list of all directions.
- `GET /api/directions/<id>`: Retrieve a specific direction by ID.
- `POST /api/directions`: Create a new direction.
- `PUT /api/directions/<id>`: Update a direction by ID.
- `DELETE /api/directions/<id>`: Delete a direction by ID.

### Favorites

- `GET /api/favorites`: Retrieve a list of all favorites.
- `GET /api/favorites/<id>`: Retrieve a specific favorite by ID.
- `POST /api/favorites`: Create a new favorite.
- `DELETE /api/favorites/<id>`: Delete a favorite by ID.

## Screenshots

### Home Page
### Recipe Page

## License

Recipe Roots is open source and released under the [MIT License](LICENSE).
