USE library_management;
/*
INSERT INTO BOOK (ISBN, Title, Description) VALUES ('', '');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('', '');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('', '');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('', 1, 'E-Book', 999), 
('', 2, 'E-Book', 999), 
('', 1, 'Hardcopy', ), 
('', 2, 'Hardcopy', );
\*/
INSERT INTO LOCATION (Name, Street, City, State, ZIP) VALUES
('Ellis Library', '520 S 9th St', 'Columbia', 'MO', '65201'),
('Daniel Boone Regional Library', '100 W Broadway', 'Columbia', 'MO', '65203');

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('1400031702', 'The Secret History',
'Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries. But when they go beyond the boundaries of normal morality they slip gradually from obsession to corruption and betrayal, and at last—inexorably—into evil.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('1400031702', 'Donna Tart');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('1400031702', 'Fiction'), ('1400031702', 'Mystery');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('1400031702', 1, 'E-Book', 999), 
('1400031702', 2, 'E-Book', 999), 
('1400031702', 1, 'Hardcopy', 3), 
('1400031702', 2, 'Hardcopy', 2);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('1101870605', 'The Memory Police',
'On an unnamed island off an unnamed coast, objects are disappearing: first hats, then ribbons, birds, roses—until things become much more serious. Most of the island\'s inhabitants are oblivious to these changes, while those few imbued with the power to recall the lost objects live in fear of the draconian Memory Police, who are committed to ensuring that what has disappeared remains forgotten.\nWhen a young woman who is struggling to maintain her career as a novelist discovers that her editor is in danger from the Memory Police, she concocts a plan to hide him beneath her floorboards. As fear and loss close in around them, they cling to her writing as the last way of preserving the past.\nA surreal, provocative fable about the power of memory and the trauma of loss, The Memory Police is a stunning new work from one of the most exciting contemporary authors writing in any language.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('1101870605', 'Yoko Ogawa');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('1101870605', 'Fiction'), ('1101870605', 'Science Fiction'), ('1101870605', 'Fantasy');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('1101870605', 1, 'E-Book', 999), 
('1101870605', 2, 'E-Book', 999), 
('1101870605', 1, 'Hardcopy', 1), 
('1101870605', 2, 'Hardcopy', 1);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('1250048117', 'Shadow and Bone',
'Surrounded by enemies, the once-great nation of Ravka has been torn in two by the Shadow Fold, a swath of near impenetrable darkness crawling with monsters who feast on human flesh. Now its fate may rest on the shoulders of one lonely refugee.\nAlina Starkov has never been good at anything. But when her regiment is attacked on the Fold and her best friend is brutally injured, Alina reveals a dormant power that saves his life—a power that could be the key to setting her war-ravaged country free. Wrenched from everything she knows, Alina is whisked away to the royal court to be trained as a member of the Grisha, the magical elite led by the mysterious Darkling.\nYet nothing in this lavish world is what it seems. With darkness looming and an entire kingdom depending on her untamed power, Alina will have to confront the secrets of the Grisha . . . and the secrets of her heart.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('1250048117', 'Leigh Bardugo');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('1250048117', 'Fantasy'), ('1250048117', 'Romance'), ('1250048117', 'Fiction'), ('1250048117', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('1250048117', 1, 'E-Book', 999), 
('1250048117', 2, 'E-Book', 999), 
('1250048117', 1, 'Hardcopy', 3), 
('1250048117', 2, 'Hardcopy', 4);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('125004443X', 'Siege and Storm',
'Darkness never dies.\nHunted across the True Sea, haunted by the lives she took on the Fold, Alina must try to make a life with Mal in an unfamiliar land, all while keeping her identity as the Sun Summoner a secret. But she can’t outrun her past or her destiny for long.\nThe Darkling has emerged from the Shadow Fold with a terrifying new power and a dangerous plan that will test the very boundaries of the natural world. With the help of a notorious privateer, Alina returns to the country she abandoned, determined to fight the forces gathering against Ravka. But as her power grows, Alina slips deeper into the Darkling’s game of forbidden magic, and farther away from Mal. Somehow, she will have to choose between her country, her power, and the love she always thought would guide her—or risk losing everything to the oncoming storm.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('125004443X', 'Leigh Bardugo');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('125004443X', 'Fantasy'), ('125004443X', 'Romance'), ('125004443X', 'Fiction'), ('125004443X', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('125004443X', 1, 'E-Book', 999), 
('125004443X', 2, 'E-Book', 999), 
('125004443X', 1, 'Hardcopy', 3), 
('125004443X', 2, 'Hardcopy', 2);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('1250063167', 'Ruin and Rising',
'The capital has fallen.\nThe Darkling rules Ravka from his shadow throne.\nNow the nation\'s fate rests with a broken Sun Summoner, a disgraced tracker, and the shattered remnants of a once-great magical army.\nDeep in an ancient network of tunnels and caverns, a weakened Alina must submit to the dubious protection of the Apparat and the zealots who worship her as a Saint. Yet her plans lie elsewhere, with the hunt for the elusive firebird and the hope that an outlaw prince still survives.\nAlina will have to forge new alliances and put aside old rivalries as she and Mal race to find the last of Morozova\'s amplifiers. But as she begins to unravel the Darkling\'s secrets, she reveals a past that will forever alter her understanding of the bond they share and the power she wields. The firebird is the one thing that stands between Ravka and destruction—and claiming it could cost Alina the very future she’s fighting for.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('1250063167', 'Leigh Bardugo');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('1250063167', 'Fantasy'), ('1250063167', 'Romance'), ('1250063167', 'Fiction'), ('1250063167', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('1250063167', 1, 'E-Book', 999), 
('1250063167', 2, 'E-Book', 999), 
('1250063167', 1, 'Hardcopy', 3), 
('1250063167', 2, 'Hardcopy', 2);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0143131842', 'Frankenstein',
'This edition is the original 1818 text, which preserves the hard-hitting and politically charged aspects of Shelley\'s original writing, as well as her unflinching wit and strong female voice. This edition also includes a new introduction and suggestions for further reading by author and Shelley expert Charlotte Gordon, literary excerpts and reviews selected by Gordon and a chronology and essay by preeminent Shelley scholar Charles E. Robinson.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0143131842', 'Mary Wollstonecraft Shelley');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0143131842', 'Classics'), ('0143131842', 'Horror'), ('0143131842', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0143131842', 1, 'E-Book', 999), 
('0143131842', 2, 'E-Book', 999), 
('0143131842', 1, 'Hardcopy', 6), 
('0143131842', 2, 'Hardcopy', 4);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0743273567', 'The Great Gatsby',
'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. First published in 1925, this quintessential novel of the Jazz Age has been acclaimed by generations of readers. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0743273567', 'F. Scott Fitzgerald');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0743273567', 'Classics'), ('0743273567', 'Fiction'), ('0743273567', 'Romance');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0743273567', 1, 'E-Book', 999), 
('0743273567', 2, 'E-Book', 999), 
('0743273567', 1, 'Hardcopy', 6), 
('0743273567', 2, 'Hardcopy', 7);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0452284236', '1984',
'A masterpiece of rebellion and imprisonment where war is peace freedom is slavery and Big Brother is watching. Thought Police, Big Brother, Orwellian - these words have entered our vocabulary because of George Orwell\'s classic dystopian novel 1984. The story of one man\'s Nightmare Odyssey as he pursues a forbidden love affair through a world ruled by warring states and a power structure that controls not only information but also individual thought and memory 1984 is a prophetic haunting tale More relevant than ever before 1984 exposes the worst crimes imaginable the destruction of truth freedom and individuality. With a foreword by Thomas Pynchon. This beautiful paperback edition features deckled edges and french flaps a perfect gift for any occasion');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0452284236', 'George Orwell');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0452284236', 'Classics'), ('0452284236', 'Fiction'), ('0452284236', 'Science Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0452284236', 1, 'E-Book', 999), 
('0452284236', 2, 'E-Book', 999), 
('0452284236', 1, 'Hardcopy', 8), 
('0452284236', 2, 'Hardcopy', 5);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0385333846', 'Slaughterhouse Five',
'Slaughterhouse-Five, an American classic, is one of the world’s great antiwar books. Centering on the infamous World War II firebombing of Dresden, the novel is the result of what Kurt Vonnegut described as a twenty-three-year struggle to write a book about what he had witnessed as an American prisoner of war. It combines historical fiction, science fiction, autobiography, and satire in an account of the life of Billy Pilgrim, a barber’s son turned draftee turned optometrist turned alien abductee. As Vonnegut had, Billy experiences the destruction of Dresden as a POW. Unlike Vonnegut, he experiences time travel, or coming “unstuck in time.”\nAn instant bestseller, Slaughterhouse-Five made Kurt Vonnegut a cult hero in American literature, a reputation that only strengthened over time, despite his being banned and censored by some libraries and schools for content and language. But it was precisely those elements of Vonnegut’s writing—the political edginess, the genre-bending inventiveness, the frank violence, the transgressive wit—that have inspired generations of readers not just to look differently at the world around them but to find the confidence to say something about it.\nFifty years after its initial publication at the height of the Vietnam War, Vonnegut\'s portrayal of political disillusionment, PTSD, and postwar anxiety feels as relevant, darkly humorous, and profoundly affecting as ever, an enduring beacon through our own era’s uncertainties.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0385333846', 'Kurt Vonnegut Jr.');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0385333846', 'Classics'), ('0385333846', 'Fiction'), ('0385333846', 'Science Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0385333846', 1, 'E-Book', 999), 
('0385333846', 2, 'E-Book', 999), 
('0385333846', 1, 'Hardcopy', 7), 
('0385333846', 2, 'Hardcopy', 4);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0140449132', 'Crime and Punishment',
'Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0140449132', 'Fyodor Dostoevsky');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0140449132', 'Classics'), ('0140449132', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0140449132', 1, 'E-Book', 999), 
('0140449132', 2, 'E-Book', 999), 
('0140449132', 1, 'Hardcopy', 8), 
('0140449132', 2, 'Hardcopy', 9);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0141439556', 'Wuthering Heights',
'Emily Brontë\'s only novel, a work of tremendous and far-reaching influence, the Penguin Classics edition of Wuthering Heights is the definitive edition of the text, edited with an introduction by Pauline Nestor. Lockwood, the new tenant of Thrushcross Grange, situated on the bleak Yorkshire moors, is forced to seek shelter one night at Wuthering Heights, the home of his landlord. There he discovers the history of the tempestuous events that took place years before; of the intense relationship between the gypsy foundling Heathcliff and Catherine Earnshaw; and how Catherine, forced to choose between passionate, tortured Heathcliff and gentle, well-bred Edgar Linton, surrendered to the expectations of her class. As Heathcliff\'s bitterness and vengeance at his betrayal is visited upon the next generation, their innocent heirs must struggle to escape the legacy of the past.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0141439556', 'Emily Brontë');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0141439556', 'Classics'), ('0141439556', 'Fiction'), ('0141439556', 'Romance');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0141439556', 1, 'E-Book', 999), 
('0141439556', 2, 'E-Book', 999), 
('0141439556', 1, 'Hardcopy', 6), 
('0141439556', 2, 'Hardcopy', 5);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0735223289', 'Frostbite: How Refrigeration Changed Our Food, Our Planet, and Ourselves',
'An engaging and far-reaching exploration of refrigeration, tracing its evolution from scientific mystery to globe-spanning infrastructure, and an essential investigation into how it has remade our entire relationship with food—for better and for worse.\nHow often do we open the fridge or peer into the freezer with the expectation that we’ll find something fresh and ready to eat? It’s an everyday act, easily taken for granted, but just a century ago, eating food that had been refrigerated was cause for both fear and excitement. Banquets were held just so guests could enjoy the novelty of eggs, butter, and apples that had been preserved for months in cold storage—and demonstrate that such zombie foods were not deadly. The introduction of artificial refrigeration overturned millennia of dietary history, launching an entirely new chapter in human nutrition. We could now overcome not just rot, but also seasonality and geography. Tomatoes in January? Avocados in Shanghai? All possible.\nIn FROSTBITE, New Yorker contributor and co-host of the award-winning podcast Gastropod Nicola Twilley takes readers with her on a tour of the cold chain from farm to fridge, visiting such off-the-beaten-track landmarks as Missouri’s subterranean cheese caves, the banana-ripening rooms of New York City, and the vast refrigerated tanks that store the nation’s OJ reserves. Today, more than three-quarters of everything on the average American plate is processed, shipped, stored, and sold under refrigeration. It’s impossible to make sense of our food system without understanding the all-but-invisible network of thermal control that underpins it. Twilley’s eye-opening book is the first to reveal the transformative impact refrigeration has had on our health and our guts; our farms, tables, kitchens, and cities; global economics and politics; and even our environment.\nIn the developed world, we’ve reaped the benefits of refrigeration for more than a century, but as Twilley soon discovers, the costs are catching up with us. We’ve eroded our connection to our food, extending the distance between producers and consumers and redefining what “fresh” really means. More importantly, refrigeration is one of the leading contributors to climate change. As the developing world races to build a U.S.-style cold chain, Twilley asks, can we reduce our dependence on refrigeration? Should we? A deeply-researched and reported, original, and entertaining dive into the most important invention in the history of food and drink, FROSTBITE makes the case for a recalibration of our relationship with the fridge—and how our future might depend on it.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0735223289', 'Nicola Twilley');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0735223289', 'Nonfiction'), ('0735223289', 'History');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0735223289', 1, 'E-Book', 999), 
('0735223289', 2, 'E-Book', 999), 
('0735223289', 1, 'Hardcopy', 1), 
('0735223289', 2, 'Hardcopy', 2);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0609608444', 'The Devil in the White City: Murder, Magic, and Madness at the Fair That Changed America',
'Author Erik Larson imbues the incredible events surrounding the 1893 Chicago World\'s Fair with such drama that readers may find themselves checking the book\'s categorization to be sure that \'The Devil in the White City\' is not, in fact, a highly imaginative novel. Larson tells the stories of two men: Daniel H. Burnham, the architect responsible for the fair\'s construction, and H.H. Holmes, a serial killer masquerading as a charming doctor.\nBurnham\'s challenge was immense. In a short period of time, he was forced to overcome the death of his partner and numerous other obstacles to construct the famous "White City" around which the fair was built. His efforts to complete the project, and the fair\'s incredible success, are skillfully related along with entertaining appearances by such notables as Buffalo Bill Cody, Susan B. Anthony, and Thomas Edison.\nThe activities of the sinister Dr. Holmes, who is believed to be responsible for scores of murders around the time of the fair, are equally remarkable. He devised and erected the World\'s Fair Hotel, complete with crematorium and gas chamber, near the fairgrounds and used the event as well as his own charismatic personality to lure victims.\nCombining the stories of an architect and a killer in one book, mostly in alternating chapters, seems like an odd choice but it works. The magical appeal and horrifying dark side of 19th-century Chicago are both revealed through Larson\'s skillful writing. - John Moe');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0609608444', 'Erik Larson');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0609608444', 'Nonfiction'), ('0609608444', 'History'), ('0609608444', 'Mystery');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0609608444', 1, 'E-Book', 999), 
('0609608444', 2, 'E-Book', 999), 
('0609608444', 1, 'Hardcopy', 2), 
('0609608444', 2, 'Hardcopy', 3);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('076790818X', 'A Short History of Nearly Everything',
'Bill Bryson describes himself as a reluctant traveller, but even when he stays safely at home he can\'t contain his curiosity about the world around him. "A Short History of Nearly Everything" is his quest to understand everything that has happened from the Big Bang to the rise of civilisation - how we got from there, being nothing at all, to here, being us. The ultimate eye-opening journey through time and space, revealing the world in a way most of us have never seen it before.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('076790818X', 'Bill Bryson');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('076790818X', 'Nonfiction'), ('076790818X', 'History');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('076790818X', 1, 'E-Book', 999), 
('076790818X', 2, 'E-Book', 999), 
('076790818X', 1, 'Hardcopy', 3), 
('076790818X', 2, 'Hardcopy', 2);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0547928211', 'The Fellowship of the Ring',
'Sauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.\nIn a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0547928211', 'J.R.R. Tolkien');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0547928211', 'Fantasy'), ('0547928211', 'Fiction'), ('0547928211', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0547928211', 1, 'E-Book', 999), 
('0547928211', 2, 'E-Book', 999), 
('0547928211', 1, 'Hardcopy', 9), 
('0547928211', 2, 'Hardcopy', 8);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0261102362', 'The Two Towers',
'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.\nFrodo and his Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in a battle in the Mines of Moria. And Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape, the rest of the company was attacked by Orcs. Now they continue the journey alone down the great River Anduin—alone, that is, save for the mysterious creeping figure that follows wherever they go.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0261102362', 'J.R.R. Tolkien');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0261102362', 'Fantasy'), ('0261102362', 'Fiction'), ('0261102362', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0261102362', 1, 'E-Book', 999), 
('0261102362', 2, 'E-Book', 999), 
('0261102362', 1, 'Hardcopy', 8), 
('0261102362', 2, 'Hardcopy', 7);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('978-0547952048', 'The Return of the King',
'The Return of the King is the third part of J.R.R. Tolkien’s epic adventure The Lord of the Rings.\nOne Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them. The Dark Lord has risen, and as he unleashes hordes of Orcs to conquer all Middle-earth, Frodo and Sam struggle deep into his realm in Mordor.\nTo defeat Sauron, the One Ring must be destroyed in the fires of Mount Doom. But the way is impossibly hard, and Frodo is weakening. The Ring corrupts all who bear it and Frodo’s time is running out. Will Sam and Frodo succeed, or will the Dark Lord rule Middle-earth once more?');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('978-0547952048', 'J.R.R. Tolkien');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('978-0547952048', 'Fantasy'), ('978-0547952048', 'Fiction'), ('978-0547952048', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('978-0547952048', 1, 'E-Book', 999), 
('978-0547952048', 2, 'E-Book', 999), 
('978-0547952048', 1, 'Hardcopy', 7), 
('978-0547952048', 2, 'Hardcopy', 8);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('054792822X', 'The Hobbit',
'"In a hole in the ground there lived a hobbit." So begins one of the most beloved and delightful tales in the English language—Tolkien\'s prelude to The Lord of the Rings. Set in the imaginary world of Middle-earth, at once a classic myth and a modern fairy tale, The Hobbit is one of literature\'s most enduring and well-loved novels.\nBilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('054792822X', 'J.R.R. Tolkien');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('054792822X', 'Fantasy'), ('054792822X', 'Fiction'), ('054792822X', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('054792822X', 1, 'E-Book', 999), 
('054792822X', 2, 'E-Book', 999), 
('054792822X', 1, 'Hardcopy', 7), 
('054792822X', 2, 'Hardcopy', 7);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('059309932X', 'Dune',
'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...\nWhen House Atreides is betrayed, the destruction of Paul’s family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad’Dib, he will bring to fruition humankind’s most ancient and unattainable dream.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('059309932X', 'Frank Herbert');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('059309932X', 'Science Fiction'), ('059309932X', 'Fantasy'), ('059309932X', 'Fiction'), ('059309932X', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('059309932X', 1, 'E-Book', 999), 
('059309932X', 2, 'E-Book', 999), 
('059309932X', 1, 'Hardcopy', 6), 
('059309932X', 2, 'Hardcopy', 8);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0062315005', 'The Alchemist',
'Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.\nPaulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, following our dreams.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0062315005', 'Paulo Coelho');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0062315005', 'Fiction'), ('0062315005', 'Fantasy'), ('0062315005', 'Classics');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0062315005', 1, 'E-Book', 999), 
('0062315005', 2, 'E-Book', 999), 
('0062315005', 1, 'Hardcopy', 7), 
('0062315005', 2, 'Hardcopy', 12);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0192802631', 'Persuasion',
'Persuasion is Jane Austen\'s last completed novel. She began it soon after she had finished Emma, completing it in August 1816. She died, aged 41, in 1817; Persuasion was published in December that year (but dated 1818). Persuasion is linked to Northanger Abbey not only by the fact that the two books were originally bound up in one volume and published together, but also because both stories are set partly in Bath, a fashionable city with which Austen was well acquainted, having lived there from 1801 to 1805. Besides the theme of persuasion, the novel evokes other topics, such as the Royal Navy, in which two of Jane Austen\'s brothers ultimately rose to the rank of admiral. As in Northanger Abbey, the superficial social life of Bath-well known to Austen, who spent several relatively unhappy and unproductive years there-is portrayed extensively and serves as a setting for the second half of the book. In many respects Persuasion marks a break with Austen\'s previous works, both in the more biting, even irritable satire directed at some of the novel\'s characters and in the regretful, resigned outlook of its otherwise admirable heroine, Anne Elliot, in the first part of the story. Against this is set the energy and appeal of the Royal Navy, which symbolises for Anne and the reader the possibility of a more outgoing, engaged, and fulfilling life, and it is this worldview which triumphs for the most part at the end of the novel.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0192802631', 'Jane Austen');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0192802631', 'Classics'), ('0192802631', 'Romance'), ('0192802631', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0192802631', 1, 'E-Book', 999), 
('0192802631', 2, 'E-Book', 999), 
('0192802631', 1, 'Hardcopy', 9), 
('0192802631', 2, 'Hardcopy', 10);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0141439580', 'Emma',
'Emma Woodhouse is one of Austen\'s most captivating and vivid characters. Beautiful, spoilt, vain and irrepressibly witty, Emma organizes the lives of the inhabitants of her sleepy little village and plays matchmaker with devastating effect.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0141439580', 'Jane Austen');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0141439580', 'Classics'), ('0141439580', 'Romance'), ('0141439580', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0141439580', 1, 'E-Book', 999), 
('0141439580', 2, 'E-Book', 999), 
('0141439580', 1, 'Hardcopy', 8), 
('0141439580', 2, 'Hardcopy', 11);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('1328879941', 'The Handmaid\'s Tale',
'Now a Hulu series starring Elizabeth Moss. The Handmaid\'s Tale is an instant classic and eerily prescient cultural phenomenon, from "the patron saint of feminist dystopian fiction" ( New York Times ) The Handmaid’s Tale is a novel of such power that the reader will be unable to forget its images and its forecast. Set in the near future, it describes life in what was once the United States and is now called the Republic of Gilead, a monotheocracy that has reacted to social unrest and a sharply declining birthrate by reverting to, and going beyond, the repressive intolerance of the original Puritans. The regime takes the Book of Genesis absolutely at its word, with bizarre consequences for the women and men in its population. The story is told through the eyes of Offred, one of the unfortunate Handmaids under the new social order. In condensed but eloquent prose, by turns cool-eyed, tender, despairing, passionate, and wry, she reveals to us the dark corners behind the establishment’s calm facade, as certain tendencies now in existence are carried to their logical conclusions. The Handmaid’s Tale is funny, unexpected, horrifying, and altogether convincing. It is at once scathing satire, dire warning, and a tour de force. It is Margaret Atwood at her best.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('1328879941', 'Margaret Atwood');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('1328879941', 'Classics'), ('1328879941', 'Fiction'), ('1328879941', 'Science Fiction'), ('1328879941', 'Fantasy');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('1328879941', 1, 'E-Book', 999), 
('1328879941', 2, 'E-Book', 999), 
('1328879941', 1, 'Hardcopy', 8), 
('1328879941', 2, 'Hardcopy', 6);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0345539788', 'Red Rising',
'Darrow is a Red, a member of the lowest caste in the color-coded society of the future. Like his fellow Reds, he works all day, believing that he and his people are making the surface of Mars livable for future generations. Yet he toils willingly, trusting that his blood and sweat will one day result in a better world for his children.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0345539788', 'Pierce Brown');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0345539788', 'Science Fiction'), ('0345539788', 'Fiction'), ('0345539788', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0345539788', 1, 'E-Book', 999), 
('0345539788', 2, 'E-Book', 999), 
('0345539788', 1, 'Hardcopy', 5), 
('0345539788', 2, 'Hardcopy', 6);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0439023483', 'The Hunger Games',
'In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.\nSixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister\'s place in the Games. But Katniss has been close to dead before-and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0439023483', 'Suzanne Collins');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0439023483', 'Science Fiction'), ('0439023483', 'Fiction'), ('0439023483', 'Fantasy'), ('0439023483', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0439023483', 1, 'E-Book', 999), 
('0439023483', 2, 'E-Book', 999), 
('0439023483', 1, 'Hardcopy', 7), 
('0439023483', 2, 'Hardcopy', 4);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0439554934', 'Harry Potter and the Philosopher’s Stone',
'"Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter \'H\'."\nHarry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry\'s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0439554934', 'J.K. Rowling');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0439554934', 'Fantasy'), ('0439554934', 'Fiction'), ('0439554934', 'Young Adult');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0439554934', 1, 'E-Book', 999), 
('0439554934', 2, 'E-Book', 999), 
('0439554934', 1, 'Hardcopy', 12), 
('0439554934', 2, 'Hardcopy', 13);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0521618746', 'Hamlet',
'Among Shakespeare\'s plays, "Hamlet" is considered by many his masterpiece. Among actors, the role of Hamlet, Prince of Denmark, is considered the jewel in the crown of a triumphant theatrical career. Now Kenneth Branagh plays the leading role and co-directs a brillant ensemble performance. Three generations of legendary leading actors, many of whom first assembled for the Oscar-winning film "Henry V", gather here to perform the rarely heard complete version of the play. This clear, subtly nuanced, stunning dramatization, presented by The Renaissance Theatre Company in association with "Bbc" Broadcasting, features such luminaries as Sir John Gielgud, Derek Jacobi, Emma Thompson and Christopher Ravenscroft. It combines a full cast with stirring music and sound effects to bring this magnificent Shakespearen classic vividly to life. Revealing new riches with each listening, this production of "Hamlet" is an invaluable aid for students, teachers and all true lovers of Shakespeare - a recording to be treasured for decades to come.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0521618746', 'William Shakespeare');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0521618746', 'Classics'), ('0521618746', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0521618746', 1, 'E-Book', 999), 
('0521618746', 2, 'E-Book', 999), 
('0521618746', 1, 'Hardcopy', 15), 
('0521618746', 2, 'Hardcopy', 16);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0743477545', 'A Midsummer Night’s Dream',
'Shakespeare\'s intertwined love polygons begin to get complicated from the start--Demetrius and Lysander both want Hermia but she only has eyes for Lysander. Bad news is, Hermia\'s father wants Demetrius for a son-in-law. On the outside is Helena, whose unreturned love burns hot for Demetrius. Hermia and Lysander plan to flee from the city under cover of darkness but are pursued by an enraged Demetrius (who is himself pursued by an enraptured Helena). In the forest, unbeknownst to the mortals, Oberon and Titania (King and Queen of the faeries) are having a spat over a servant boy. The plot twists up when Oberon\'s head mischief-maker, Puck, runs loose with a flower which causes people to fall in love with the first thing they see upon waking. Throw in a group of labourers preparing a play for the Duke\'s wedding (one of whom is given a donkey\'s head and Titania for a lover by Puck) and the complications become fantastically funny.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0743477545', 'William Shakespeare');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0743477545', 'Classics'), ('0743477545', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0743477545', 1, 'E-Book', 999), 
('0743477545', 2, 'E-Book', 999), 
('0743477545', 1, 'Hardcopy', 7), 
('0743477545', 2, 'Hardcopy', 12);

INSERT INTO BOOK (ISBN, Title, Description) VALUES ('0998809101', 'Macbeth',
'What he hears will change everything. Egged on by his wife, he decides to kill in order to gain the Scottish crown. How many people will have to die in Macbeth\'s pursuit of power? With armies, ghosts and magic against him, will Macbeth survive in this tale of greed and betrayal? Getting the crown is one thing - keeping it is quite another.');
INSERT INTO BOOK_AUTHOR (ISBN, Author) VALUES ('0998809101', 'William Shakespeare');
INSERT INTO BOOK_GENRE (ISBN, Genre) VALUES ('0998809101', 'Classics'), ('0998809101', 'Fiction');
INSERT INTO FORMAT (ISBN, Location_ID, Format_type, Quantity) VALUES 
('0998809101', 1, 'E-Book', 999), 
('0998809101', 2, 'E-Book', 999), 
('0998809101', 1, 'Hardcopy', 16), 
('0998809101', 2, 'Hardcopy', 15);

