INSERT INTO users (email, password_hash, role) VALUES
('admin@game.com', '$2b$10$YUq6UuWaVqKGJ.ALw5pKkO/bHqLVfZtMzBR5tL5/5YGKpM7yUlSym', 'ADMIN'),
('user@game.com', '$2b$10$YUq6UuWaVqKGJ.ALw5pKkO/bHqLVfZtMzBR5tL5/5YGKpM7yUlSym', 'USER');

INSERT INTO games (title, platform, genre, pegi, description, stock_total, stock_available) VALUES
('The Witcher 3', 'PC', 'RPG', 18, 'Open-world RPG set in a fantasy universe.', 3, 3),
('Cyberpunk 2077', 'PC', 'RPG', 18, 'Futuristic open-world RPG.', 2, 2),
('Elden Ring', 'PC', 'Action', 16, 'Challenging action RPG with open-world exploration.', 4, 4),
('Baldurs Gate 3', 'PC', 'RPG', 16, 'Fantasy RPG based on D&D 5th Edition.', 2, 2),
('Starfield', 'PC', 'RPG', 18, 'Space exploration and sci-fi RPG.', 3, 3),
('Final Fantasy XVI', 'PS5', 'RPG', 16, 'Action-packed medieval fantasy RPG.', 1, 1),
('Tekken 8', 'PC', 'Fighting', 12, 'Fighting game with diverse characters.', 2, 2),
('Fortnite', 'PC', 'Shooter', 12, 'Free-to-play battle royale game.', 5, 5);
