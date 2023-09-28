"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var userRouter = express_1.default.Router();
userRouter.post("/login", user_controller_1.login);
userRouter.post("/signup", user_controller_1.signup);
exports.default = userRouter;
