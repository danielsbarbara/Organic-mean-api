import { GetCollection } from "./mongoconnect"

//Variaveis de ambiente, está no ficheiro .env
const dbName: string = process.env.DBNAME!
const collectionName: string = process.env.DBCOLLECTION!

//Pegar todos os produtos
// export async function GetAllProducts() {
//     const collection = await GetCollection(dbName, collectionName)
//     const result = await collection.find().toArray()
//     return result
// }

//Pegar os produtos
export async function FilterProducts(category: string, collectionP: Array<string>) {
    const collection = await GetCollection(dbName, collectionName)

    let result
    if(category !== 'All' && collectionP.length > 0){
        result = await collection.find({Category: category, Collection: {$in: collectionP}}).toArray()
        //Pega os produtos que tenham uma categoria e que tenha uma coleção/es selecionadas
    
    } else if(category === 'All' && collectionP.length > 0){
        result = await collection.find({Collection: {$in: collectionP}}).toArray()
        //Pega os produtos em que que a categoria não está selecionada mas tem coleçõa/es selecionadas

    } else if(category !== 'All' && collectionP.length === 0){
        result = collection.find({Category: category}).toArray()
        //Pega os produtos em que a categoria está selecionada mas não tem coleções selecionadas

    } else {
        result = await collection.find().toArray()
        //Caso não tenha nenhum filtro selecionado
    }
    return result
}