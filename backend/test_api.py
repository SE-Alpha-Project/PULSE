import unittest
from base import api, setup_mongo_client
from unittest.mock import patch, Mock 
from flask import json

class APITestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = api
        self.app.config['TESTING'] = True
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.request_context = self.app.test_request_context()
        self.request_context.push()
        setup_mongo_client(self.app)  # Set up the mongo client after changing the TESTING flag
        self.client = self.app.test_client()
        print("Using MongoDB client:", type(self.app.mongo_client)) 


    def tearDown(self):
                # Pop the contexts after tests
            self.request_context.pop()
            self.app_context.pop()
    
    
    def test_get_events(self):
        # Create a mock collection
        db = self.app.mongo_client['test']
        collection = db['events']

        # Replace the collection's find method with a Mock object
        mock_find = Mock()
        collection.find = mock_find
        mock_find.return_value = [
            {"_id": "Event 1"},
            {"_id": "Event 2"},
        ]

        response = self.client.get('/events')
        self.assertEqual(response.status_code, 200)


    @patch("pymongo.collection.Collection.update_one")
    def test_register_success(self, mock_update_one):
        app_client = api.test_client()  # Create a test client for this test case

        # Mock the update_one method to simulate a successful registration
        mock_update_one.return_value = Mock(upserted_id=123)

        test_data = {
            'email': 'test_user',
            'password': 'test_password',
            'firstName': 'Test',
            'lastName': 'User'
        }

        response = app_client.post('/register', json=test_data)

        self.assertEqual(response.status_code, 200)

        response_data = response.get_json()
        self.assertEqual(response_data['msg'], "register successful")

    def test_unauthorized_get_user_registered_events(self):
        # Mock the database query result
        app_client = api.test_client()

        db = app_client.application.mongo_client['test']  # Access the app's Mongo client
        collection = db['user']
        mock_find = Mock()

        collection.find = mock_find
        mock_find.return_value = [
            {"eventTitle": "Yoga"},
            {"eventTitle": "Swimming"}
        ]

        with patch("flask_jwt_extended.get_jwt_identity", return_value="test_user"):
            response = app_client.get('/usersEvents')

        self.assertEqual(response.status_code, 401)


    @patch('base.request')
    @patch('base.jwt_required')
    @patch('base.mongo')
    def test_unauthorized_enrolled_true(self, mock_mongo, mock_jwt_required, mock_request):
        app_client = api.test_client()
        # Mock request.json() method to return test data
        mock_request.json.return_value = {'eventTitle': 'Event Name'}
        
        # Mock get_jwt_identity() to return a test user identity
        mock_jwt_required.return_value = lambda f: f

        # Mock the find_one method to return an enrollment
        mock_mongo.user.find_one.return_value = {'email': 'test@example.com', 'eventTitle': 'Event Name'}

        response = app_client.post('/is-enrolled')
        data = json.loads(response.get_data(as_text=True))

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_my_profile_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/profile')

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_usersEvents_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/usersEvents')

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_foodCalorieMapping_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/foodCalorieMapping')

        self.assertEqual(response.status_code, 401)


    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_weekHistory_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/weekHistory')

        self.assertEqual(response.status_code, 405)  

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_caloriesBurned_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/caloriesBurned')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_goalsUpdate_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/goalsUpdate')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_profileUpdate_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/profileUpdate')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_caloriesConsumed_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/caloriesConsumed')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_createFood_success(self, mock_mongo, mock_update_one):
        app_client = api.test_client()

        mock_update_one.return_value = Mock(upserted_id=123)

        test_data = {
            'foodName': 'test_food',
            'calories': 'test_value'
        }

        response = app_client .post('/createFood', json=test_data)

        self.assertEqual(response.status_code, 200)
        
        response_data = response.get_json()
        self.assertEqual(response_data['status'], "Data saved successfully")

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_createMeal_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        test_data = {
            'mealName': 'test_meal',
            'ingredients': ['test_ingredient_1', 'test_ingredient_2']
        }

        response = app_client .post('/createMeal', json=test_data)

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_unenroll_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        test_data = {
            'eventTitle': 'test_title'
        }

        response = app_client .post('/unenroll', json=test_data)

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_myMeals_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        response = app_client .get('/myMeals')

        self.assertEqual(response.status_code, 401)
        
    @patch('base.requests.get')
    @patch('os.getenv')
    def test_get_top_resources_success(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()

        mock_getenv.return_value = 'fake_api_value'

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
        'articles': [
            {'title': 'Fitness Trends 2024'},
            {'title': 'Nutrition Tips'},
            {'title': '[Removed] Controversial Article'}
        ]
        }
        mock_requests_get.return_value = mock_response
    
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)

    @patch('base.requests.get')
    @patch('os.getenv')
    def test_get_top_resources_exception_api_error(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()

        mock_getenv.return_value = 'fake_api_value'

        mock_response = Mock()
        mock_response.status_code = 400
        mock_response.text = 'Bad Request'
        mock_requests_get.return_value = mock_response
    
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Error fetching news'})

    @patch('base.requests.get') 
    @patch('os.getenv')
    def test_get_top_resources_exception(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()
        mock_getenv.return_value = 'fake_api_key'
    
        mock_requests_get.side_effect = Exception("Network error")
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, [])



if __name__ == "__main__":
    unittest.main()
