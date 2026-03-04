import { getGames, getGame, createGame, updateGame, deleteGame, getAllRentals } from './api.js';

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const message = document.getElementById('message');

// Games Management
const gamesContainer = document.getElementById('gamesContainer');
const addGameBtn = document.getElementById('addGameBtn');
const gameForm = document.getElementById('gameForm');
const formTitle = document.getElementById('formTitle');
let editingGameId = null;

// Rentals Management
const rentalsContainer = document.getElementById('rentalsContainer');

// Tab switching
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');

    if (btn.dataset.tab === 'rentals-tab') {
      loadRentals();
    } else if (btn.dataset.tab === 'games-tab') {
      loadGames();
    }
  });
});

// Load games
const loadGames = async () => {
  try {
    message.textContent = 'Loading games...';
    const games = await getGames();
    renderGames(games);
    message.textContent = '';
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

const renderGames = (games) => {
  if (games.length === 0) {
    gamesContainer.innerHTML = '<p>No games found</p>';
    return;
  }

  gamesContainer.innerHTML = games.map(game => `
    <div class="game-card">
      <h3>${game.title}</h3>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>PEGI:</strong> ${game.pegi}</p>
      <p><strong>Description:</strong> ${game.description || 'N/A'}</p>
      <p><strong>Stock:</strong> ${game.stock_available}/${game.stock_total}</p>
      <div class="button-group">
        <button class="btn btn-secondary" onclick="editGameClick(${game.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteGameClick(${game.id})">Delete</button>
      </div>
    </div>
  `).join('');
};

addGameBtn.addEventListener('click', () => {
  editingGameId = null;
  formTitle.textContent = 'Add New Game';
  gameForm.reset();
  gameForm.style.display = 'block';
});

gameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const gameData = {
    title: document.getElementById('title').value,
    platform: document.getElementById('platform').value,
    genre: document.getElementById('genre').value,
    pegi: document.getElementById('pegi').value,
    description: document.getElementById('description').value,
    stock_total: parseInt(document.getElementById('stock_total').value)
  };

  try {
    if (editingGameId) {
      await updateGame(editingGameId, gameData);
      message.textContent = 'Game updated successfully!';
    } else {
      await createGame(gameData);
      message.textContent = 'Game created successfully!';
    }
    message.className = 'message success';
    gameForm.style.display = 'none';
    loadGames();
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
});

window.editGameClick = async (gameId) => {
  try {
    const game = await getGame(gameId);
    document.getElementById('title').value = game.title;
    document.getElementById('platform').value = game.platform;
    document.getElementById('genre').value = game.genre;
    document.getElementById('pegi').value = game.pegi;
    document.getElementById('description').value = game.description;
    document.getElementById('stock_total').value = game.stock_total;
    
    editingGameId = gameId;
    formTitle.textContent = 'Edit Game';
    gameForm.style.display = 'block';
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

window.deleteGameClick = async (gameId) => {
  if (confirm('Are you sure you want to delete this game?')) {
    try {
      await deleteGame(gameId);
      message.textContent = 'Game deleted successfully!';
      message.className = 'message success';
      loadGames();
    } catch (error) {
      message.textContent = `Error: ${error.message}`;
      message.className = 'message error';
    }
  }
};

// Load rentals
const loadRentals = async () => {
  try {
    message.textContent = 'Loading rentals...';
    const rentals = await getAllRentals();
    renderRentals(rentals);
    message.textContent = '';
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

const renderRentals = (rentals) => {
  if (rentals.length === 0) {
    rentalsContainer.innerHTML = '<p>No rentals found</p>';
    return;
  }

  rentalsContainer.innerHTML = rentals.map(rental => `
    <div class="rental-card ${rental.overdue ? 'overdue' : ''}">
      <h3>${rental.game_title}</h3>
      <p><strong>User:</strong> ${rental.user_email}</p>
      <p><strong>Status:</strong> ${rental.status}</p>
      <p><strong>Rented:</strong> ${new Date(rental.rented_at).toLocaleDateString()}</p>
      <p><strong>Due:</strong> ${new Date(rental.due_at).toLocaleDateString()}</p>
      ${rental.returned_at ? `<p><strong>Returned:</strong> ${new Date(rental.returned_at).toLocaleDateString()}</p>` : ''}
      ${rental.overdue ? '<p class="overdue-text">⚠️ OVERDUE</p>' : ''}
    </div>
  `).join('');
};

// Initial load
loadGames();
