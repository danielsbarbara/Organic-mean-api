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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProducts = void 0;
const mongoconnect_1 = require("./mongoconnect");
//Variaveis de ambiente, está no ficheiro .env
const dbName = process.env.DBNAME;
const collectionName = process.env.DBCOLLECTION;
function FilterProducts(category, collectionP) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield (0, mongoconnect_1.GetCollection)(dbName, collectionName);
        let result;
        if (category !== 'All' && collectionP.length > 0) {
            result = yield collection.find({ category: category, collection: { $in: collectionP } }).toArray();
            //Pega os produtos que tenham uma categoria e que tenha uma coleção/es selecionadas
        }
        else if (category === 'All' && collectionP.length > 0) {
            result = yield collection.find({ collection: { $in: collectionP } }).toArray();
            //Pega os produtos em que que a categoria não está selecionada mas tem coleçõa/es selecionadas
        }
        else if (category !== 'All' && collectionP.length === 0) {
            result = collection.find({ category: category }).toArray();
            //Pega os produtos em que a categoria está selecionada mas não tem coleções selecionadas
        }
        else {
            result = yield collection.find().toArray();
            //Caso não tenha nenhum filtro selecionado
        }
        return result;
    });
}
exports.FilterProducts = FilterProducts;
