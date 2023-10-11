import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CategoryController } from './category.controller';

const router = express.Router();
router.post(
  '/categories/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategories
);
router.get('/categories', CategoryController.getCategories);
router.get('/categories/:id', CategoryController.getCategory);
router.patch(
  '/categories/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategories
);
router.delete(
  '/categories/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategories
);

export const CategoryRoutes = router;
