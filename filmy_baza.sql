
CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    studio TEXT,
    cast TEXT,
    genre TEXT,
    summary TEXT
);

INSERT INTO movies (id, title, studio, cast, genre, summary) VALUES
(1, 'Inception', 'Warner Bros.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', 'Sci-fi / Thriller', 'Zespół specjalistów włamuje się do snów ludzi, by zaszczepić w nich myśl.'),
(2, 'The Dark Knight', 'Warner Bros.', 'Christian Bale, Heath Ledger', 'Akcja / Kryminał', 'Batman mierzy się z Jokerem, anarchistą, który pogrąża Gotham w chaosie.'),
(3, 'Interstellar', 'Paramount / Warner Bros.', 'Matthew McConaughey, Anne Hathaway', 'Sci-fi / Dramat', 'Astronauci wyruszają przez tunel czasoprzestrzenny, by uratować ludzkość.'),
(4, 'Avatar', '20th Century Fox', 'Sam Worthington, Zoe Saldana', 'Sci-fi / Przygodowy', 'Żołnierz w ciele Na’vi odkrywa konflikt między ludźmi a mieszkańcami Pandory.'),
(5, 'Titanic', 'Paramount / 20th Century Fox', 'Leonardo DiCaprio, Kate Winslet', 'Romans / Dramat', 'Arystokratka i artysta zakochują się podczas tragicznego rejsu Titanica.'),
(6, 'Matrix', 'Warner Bros.', 'Keanu Reeves, Laurence Fishburne', 'Sci-fi / Akcja', 'Neo odkrywa, że świat jest komputerową symulacją kontrolowaną przez maszyny.'),
(7, 'Gladiator', 'DreamWorks / Universal', 'Russell Crowe, Joaquin Phoenix', 'Dramat historyczny / Akcja', 'Zdradzony generał zostaje gladiatorem i szuka zemsty.'),
(8, 'Forrest Gump', 'Paramount', 'Tom Hanks', 'Dramat / Komediodramat', 'Forrest nieświadomie wpływa na wiele historycznych wydarzeń USA.'),
(9, 'Pulp Fiction', 'Miramax', 'John Travolta, Uma Thurman, Samuel L. Jackson', 'Kryminał / Dramat', 'Przeplatające się losy gangsterów i przestępców tworzą wielowątkową historię.'),
(10, 'Star Wars: A New Hope', 'Lucasfilm', 'Mark Hamill, Harrison Ford', 'Sci-fi / Przygodowy', 'Luke Skywalker dołącza do Rebelii, by pokonać Imperium.'),
(11, 'Jurassic Park', 'Universal', 'Sam Neill, Laura Dern', 'Sci-fi / Przygodowy', 'Dinozaury klonowane w parku rozrywki wymykają się spod kontroli.'),
(12, 'The Lord of the Rings: Fellowship of the Ring', 'New Line Cinema', 'Elijah Wood, Viggo Mortensen', 'Fantasy / Przygodowy', 'Drużyna wyrusza, by zniszczyć Pierścień i pokonać ciemne moce.'),
(13, 'The Avengers', 'Marvel Studios', 'Robert Downey Jr., Chris Evans', 'Akcja / Sci-fi', 'Bohaterowie łączą siły, by powstrzymać Lokiego i inwazję kosmitów.'),
(14, 'The Lion King', 'Disney', 'Matthew Broderick, Jeremy Irons', 'Animacja / Dramat', 'Simba musi stawić czoła przeszłości i odzyskać miejsce na tronie.'),
(15, 'Harry Potter and the Sorcerer''s Stone', 'Warner Bros.', 'Daniel Radcliffe, Emma Watson, Rupert Grint', 'Fantasy / Przygodowy', 'Chłopiec-czarodziej rozpoczyna naukę w Hogwarcie i odkrywa tajemnicę Kamienia.');