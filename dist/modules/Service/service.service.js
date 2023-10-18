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
exports.serviceService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const service_constant_1 = require("./service.constant");
const prisma = new client_1.PrismaClient();
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.create({
        data: service,
    });
    if (!result) {
        throw new ApiError_1.default(400, 'failed to created new service');
    }
    return result;
});
const getAllService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_constant_1.serviceSearchableFields.map(field => ({
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
    const result = yield prisma.service.findMany({
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma.service.count({
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
const getsingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Query related bookings and reviews for the service
    const relatedService = yield prisma.service.findUnique({
        where: { id },
        include: { bookings: true, reviews: true },
    });
    if (!relatedService) {
        throw new Error(`Service with id ${id} not found.`);
    }
    const relatedBookings = relatedService.bookings;
    const relatedReviews = relatedService.reviews;
    // Handle related bookings (if needed)
    for (const booking of relatedBookings) {
        yield prisma.booking.delete({
            where: {
                id: booking.id, // Assuming 'id' is the primary key of the 'bookings' table
            },
        });
    }
    // Handle related reviews (if needed)
    if (relatedReviews) {
        for (const review of relatedReviews) {
            yield prisma.review.delete({
                where: {
                    id: review.id, // Assuming 'id' is the primary key of the 'reviews' table
                },
            });
        }
    }
    // Finally, delete the service
    const result = yield prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.serviceService = {
    createService,
    getAllService,
    getsingleService,
    updateService,
    deleteService,
};
