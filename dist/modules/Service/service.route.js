"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const user_1 = require("../../enums/user");
const service_validation_1 = require("./service.validation");
const servicer_controller_1 = require("./servicer.controller");
const router = express_1.default.Router();
router.post('/create-service', (0, validateRequest_1.default)(service_validation_1.serviceValidation.createServiceZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), servicer_controller_1.serviceController.createService);
router.get('/', servicer_controller_1.serviceController.getAllServices);
router.get('/:id', servicer_controller_1.serviceController.singleService);
router.patch('/:id', (0, validateRequest_1.default)(service_validation_1.serviceValidation.updateServiceZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), servicer_controller_1.serviceController.updateService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), servicer_controller_1.serviceController.deleteService);
exports.serviceRoutes = router;
