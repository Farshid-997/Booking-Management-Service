import { Category } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

// creating user
const createCategoriesService = async (
  category: Category
): Promise<Category | null> => {
  const result = await prisma.category.create({
    data: category,
  });
  if (!result) {
    throw new ApiError(400, 'failed to create category');
  }
  return result;
};
// getAll
const getAllCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};

const getCategoryService = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

// update
const updateCategoriesService = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const isExist = await getCategoryService(id);

  if (!isExist) {
    throw new ApiError(404, 'Category not found !');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// delete
const deleteCategoryService = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategoriesService,
  getAllCategories,
  getCategoryService,
  updateCategoriesService,
  deleteCategoryService,
};
