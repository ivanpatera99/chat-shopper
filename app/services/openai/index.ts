import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';


/**
 * Analyzes the provided prompt to generate a JSON object with category IDs, category names, and extracted product data.
 * @param prompt The prompt to analyze.
 * @returns An object containing category IDs, category names, and extracted product data.
 */
export const promptInterpretation = async (prompt: string) => {
    const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        prompt: `
        Act as a shopping agent, based on this map of categories and subcategories:
[
{
"category_id": "FA",
"category_name": "Fashion and Apparel",
"subcategories": [
{"subcategory_id": "FA-MC", "subcategory_name": "Men Clothing"},
{"subcategory_id": "FA-WC", "subcategory_name": "Women Clothing"},
{"subcategory_id": "FA-CC", "subcategory_name": "Children Clothing"},
{"subcategory_id": "FA-AC", "subcategory_name": "Accessories"},
{"subcategory_id": "FA-SH", "subcategory_name": "Shoes"}
]
},
{
"category_id": "ELC",
"category_name": "Electronics",
"subcategories": [
{"subcategory_id": "ELC-MD", "subcategory_name": "Mobile Devices"},
{"subcategory_id": "ELC-CO", "subcategory_name": "Computers"},
{"subcategory_id": "ELC-AV", "subcategory_name": "Audio and Video"},
{"subcategory_id": "ELC-PE", "subcategory_name": "Photography Equipment"}
]
},
{
"category_id": "BH",
"category_name": "Beauty and Health",
"subcategories": [
{"subcategory_id": "BH-SK", "subcategory_name": "Skincare"},
{"subcategory_id": "BH-MU", "subcategory_name": "Makeup"},
{"subcategory_id": "BH-HC", "subcategory_name": "Haircare"},
{"subcategory_id": "BH-WS", "subcategory_name": "Wellness and Supplements"},
{"subcategory_id": "BH-PCA", "subcategory_name": "Personal Care Appliances"}
]
},
{
"category_id": "HL",
"category_name": "Home and Living",
"subcategories": [
{"subcategory_id": "HL-FU", "subcategory_name": "Furniture"},
{"subcategory_id": "HL-HD", "subcategory_name": "Home Decor"},
{"subcategory_id": "HL-KW", "subcategory_name": "Kitchenware"},
{"subcategory_id": "HL-BB", "subcategory_name": "Bedding and Bath"},
{"subcategory_id": "HL-GO", "subcategory_name": "Garden and Outdoor"}
]
},
{
"category_id": "TH",
"category_name": "Tools and Hardware",
"subcategories": [
{"subcategory_id": "TH-HT", "subcategory_name": "Hand Tools"},
{"subcategory_id": "TH-PT", "subcategory_name": "Power Tools"},
{"subcategory_id": "TH-ES", "subcategory_name": "Electrical Supplies"},
{"subcategory_id": "TH-PS", "subcategory_name": "Plumbing Supplies"},
{"subcategory_id": "TH-WW", "subcategory_name": "Workwear"}
]
},
{
"category_id": "GR",
"category_name": "Groceries",
"subcategories": [
{"subcategory_id": "GR-FF", "subcategory_name": "Fresh Food"},
{"subcategory_id": "GR-PS", "subcategory_name": "Pantry Staples"},
{"subcategory_id": "GR-BE", "subcategory_name": "Beverages"},
{"subcategory_id": "GR-SN", "subcategory_name": "Snacks"},
{"subcategory_id": "GR-FZ", "subcategory_name": "Frozen Foods"}
]
},
{
"category_id": "SO",
"category_name": "Sports and Outdoors",
"subcategories": [
{"subcategory_id": "SO-EE", "subcategory_name": "Exercise Equipment"},
{"subcategory_id": "SO-OG", "subcategory_name": "Outdoor Gear"},
{"subcategory_id": "SO-SA", "subcategory_name": "Sports Apparel"},
{"subcategory_id": "SO-FW", "subcategory_name": "Footwear"},
{"subcategory_id": "SO-BA", "subcategory_name": "Bikes and Accessories"}
]
},
{
"category_id": "TG",
"category_name": "Toys and Games",
"subcategories": [
{"subcategory_id": "TG-BGP", "subcategory_name": "Board Games and Puzzles"},
{"subcategory_id": "TG-DAF", "subcategory_name": "Dolls and Action Figures"},
{"subcategory_id": "TG-ET", "subcategory_name": "Educational Toys"},
{"subcategory_id": "TG-VGC", "subcategory_name": "Video Games and Consoles"}
]
},
{
"category_id": "BS",
"category_name": "Books and Stationery",
"subcategories": [
{"subcategory_id": "BS-BO", "subcategory_name": "Books"},
{"subcategory_id": "BS-OS", "subcategory_name": "Office Supplies"},
{"subcategory_id": "BS-AS", "subcategory_name": "Art Supplies"}
]
},
{
"category_id": "EL",
"category_name": "Entertainment and Lifestyle",
"subcategories": [
{"subcategory_id": "EL-MM", "subcategory_name": "Movies and Music"},
{"subcategory_id": "EL-CM", "subcategory_name": "Collectibles and Memorabilia"},
{"subcategory_id": "EL-CS", "subcategory_name": "Craft Supplies"},
{"subcategory_id": "EL-PS", "subcategory_name": "Pet Supplies"}
]
}
]
Analyze the provided prompt to generate a json with the following keys:
'agent_response' should be a string with the response from the agent, 
'category_ids' should be an array of strings with subcategory ids, 
'categories' the names of selected ids and 
'keywords' should be a string with extracted PRODUCT DATA.
Prompt: ${prompt}
        `,
    });
    // Parse openai category_ids, categories and keywords
    const json = JSON.parse(text);
    return { ...json}
}