USE library_management;
/*
INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
('', '');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('', '');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('', '');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('', '');

\*/

INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
(1, 'ENGLSH', '1100', 'FS25', 'A', 'Reading Literature');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('1', '0141439556');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('1', '0062315005');

INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
(2, 'ENGLSH', '2180', 'FS25', 'A', 'Introduction to Women’s Literature');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('2', '0192802631');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('2', '0141439580');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('2', '1328879941');

INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
(3, 'ENGLSH', '2150', 'F25', 'A', 'Popular Literature');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('3', '059309932X');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('3', '0452284236');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('3', '0345539788');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('3', '0439023483');

INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
(4, 'ENGLSH', '2200', 'F25', 'A', 'Studies in British Literature');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('4', '0143131842');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('4', '054792822X');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('4', '0547928211');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('4', '0439554934');

INSERT INTO CLASS (Class_ID, Department, Number, Semester, Section, Class_title) VALUES 
('5', 'ENGLSH', '4220', 'F25', 'A', 'Renaissance and Seventeenth Century Literature');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('5', '0521618746');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('5', '0743477545');
INSERT INTO REQUIRES (Class_ID, ISBN) VALUES ('5', '0998809101');


SELECT * FROM CLASS;

SELECT * FROM STUDENT;

SELECT Department, Number, Class_title, Title FROM BOOK, CLASS, REQUIRES WHERE CLASS.Class_ID = 5 AND CLASS.Class_ID = REQUIRES.Class_ID AND BOOK.ISBN = REQUIRES.ISBN;