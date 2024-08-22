# Recipe Roots - Getting Started

To install Recipe Roots onto your local machine, follow these steps:

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/reciperoots.git
   cd reciperoots
   ```

2. **Create Virtual Environment**

   ```bash
   pipenv install
   ```

3. **Install backend dependencies**

   ```bash
   pipenv shell
   ```

4. **Set up the database**

   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. **Run the backend server**
   ```bash
   flask run
   ```
   By default, the backend server will run on http://localhost:5000.

### Frontend Setup

6. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

7. **Install frontend dependencies**

   ```bash
   npm install
   ```

8. **Run the frontend development server**
   ```bash
   cd vite && npm run dev
   ```
   The frontend application will be available at http://localhost:3000.
   <br>

## Accessing the Application

Before accessing the application, make sure that both the backend and frontend servers are running. Once both servers are running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000). This URL will load the Recipe Roots platform where you can interact with the application.  
<br>
For developers or advanced users who wish to interact directly with the API, you can use tools like Postman or Hoppscotch to make API requests. Here’s a list of the available endpoints:

- **Users**: Manage user accounts.

  - **GET** `/api/users`: List all users.
  - **GET** `/api/users/<id>`: Retrieve a user by ID.
  - **POST** `/api/users`: Create a new user.
  - **PUT** `/api/users/<id>`: Update a user by ID.
  - **DELETE** `/api/users/<id>`: Delete a user by ID.

- **Recipes**: Manage recipes.

  - **GET** `/api/recipes`: List all recipes.
  - **GET** `/api/recipes/<id>`: Retrieve a recipe by ID.
  - **POST** `/api/recipes`: Create a new recipe.
  - **PUT** `/api/recipes/<id>`: Update a recipe by ID.
  - **DELETE** `/api/recipes/<id>`: Delete a recipe by ID.

- **Ingredients**: Manage ingredients.

  - **GET** `/api/ingredients`: List all ingredients.
  - **GET** `/api/ingredients/<id>`: Retrieve an ingredient by ID.
  - **POST** `/api/ingredients`: Create a new ingredient.
  - **PUT** `/api/ingredients/<id>`: Update an ingredient by ID.
  - **DELETE** `/api/ingredients/<id>`: Delete an ingredient by ID.

- **Directions**: Manage directions.

  - **GET** `/api/directions`: List all directions.
  - **GET** `/api/directions/<id>`: Retrieve a direction by ID.
  - **POST** `/api/directions`: Create a new direction.
  - **PUT** `/api/directions/<id>`: Update a direction by ID.
  - **DELETE** `/api/directions/<id>`: Delete a direction by ID.

- **Favorites**: Manage user favorites.
  - **GET** `/api/favorites`: List all favorites.
  - **GET** `/api/favorites/<id>`: Retrieve a favorite by ID.
  - **POST** `/api/favorites`: Create a new favorite.
  - **DELETE** `/api/favorites/<id>`: Delete a favorite by ID.

## License

Recipe Roots is open source and released under the [MIT License](LICENSE).
