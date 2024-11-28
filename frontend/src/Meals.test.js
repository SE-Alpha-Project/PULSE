import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Meals from './Meals';
import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

// Mock the axios calls
jest.mock('axios');

// Mock Meals data
const mockMeals = [
  {
    meal_name: 'Salad',
    ingredients: ['Lettuce', 'Tomato'],
    total_calories: 150
  },
  {
    meal_name: 'Soup',
    ingredients: ['Carrot', 'Onion'],
    total_calories: 120
  }
];

const mockFoodItems = {
  'Apple': 95,
  'Banana': 105,
  'Carrot': 41
};

// Test to check if UI elements are rendered correctly
test('renders My Meals header', () => {
  render(<Meals state={{ token: 'mock-token' }} />);
  const heading = screen.getByText(/my meals/i);
  expect(heading).toBeInTheDocument();
});

test('renders Custom Food, Create Meal, and My Meals cards', () => {
  render(<Meals state={{ token: 'mock-token' }} />);
  expect(screen.getByText(/Custom Food/i)).toBeInTheDocument();
  expect(screen.getByText(/Create Meal/i)).toBeInTheDocument();
  expect(screen.getByText(/My Meals/i)).toBeInTheDocument();
});

// Test input handling for custom food creation form
test('food name input works correctly', () => {
  render(<Meals state={{ token: 'mock-token' }} />);
  const foodNameInput = screen.getByLabelText(/Food Item Name/i);
  fireEvent.change(foodNameInput, { target: { value: 'Pizza' } });
  expect(foodNameInput.value).toBe('Pizza');
});

test('calories input works correctly', () => {
  render(<Meals state={{ token: 'mock-token' }} />);
  const caloriesInput = screen.getByLabelText(/Calories/i);
  fireEvent.change(caloriesInput, { target: { value: '300' } });
  expect(caloriesInput.value).toBe('300');
});

// Test API call for creating custom food
test('handleCreateCustomFood sends POST request', async () => {
  const mock = new axiosMockAdapter(axios);
  mock.onPost('/createFood').reply(200, { success: true });

  render(<Meals state={{ token: 'mock-token' }} />);
  fireEvent.change(screen.getByLabelText(/Food Item Name/i), { target: { value: 'Apple' } });
  fireEvent.change(screen.getByLabelText(/Calories/i), { target: { value: '95' } });

  fireEvent.click(screen.getByText(/Create Food/i));

  await waitFor(() => expect(mock.history.post.length).toBe(1));
  expect(mock.history.post[0].url).toBe('/createFood');
});

// Test ingredient selection
test('ingredient selection works', () => {
  render(<Meals state={{ token: 'mock-token' }} />);
  const input = screen.getByLabelText(/Ingredient Name/i);
  fireEvent.change(input, { target: { value: 'Tomato' } });
  expect(input.value).toBe('Tomato');
});

// Test API call for creating a meal
test('handleCreateMeal sends POST request', async () => {
  const mock = new axiosMockAdapter(axios);
  mock.onPost('/createMeal').reply(200, { success: true });

  render(<Meals state={{ token: 'mock-token' }} />);
  fireEvent.change(screen.getByLabelText(/Meal Name/i), { target: { value: 'Salad' } });
  fireEvent.change(screen.getByLabelText(/Ingredient Name/i), { target: { value: 'Lettuce' } });

  fireEvent.click(screen.getByText(/Create Meal/i));

  await waitFor(() => expect(mock.history.post.length).toBe(1));
  expect(mock.history.post[0].url).toBe('/createMeal');
});

// Test rendering meals and ingredients
test('displays custom meals and ingredients', () => {
  render(<Meals state={{ token: 'mock-token' }} />);

  mockMeals.forEach((meal) => {
    expect(screen.getByText(meal.meal_name)).toBeInTheDocument();
    meal.ingredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    expect(screen.getByText(meal.total_calories)).toBeInTheDocument();
  });
});

// Test food items filtering by search text
test('filters food items based on search text', () => {
  render(<Meals state={{ token: 'mock-token' }} />);

  // Mock the food items
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => mockFoodItems
  });

  fireEvent.change(screen.getByPlaceholderText(/Type to search.../), { target: { value: 'Apple' } });
  
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.queryByText('Banana')).not.toBeInTheDocument();
});

// Test error handling in API call for food creation
test('displays error when API call fails for food creation', async () => {
  const mock = new axiosMockAdapter(axios);
  mock.onPost('/createFood').reply(500);

  render(<Meals state={{ token: 'mock-token' }} />);
  
  fireEvent.change(screen.getByLabelText(/Food Item Name/i), { target: { value: 'Pizza' } });
  fireEvent.change(screen.getByLabelText(/Calories/i), { target: { value: '300' } });
  
  fireEvent.click(screen.getByText(/Create Food/i));

  await waitFor(() => expect(mock.history.post.length).toBe(1));
  expect(screen.getByText(/error/i)).toBeInTheDocument();  // Assuming error message appears
});
