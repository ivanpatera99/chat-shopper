import { MongoClient } from 'mongodb';


export const getResultByKeywords = async (keywords: string, client: MongoClient) => {
    const collection = await client.db('shopper').collection('products')
    return collection.aggregate([
        {
          $search: {
            index: "name",
            text: {
              query: keywords,
              path: ["name", "category"],
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0,
                maxExpansions: 50
              }
            }
          }
        }
      ]).limit(7).toArray(); 
}
export const getResultByCategories = async (categories: string[], client: MongoClient) => {
    const collection = await client.db('shopper').collection('products')
    return collection.aggregate([
        {
          $search: {
            index: "name",
            text: {
              query: categories.join(" "),
              path: ["name", "category"],
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0,
                maxExpansions: 50
              }
            }
          }
        }
      ]).limit(7).toArray();
}
export const getResultByCategoryIds = async (categoryIds: string[], client: MongoClient) => {
    const collection = await client.db('shopper').collection('products')

    return collection.find({ category: { $in: categoryIds } }).limit(4).toArray();
}