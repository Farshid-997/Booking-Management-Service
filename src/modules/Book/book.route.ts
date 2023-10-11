import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { BookController } from './book.controller';

const router = express.Router();
router.post(
  '/books/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get('/books', BookController.getBooks);
router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getBooksbyId);
router.patch(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateBook
);
router.delete(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteBook
);

router.get('/books/:categoryId/category', BookController.getBooksbyCategory);
export const BookRoutes = router;
