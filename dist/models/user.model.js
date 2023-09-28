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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var validator_1 = require("validator");
var jsonwebtoken_1 = require("jsonwebtoken");
var userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
});
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isPassOK, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validator_1.default.isEmail(email)) {
                        throw new Error("Not a valid email");
                    }
                    if (!validator_1.default.isStrongPassword(password)) {
                        throw new Error("Please enter a strong password");
                    }
                    return [4 /*yield*/, this.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User does not exist.");
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(user.password, password)];
                case 2:
                    isPassOK = _a.sent();
                    if (isPassOK) {
                        token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || "lakshayauth");
                        return [2 /*return*/, { token: token, email: email, name: user.name }];
                    }
                    throw new Error("Password not correct");
            }
        });
    });
};
userSchema.statics.signup = function (name, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var emailExists, salt, hashedPassword, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!name) {
                        throw new Error("Please enter a name.");
                    }
                    if (!validator_1.default.isEmail(email)) {
                        throw new Error("Please enter a valid email.");
                    }
                    if (!validator_1.default.isStrongPassword(password)) {
                        throw new Error("Please enter a strong password.");
                    }
                    return [4 /*yield*/, this.findOne({ email: email })];
                case 1:
                    emailExists = _a.sent();
                    if (emailExists) {
                        throw new Error("User already exists. Please login");
                    }
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, this.create({ name: name, email: email, hashedPassword: hashedPassword })];
                case 4:
                    user = _a.sent();
                    token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || "lakshayauth");
                    return [2 /*return*/, { name: name, email: email, token: token }];
            }
        });
    });
};
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
