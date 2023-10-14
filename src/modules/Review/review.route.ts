import express from 'express';
import { reviewController } from './review.controller';

const router = express.Router();
router.post(
  '/create-review',
  // auth(ENUM_USER_ROLE.ADMIN),
  reviewController.createReview
);

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.singleReview);

export const reviewRoutes = router;
