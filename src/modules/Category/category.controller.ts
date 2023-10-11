import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../shared/catchAsync';

import { Category } from '@prisma/client';

import { sendResponse } from '../../shared/sendResponse';
import { CategoryService } from './category.service';

// signup
const createCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...categoriesData } = req.body;

    const result = await CategoryService.createCategoriesService(
      categoriesData
    );

    sendResponse<Category>(res, {
      success: true,
      statusCode: 200,
      message: 'Category created successfully',
      data: result,
    });
  }
);

// all Category
const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();

    sendResponse<Category[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Categories fetched successfully',
      data: result,
    });
  }
);
// get 1
const getCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getCategoryService(id);

    sendResponse<Category>(res, {
      statusCode: 200,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    });
  }
);

// update
const updateCategories = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CategoryService.updateCategoriesService(id, updatedData);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategories = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.deleteCategoryService(id);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});
export const CategoryController = {
  createCategories,
  getCategories,
  getCategory,
  updateCategories,
  deleteCategories,
};
