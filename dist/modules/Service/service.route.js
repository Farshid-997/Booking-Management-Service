"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const servicer_controller_1 = require("./servicer.controller");
const router = express_1.default.Router();
router.post('/create-service', 
// auth(ENUM_USER_ROLE.ADMIN),
servicer_controller_1.serviceController.createService);
router.get('/service', servicer_controller_1.serviceController.getAllServices);
router.get('/service/:id', servicer_controller_1.serviceController.singleService);
router.patch('/service/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
servicer_controller_1.serviceController.updateService);
router.delete('/service/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
servicer_controller_1.serviceController.deleteService);
exports.serviceRoutes = router;
