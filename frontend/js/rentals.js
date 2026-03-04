import { getUserRentals, returnRental } from './api.js';

const rentalsContainer = document.getElementById('rentalsContainer');
const message = document.getElementById('message');

const loadRentals = async () => {
  try {
    message.textContent = 'Loading rentals...';
    const rentals = await getUserRentals();
    renderRentals(rentals);
    message.textContent = '';
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

const renderRentals = (rentals) => {
  const active = rentals.filter(r => r.status === 'ACTIVE');
  const returned = rentals.filter(r => r.status === 'RETURNED');

  let html = '<h2>Active Rentals</h2>';
  
  if (active.length === 0) {
    html += '<p>No active rentals</p>';
  } else {
    html += active.map(rental => `
      <div class="rental-card ${rental.overdue ? 'overdue' : ''}">
        <h3>${rental.game_title}</h3>
        <p><strong>Platform:</strong> ${rental.platform}</p>
        <p><strong>Genre:</strong> ${rental.genre}</p>
        <p><strong>Rented:</strong> ${new Date(rental.rented_at).toLocaleDateString()}</p>
        <p><strong>Due:</strong> ${new Date(rental.due_at).toLocaleDateString()}</p>
        ${rental.overdue ? '<p class="overdue-text">⚠️ OVERDUE</p>' : ''}
        <button class="btn btn-danger" onclick="returnRentalClick(${rental.id})">Return</button>
      </div>
    `).join('');
  }

  html += '<h2>Rental History</h2>';
  
  if (returned.length === 0) {
    html += '<p>No returned rentals</p>';
  } else {
    html += returned.map(rental => `
      <div class="rental-card">
        <h3>${rental.game_title}</h3>
        <p><strong>Platform:</strong> ${rental.platform}</p>
        <p><strong>Genre:</strong> ${rental.genre}</p>
        <p><strong>Rented:</strong> ${new Date(rental.rented_at).toLocaleDateString()}</p>
        <p><strong>Due:</strong> ${new Date(rental.due_at).toLocaleDateString()}</p>
        <p><strong>Returned:</strong> ${new Date(rental.returned_at).toLocaleDateString()}</p>
      </div>
    `).join('');
  }

  rentalsContainer.innerHTML = html;
};

window.returnRentalClick = async (rentalId) => {
  try {
    await returnRental(rentalId);
    message.textContent = 'Game returned successfully!';
    message.className = 'message success';
    loadRentals();
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
    message.className = 'message error';
  }
};

loadRentals();
