INSERT INTO users (email, password_hash, role) VALUES
('admin@game.com', '$2a$10$pRH7VIWbVHxkd0LHAkK9..N8DMS4cqKapRHvVvgMarkLJPZH2KJIK', 'ADMIN'),
('user@game.com', '$2a$10$pRH7VIWbVHxkd0LHAkK9..N8DMS4cqKapRHvVvgMarkLJPZH2KJIK', 'USER');

INSERT INTO games (title, platform, genre, pegi, description, stock_total, stock_available) VALUES
('Elden Ring', 'PS5', 'Action RPG', '16', 'An action role-playing game set in a breathtaking world full of hidden secrets and dangers.', 5, 4),
('The Legend of Zelda: Tears of the Kingdom', 'Nintendo Switch', 'Adventure', '7', 'The sequel to Breath of the Wild with new exploration and puzzle elements.', 8, 7),
('Baldurs Gate 3', 'PC', 'RPG', '16', 'A turn-based RPG with immersive storytelling and complex character relationships.', 3, 3),
('Final Fantasy XVI', 'PS5', 'Action RPG', '16', 'An action-packed fantasy adventure with stunning graphics and engaging combat.', 6, 5),
('Starfield', 'Xbox Series X', 'Action RPG', '18', 'Explore the cosmos in this space exploration RPG from Bethesda.', 4, 4),
('Mario Kart 8 Deluxe', 'Nintendo Switch', 'Racing', '3', 'The ultimate kart racing game for Nintendo Switch.', 10, 10),
('Cyberpunk 2077', 'PC', 'Action RPG', '18', 'Experience a dystopian future in this immersive action RPG.', 5, 5),
('Hogwarts Legacy', 'Multi', 'Action RPG', '12', 'Immerse yourself in the wizarding world in this action RPG.', 7, 7);
