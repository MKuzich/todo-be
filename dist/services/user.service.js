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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var errors_1 = require("../helpers/errors");
var JWT_SECRET = process.env.JWT_SECRET;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.authenticate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = jsonwebtoken_1.default.verify(token, JWT_SECRET).id;
                        if (!id) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, User_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, user.token === token ? user : null];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UserService.prototype.signUp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, checkUser, hashedPassword, user, token, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, password = data.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        checkUser = _a.sent();
                        if (checkUser) {
                            throw (0, errors_1.createError)(409, 'Email already in use.');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, User_1.default.create({ email: email, password: hashedPassword })];
                    case 3:
                        user = _a.sent();
                        token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, { token: token }, { new: true })];
                    case 4:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            throw (0, errors_1.createError)(500, 'Unknown error in creating new user');
                        }
                        return [2 /*return*/, updatedUser.token];
                }
            });
        });
    };
    UserService.prototype.logIn = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, isValid, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, password = data.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(401, 'Email or password is wrong.');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw (0, errors_1.createError)(401, 'Email or password is wrong');
                        }
                        token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, { token: token })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.logOut = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, { token: null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserService.prototype.changePassword = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var oldPassword, newPassword, email, user, isValid, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPassword = data.oldPassword, newPassword = data.newPassword, email = data.email;
                        return [4 /*yield*/, User_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user || user.email !== email) {
                            throw (0, errors_1.createError)(401, 'Email or password is wrong.');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(oldPassword, user.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw (0, errors_1.createError)(401, 'Email or password is wrong');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, { password: hashedPassword })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.service.js.map