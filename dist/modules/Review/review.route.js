"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const user_1 = require("../../enums/user");
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/create-review', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validation_1.reviewValidation.createReviewZodSchema), review_controller_1.reviewController.createReview);
router.get('/', review_controller_1.reviewController.getAllReviews);
router.get('/:id', review_controller_1.reviewController.singleReview);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validation_1.reviewValidation.updateReviewZodSchema), review_controller_1.reviewController.updateController);
exports.reviewRoutes = router;
