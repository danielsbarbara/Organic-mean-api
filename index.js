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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const crud_1 = require("./database/crud");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
const port = process.env.PORT;
app.post('/api/v1/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, collection } = req.body;
    try {
        const result = yield (0, crud_1.FilterProducts)(category, collection);
        res.status(200).json({ result: result });
    }
    catch (error) {
        res.status(400).json({ result: 'Error' });
    }
}));
app.listen(port, () => console.log(`⚡️ Connected on http://localhost:${port} ⚡️`));
