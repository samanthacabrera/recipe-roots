### Recipe Roots - [watch demo](https://www.youtube.com/watch?v=Qso3oxAXWDc&t=29s)

To install Recipe Roots onto your local machine, follow these steps:

## Backend Setup

**Clone the Repository**

```bash
git clone https://github.com/yourusername/reciperoots.git
cd reciperoots
```

**Create Virtual Environment & Install Dependencies**

```bash
pipenv install
pipenv shell
```

**Set Up Database & Run Server**

```bash
flask db init
flask db migrate
flask db upgrade
flask run
```

## Frontend Setup

**Navigate to the Frontend Directory**

```bash
cd ..
cd frontend
```

**Install Dependencies & Run Server**

```bash
npm install
cd vite
npm run dev
```

### Accessing the Application

Before accessing the application, make sure that both the backend and frontend servers are running. Once both servers are running, open your web browser and navigate to http://localhost:3000. This URL will load the Recipe Roots platform where you can interact with the application. By default the backend server runs at http://localhost:5000.
