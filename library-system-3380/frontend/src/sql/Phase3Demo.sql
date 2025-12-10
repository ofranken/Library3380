USE library_management;

/*1. Demo adding a user to the system.*/
SELECT s.Student_ID, s.Fname, s.Lname FROM STUDENT AS s;

/*2. Demo adding a book to the new user's TBR list.*/
SELECT b.ISBN, b.Title, a.Author FROM TBR_WISHLIST t
JOIN BOOK b ON t.ISBN = b.ISBN
JOIN BOOK_AUTHOR a ON b.ISBN = a.ISBN
WHERE t.Student_ID = '444444';

/*3. Demo checking out a book.*/
SELECT b.Student_ID, s.Fname, l.Name AS Location, bk.Title, a.Author, b.Checkout_date, b.Due_date, b.Format_type
FROM BORROWS AS b
JOIN STUDENT AS s ON b.Student_ID = s.Student_ID
JOIN LOCATION AS l ON b.Location_ID = l.Location_ID
JOIN BOOK AS bk ON b.ISBN = bk.ISBN
JOIN BOOK_AUTHOR AS a ON bk.ISBN = a.ISBN
WHERE b.Student_ID = '444444';

