import { Request, RequestHandler, Response } from 'express';

import { Book } from '@prisma/client';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';

import { sendResponse } from '../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

// create books
const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;

    const result = await BookService.createBook(bookData);

    sendResponse<Book>(res, {
      success: true,
      statusCode: 200,
      message: 'Book created successfully',
      data: result,
    });
  }
);

// get all books
const getBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, bookFilterableFields);

    const result = await BookService.getAllBooks(filters, options);

    sendResponse<Book[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Books fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getBooksbyCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const options = pick(req.query, ['limit', 'page']);
    const result = await BookService.getBooksbyCategoryService(
      categoryId,
      options
    );

    sendResponse<Book[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Books with associated category data fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
// all books by categoryId
const getBooksbyId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.getBooksbyIdService(id);

    sendResponse<Book>(res, {
      statusCode: 200,
      success: true,
      message: 'Book fetched successfully',
      data: result,
    });
  }
);

// all books by category
const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await BookService.updateBooksbyIdService(id, updatedData);

    sendResponse<Book>(res, {
      statusCode: 200,
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  }
);

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteBookService(id);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: 'Book is deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
  getBooksbyCategory,
  getBooksbyId,
};
