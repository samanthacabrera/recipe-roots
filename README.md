### Recipe Roots 

Recipe Roots is an online platform designed for sharing family recipes, aiming to share authentic, culturally accurate dishes to a global audience.

### Installation 

To install Recipe Roots onto your local machine, follow these steps:

#### backend setup

```bash
git clone https://github.com/samanthacabrera/recipe-roots.git
cd recipe-roots
pipenv install
pipenv shell
```

#### database setup

```bash
flask db init
flask db migrate
flask db upgrade
flask run
```

#### frontend setup 

```bash
cd ..
cd frontend
npm install
cd vite
npm run dev
```

Before accessing the application, make sure that both the backend and frontend servers are running. Once both servers are running, open your web browser and navigate to http://localhost:3000. The backend server runs at http://localhost:5000.

### Walkthrough
