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
