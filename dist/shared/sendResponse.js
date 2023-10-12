"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reponseAuthFormat = exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        data: data.data || null || undefined,
        meta: data.meta || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.sendResponse = sendResponse;
const reponseAuthFormat = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.token || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.reponseAuthFormat = reponseAuthFormat;
