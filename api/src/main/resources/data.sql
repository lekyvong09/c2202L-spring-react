INSERT INTO product_category(category_name) VALUES ('COMIC');
INSERT INTO product_category(category_name) VALUES ('FICTION');
INSERT INTO product_category(category_name) VALUES ('ROMANTIC');
INSERT INTO product_category(category_name) VALUES ('PROGRAMMING');


INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Superman: Action Comics Volume 5: The House of Kentn', 'The House of Kent, Superman, Superboy, Supergirl, the Legion of Super-Heroes’ Brainiac 5, and Young Justice’s Conner Kent must all unite to face an enemy from another dimension unleashed by the Invisible Mafia! This kind of power can lay waste to an entire family of super-people! All of this plus the future of the Daily Planet revealed!',
        'assets/images/products/BOOK-COMIC-1000.jpg',100,12.99, NOW(), 1, 'Brian Michael Bendis');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Batman: The Silver Age Omnibus Vol. 1', 'The Caped Crusader is known for protecting the streets of Gotham from the villains who wish to cause harm. Follow along on some of his most adventurous tales in Batman: The Silver Age Omnibus Vol. 1 collecting Batman #101-116',
        'assets/images/products/BOOK-COMIC-1001.jpg',100,99.99, NOW(), 1, 'Bill Finger');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('The Fifth Science', 'The Fifth Science is a collection of 12 stories, beginning at the start of the Galactic Human Empire and following right through to its final days. We’ll see some untypical things along the way, meet some untypical folk: galactic lighthouses from the distant future, alien tombs from the distant past, murderers, emperors, archaeologists and drunks; mad mathematicians attempting to wake the universe itself up.And when humans have fallen back into savagery, when the secrets of space folding and perfect wisdom are forgotten, we’ll attend the empire’s deathbed, hold its hand as it goes. Unfortunately that may well only be the beginning.',
        'assets/images/products/BOOK-FICTION-1002.jpg',100,24.99, NOW(), 2, 'Exurb1a');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('The Summer House: A gorgeous feel good romance that will have you hooked', 'Just when true happiness seems within reach, Callie and Olivia find a diary full of secrets... secrets that stretch across the island, and have the power to turn lives upside down. As Callie reads, she unravels a mystery that makes her heart drop through the floor. Will Callie and Luke be pulled apart by the storm it unleashes, or can true love save them?',
        'assets/images/products/BOOK-ROMANTIC-1003.jpg',100,15.00, NOW(), 3, 'Jenny Hale');

INSERT INTO product (name, description, image_url, units_in_stock,unit_price, date_created, category_id, brand)
VALUES ('The Art of Computer Programming', 'These four books comprise what easily could be the most important set of information on any serious programmer’s bookshelf.',
        'assets/images/products/BOOK-PROGRAMMING-1004.jpg',100,187.99, NOW(), 4, 'Donald Knuth');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Python Programming for Beginners : The Ultimate Guide for Beginners to Learn Python Programming: Crash Course on Python Programming for Beginners', 'Python is a high-level interpreted programming language that is used throughout the world for general-purpose programming. It is an open-source programming language licensed by both the Free Software Foundation (FSF) and Open-Source Initiative (OSI). Like some other programming languages, its source code is also available under the GNU General Public License (GPL). Throughout this book, we will be focusing more on the Python 3.x version, which is the latest and is currently in active development.',
        'assets/images/products/BOOK-PROGRAMMING-1005.jpg',100,21.99, NOW(), 4, 'PROGRAMMING LANGUAGES ACADEMY');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('The Self-Taught Programmer: The Definitive Guide to Programming Professionally', 'This book is not just about learning to program; although you will learn to code. If you want to program professionally, it is not enough to learn to code; that is why, in addition to helping you learn to program, I also cover the rest of the things you need to know to program professionally that classes and books don\'t teach you. "The Self-taught Programmer" is a roadmap, a guide to take you from writing your first Python program, to passing your first technical interview.',
        'assets/images/products/BOOK-PROGRAMMING-1006.jpg',100,21.87, NOW(), 4, 'Cory Althoff');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Computer Programming: The Bible: Learn from the basics to advanced of Python, C, C++, C#, HTML Coding, and Black Hat Hacking Step-by-Step in No Time!', 'Are you ready to learn and start programming with any language in less than 12 hours? The world of technology is changing and those who know how to handle it and who have the most knowledge about it are the ones who will get ahead. If you are a beginner who is interested in learning more and getting ahead, then this guidebook is the one for you.',
        'assets/images/products/BOOK-PROGRAMMING-1007.jpg',100,14.95, NOW(), 4, 'CyberPunk Architects');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Effective C: An Introduction to Professional C Programming', 'Effective C will teach you how to write professional, secure, and portable C code that will stand the test of time and help strengthen the foundation of the computing world.',
        'assets/images/products/BOOK-PROGRAMMING-1008.jpg',100,35.01, NOW(), 4, 'Robert C. Seacord');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software 2nd Edition', 'If you\'ve read a Head First book, you know what to expect: a visually rich format designed for the way your brain works. With Head First Design Patterns, 2E you\'ll learn design principles and patterns in a way that won\'t put you to sleep, so you can get out there to solve software design problems and speak the language of patterns with others on your team.',
        'assets/images/products/BOOK-PROGRAMMING-1009.jpg',100,32.43, NOW(), 4, 'Elisabeth Robson and Eric Freeman');

INSERT INTO product ( name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Beginning Programming All-in-One Desk Reference For Dummies', 'Beginning Programming All In One Desk Reference For Dummies shows you how to decide what you want your program to do, turn your instructions into “machine language” that the computer understands, use programming best practices, explore the “how” and “why” of data structuring, and more. You’ll even get a look into various applications like database management, bioinformatics, computer security, and artificial intelligence. Soon you’ll realize that — wow! You’re a programmer!',
        'assets/images/products/BOOK-PROGRAMMING-1010.jpg',100,32.89, NOW(), 4, 'Wallace Wang');

INSERT INTO product (name, description, image_url, units_in_stock, unit_price, date_created, category_id, brand)
VALUES ('Machine Learning: 4 Books in 1: A Complete Overview for Beginners to Master the Basics of Python Programming and Understand How to Build Artificial Intelligence Through Data Science', 'Created with the beginner in mind, this powerful bundle delves into the fundamentals behind Python and machine learning, from basic code and mathematical formulas to complex neural networks and ensemble modeling. Inside, you’ll discover everything you need to know to get started with Python and machine learning and begin your journey to success!',
        'assets/images/products/BOOK-PROGRAMMING-1011.jpg',100,35.01, NOW(), 4, 'Samuel Hack');