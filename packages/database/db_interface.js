"use strict";
/*
API for back-end programs to add to and retreive data from the database.
Does not handle deletion.
Author: Max Pagels
January 18 2024
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAllRewardsOfVendor = exports.getAllTransactionsOfCard = exports.getAllPointRedemptionHistoryOfCard = exports.getAllLoyaltyCardsOfCustomer = exports.getAllVendors = exports.getReward = exports.getTransaction = exports.getPointRedemptionHistory = exports.getLoyaltyCard = exports.getVendor = exports.getCustomer = exports.addPointRedemption = exports.addReward = exports.addTransaction = exports.addLoyaltyCard = exports.addVendor = exports.addCustomer = void 0;
var dbObj_js_1 = require("./dbObj.js");
var schema = require("./schema.js");
var drizzle_orm_1 = require("drizzle-orm");
// Adds a new customer to the database, returns the generated customer_id
function addCustomer(fname, lname, email, address, phone, clerk_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //insert info
                return [4 /*yield*/, dbObj_js_1.db.insert(schema.customer).values({
                        fname: fname,
                        lname: lname,
                        email: email,
                        address: address,
                        phone: phone,
                        clerk_id: clerk_id
                    })];
                case 1:
                    //insert info
                    _a.sent();
                    return [4 /*yield*/, dbObj_js_1.db.select({
                            id: schema.customer.customer_id
                        }).from(schema.customer).where((0, drizzle_orm_1.eq)(schema.customer.email, email))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result[0].id];
            }
        });
    });
}
exports.addCustomer = addCustomer;
// Adds a new vendor to the database, returns the generated vendor_id
// NOTE: must input decimal spending_per_point as a string because Drizzle is weird
function addVendor(name, email, address, phone, description, color, reward_program_details, spending_per_point, //must input decimal as a string
max_points) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //insert info
                return [4 /*yield*/, dbObj_js_1.db.insert(schema.vendor).values({
                        name: name,
                        email: email,
                        address: address,
                        phone: phone,
                        description: description,
                        color: color,
                        reward_program_details: reward_program_details,
                        spending_per_point: spending_per_point,
                        max_points: max_points
                    })];
                case 1:
                    //insert info
                    _a.sent();
                    return [4 /*yield*/, dbObj_js_1.db.select({
                            id: schema.vendor.vendor_id
                        }).from(schema.vendor).where((0, drizzle_orm_1.eq)(schema.vendor.email, email))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result[0].id];
            }
        });
    });
}
exports.addVendor = addVendor;
// Adds a new loyalty card to the customer
function addLoyaltyCard(customer_id, //TODO: enforce types
vendor_id, points_amt, carry_over_amt) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Insert loyalty card information
                return [4 /*yield*/, dbObj_js_1.db.insert(schema.loyalty_card).values({
                        customer_id: customer_id,
                        vendor_id: vendor_id,
                        points_amt: points_amt,
                        carry_over_amt: carry_over_amt
                    })];
                case 1:
                    // Insert loyalty card information
                    _a.sent();
                    return [4 /*yield*/, dbObj_js_1.db.select({
                            id: schema.loyalty_card.loyalty_id
                        }).from(schema.loyalty_card).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.loyalty_card.customer_id, customer_id), (0, drizzle_orm_1.eq)(schema.loyalty_card.vendor_id, vendor_id)))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result[0].id];
            }
        });
    });
}
exports.addLoyaltyCard = addLoyaltyCard;
// Adds a new point redemption
// Timestamp auto generated
function addPointRedemption(loyalty_id, //TODO: enforce types
points_redeemed) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.insert(schema.point_redemption_history).values({
                        loyalty_id: loyalty_id,
                        points_redeemed: points_redeemed,
                        timestamp: new Date()
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPointRedemption = addPointRedemption;
// Adds a new transaction a customer completed
function addTransaction(loyalty_id, //TODO: enforce types
vendor_id, purchase_amt, points_earned, timestamp, payment_type) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Insert transaction information
                return [4 /*yield*/, dbObj_js_1.db.insert(schema.transaction).values({
                        loyalty_id: loyalty_id,
                        vendor_id: vendor_id,
                        purchase_amt: purchase_amt,
                        points_earned: points_earned,
                        timestamp: timestamp,
                        payment_type: payment_type
                    })];
                case 1:
                    // Insert transaction information
                    _a.sent();
                    return [4 /*yield*/, dbObj_js_1.db.select({
                            id: schema.transaction.transaction_id
                        }).from(schema.transaction).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.transaction.timestamp, timestamp), (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.transaction.loyalty_id, loyalty_id), (0, drizzle_orm_1.eq)(schema.transaction.vendor_id, vendor_id))))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result[0].id];
            }
        });
    });
}
exports.addTransaction = addTransaction;
// Adds a new reward to a vendor program
function addReward(vendor_id, //TODO: enforce types
name, description, points_cost) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Insert reward information
                return [4 /*yield*/, dbObj_js_1.db.insert(schema.reward).values({
                        vendor_id: vendor_id,
                        name: name,
                        description: description,
                        points_cost: points_cost
                    })];
                case 1:
                    // Insert reward information
                    _a.sent();
                    return [4 /*yield*/, dbObj_js_1.db.select({
                            id: schema.reward.reward_id
                        }).from(schema.reward).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.reward.vendor_id, vendor_id), (0, drizzle_orm_1.eq)(schema.reward.name, name)))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result[0].id];
            }
        });
    });
}
exports.addReward = addReward;
// Gets the customer object
// Input: the customer ID
function getCustomer(customer_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.customer).where((0, drizzle_orm_1.eq)(schema.customer.customer_id, customer_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getCustomer = getCustomer;
// Gets the vendor object
//Input: the vendor ID
function getVendor(input_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.vendor).where((0, drizzle_orm_1.eq)(schema.vendor.vendor_id, input_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getVendor = getVendor;
// Gets the loyalty card object
// Input: the loyalty car ID
function getLoyaltyCard(loyalty_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.loyalty_card).where((0, drizzle_orm_1.eq)(schema.loyalty_card.loyalty_id, loyalty_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getLoyaltyCard = getLoyaltyCard;
// Gets the point redemption history object
// Input: the loyalty card ID
function getPointRedemptionHistory(loyalty_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.point_redemption_history).where((0, drizzle_orm_1.eq)(schema.point_redemption_history.loyalty_id, loyalty_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getPointRedemptionHistory = getPointRedemptionHistory;
// Gets the transaction object 
// Input: the transaction ID
function getTransaction(transaction_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.transaction).where((0, drizzle_orm_1.eq)(schema.transaction.transaction_id, transaction_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getTransaction = getTransaction;
// Gets the reward object
// Input: the reward ID
function getReward(reward_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.reward).where((0, drizzle_orm_1.eq)(schema.reward.reward_id, reward_id))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getReward = getReward;
// Get all customers has no use case for now...
// Gets all vendors in the database
function getAllVendors() {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.vendor)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getAllVendors = getAllVendors;
// Gets all loyalty cards for a given customer
// Input: the customers customer_id
function getAllLoyaltyCardsOfCustomer(customer_id) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.loyalty_card).where((0, drizzle_orm_1.eq)(schema.loyalty_card.customer_id, customer_id))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getAllLoyaltyCardsOfCustomer = getAllLoyaltyCardsOfCustomer;
// Gets all point redemption history for a given loyalty card
// Input: the loyalty_id of the loyalty card
function getAllPointRedemptionHistoryOfCard(loyalty_id) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.point_redemption_history).where((0, drizzle_orm_1.eq)(schema.point_redemption_history.loyalty_id, loyalty_id))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getAllPointRedemptionHistoryOfCard = getAllPointRedemptionHistoryOfCard;
// Gets all previous transactions for a given loyalty card
// Input: the loyalty_id of the loyalty card
function getAllTransactionsOfCard(loyalty_id) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.transaction).where((0, drizzle_orm_1.eq)(schema.transaction.loyalty_id, loyalty_id))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getAllTransactionsOfCard = getAllTransactionsOfCard;
// Gets all rewards in the program of a given vendor
// Input: the vendor_id of the vendor
function getAllRewardsOfVendor(vendor_id) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbObj_js_1.db.select().from(schema.reward).where((0, drizzle_orm_1.eq)(schema.reward.vendor_id, vendor_id))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getAllRewardsOfVendor = getAllRewardsOfVendor;
