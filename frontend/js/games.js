import { getGames, rentGame } from './api.js';

const gamesContainer = document.getElementById('gamesContainer');
const titleFilter = document.getElementById('titleFilter');
const platformFilter = document.getElementById('platformFilter');
const genreFilter = document.getElementById('genreFilter');
const availableFilter = document.getElementById('availableFilter');
const filterBtn = document.getElementById('filterBtn');
const message = document.getElementById('message');

let allGames = [];

const loadGames = async (filters = {}) => {
  try {
    message.textContent = 'Loading games...';
    allGames = await getGames(filters);
    renderGames(allGames);
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
      <p><strong>Description:</strong> ${game.description || 'No description'}</p>
      <p><strong>Available:</strong> ${game.stock_available}/${game.stock_total}</p>
      ${game.stock_available > 0 
        ? `<button class="btn btn-primary" onclick="rentGameClick(${game.id})">Rent</button>`
        : '<p class="out-of-stock">Out of Stock</p>'
      }
    </div>
  `).join('');
};

window.rentGameClick = async (gameId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    await rentGame(gameId);
    message.textContent = 'Game rented successfully!';
    message.className = 'message success';
    loadGames();
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

filterBtn.addEventListener('click', () => {
  const filters = {};
  if (titleFilter.value) filters.title = titleFilter.value;
  if (platformFilter.value) filters.platform = platformFilter.value;
  if (genreFilter.value) filters.genre = genreFilter.value;
  if (availableFilter.checked) filters.available = 'true';
  
  loadGames(filters);
});

loadGames();
