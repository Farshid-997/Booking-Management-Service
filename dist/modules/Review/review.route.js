"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/create-review', 
// auth(ENUM_USER_ROLE.ADMIN),
review_controller_1.reviewController.createReview);
router.get('/', review_controller_1.reviewController.getAllReviews);
router.get('/:id', review_controller_1.reviewController.singleReview);
exports.reviewRoutes = router;
