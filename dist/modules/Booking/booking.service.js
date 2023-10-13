"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const booking_constant_1 = require("./booking.constant");
const prisma = new client_1.PrismaClient();
const createBooking = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.create({
        data: booking,
    });
    if (!result) {
        throw new ApiError_1.default(400, 'failed to created new service');
    }
    return result;
});
const getAllBooking = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.booking.findMany({
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma.booking.count({
        where: whereConditions,
    });
    const totalPages = Math.ceil(total / Number(limit));
    return {
        meta: {
            total,
            page,
            limit,
            totalPages,
        },
        data: result,
    };
});
const getsingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookingService = {
    createBooking,
    getAllBooking,
    getsingleBooking,
    updateBooking,
    deleteBooking,
};
