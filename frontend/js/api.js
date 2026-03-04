// API configuration
// For local development:
const API_BASE = 'http://localhost:3000/api';

// For university server (uncomment and modify):
// const API_BASE = 'http://pascal.fis.agh.edu.pl:5207/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Auth APIs
export const register = (email, password) =>
  apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

export const login = (email, password) =>
  apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

// Games APIs
export const getGames = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.title) params.append('title', filters.title);
  if (filters.platform) params.append('platform', filters.platform);
  if (filters.genre) params.append('genre', filters.genre);
  if (filters.available) params.append('available', filters.available);
  
  return apiCall(`/games?${params.toString()}`);
};

export const getGame = (id) =>
  apiCall(`/games/${id}`);

export const createGame = (gameData) =>
  apiCall('/games', {
    method: 'POST',
    body: JSON.stringify(gameData)
  });

export const updateGame = (id, gameData) =>
  apiCall(`/games/${id}`, {
    method: 'PUT',
    body: JSON.stringify(gameData)
  });

export const deleteGame = (id) =>
  apiCall(`/games/${id}`, {
    method: 'DELETE'
  });

// Rentals APIs
export const rentGame = (gameId) =>
  apiCall('/rentals', {
    method: 'POST',
    body: JSON.stringify({ gameId })
  });

export const returnRental = (rentalId) =>
  apiCall(`/rentals/${rentalId}/return`, {
    method: 'POST'
  });

export const getUserRentals = () =>
  apiCall('/rentals/me');

export const getAllRentals = () =>
  apiCall('/rentals');
