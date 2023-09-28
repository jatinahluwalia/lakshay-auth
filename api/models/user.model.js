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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!validator_1.default.isEmail(email)) {
            throw new Error("Not a valid email");
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw new Error("Please enter a strong password");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error("User does not exist.");
        }
        const isPassOK = yield bcrypt_1.default.compare(user.password, password);
        if (isPassOK) {
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || "lakshayauth");
            return { token, email, name: user.name };
        }
        throw new Error("Password not correct");
    });
};
userSchema.statics.signup = function (name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name) {
            throw new Error("Please enter a name.");
        }
        if (!validator_1.default.isEmail(email)) {
            throw new Error("Please enter a valid email.");
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw new Error("Please enter a strong password.");
        }
        const emailExists = yield this.find({ email });
        if (emailExists) {
            throw new Error("User already exists. Please login");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield this.create({ name, email, hashedPassword });
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || "lakshayauth");
        return { name, email, token };
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
