
 # Getting started
 
Follow these steps to set up and run the application on your local machine.

### Prerequisites
Before you begin, make sure you have the following installed:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows)
 
 Step 1: 
  Git Clone the Repository 
  
    git clone https://github.com/chaitraleedatar/PULSE.git

Step 2:
   Ensure mongodb is running and execute the below to populate the tables:
   Navigate to the backend folder.

    cd backend

  Once in the backend, go to the `db` folder run:
  
    python insert_event_data.py
    python insert_food_data.py

 Step 3:
   Remain in the backend folder and run the following command to start the server:
    
    pip install -r requirements.txt
    flask run

 Step 4:
   Navigate to the frontend folder and run the below to start the React app:
    
    cd frontend
    npm install 
    npm start
    
 Step 5:
    Open the URL in your browser:  
      http://127.0.0.1:3000
      
 Step 6:
   Compose and run the docker image:
   
    docker-compose up --build  

#### Note
- Additionally, to utilize the chatbot, you need to have [Ollama](https://ollama.com/library/llama3.2) (with llama 3.2 Model) running locally on your machine. 
- To generate the fitness plan, fetch an API token from Mistral AI
- To fetch the news on resources page, fetch an API token from Newsapi
