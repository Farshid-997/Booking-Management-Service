import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { reviewController } from './review.controller';

import { reviewValidation } from './review.validation';

const router = express.Router();
router.post(
  '/create-review',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(reviewValidation.createReviewZodSchema),
  reviewController.createReview
);

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.singleReview);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(reviewValidation.updateReviewZodSchema),
  reviewController.updateController
);

export const reviewRoutes = router;
