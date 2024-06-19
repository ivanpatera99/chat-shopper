import { MongoClient, ServerApiVersion } from 'mongodb';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI ?? '', {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
    },
  });

export const getResultByKeywords = async (keywords: string) => {
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
export const getResultByCategories = async (categories: string[]) => {
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
export const getResultByCategoryIds = async (categoryIds: string[]) => {
    const collection = await client.db('shopper').collection('products')

    return collection.find({ category: { $in: categoryIds } }).limit(4).toArray();
}