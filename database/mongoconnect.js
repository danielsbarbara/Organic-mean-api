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
exports.GetCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DBname = process.env.DBNAME;
const collecName = process.env.DBCOLLECTION;
const url = process.env.DB_URL;
let client;
function GetMongoClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!client) {
                client = new mongodb_1.MongoClient(url);
                yield client.connect();
                console.log('⚡️ DB connected');
            }
        }
        catch (e) {
            console.log(e);
        }
        return client;
    });
}
function GetCollection(dbName = DBname, collectionName = collecName) {
    return __awaiter(this, void 0, void 0, function* () {
        const cli = yield GetMongoClient();
        const db = yield cli.db(dbName);
        return db.collection(collectionName);
    });
}
exports.GetCollection = GetCollection;
