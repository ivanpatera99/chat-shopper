'use server';
export const maxDuration = 60;

import { createStreamableUI, streamUI } from 'ai/rsc';
import { promptInterpretation } from './services/openai';
import { getResultByCategoryIds, getResultByCategories, getResultByKeywords } from './services/mongo';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import ProductCard from './components/productCard';
import { generateText } from 'ai';

const LoadingComponent = (props: {s: string}) => (
  <div className="animate-pulse p-4">{props.s}</div>
);

export async function streamComponent(prompt: string): Promise<any> {
  const stream = createStreamableUI(<LoadingComponent s="Looking into your request..." />);
  const { agent_response, category_ids, categories, keywords} = await promptInterpretation(prompt);
  console.log("agent_response", agent_response);
  stream.update(<h1>{agent_response}</h1>);

  const [resultByKeywords, resultByCategories, resultByCategoryIds] = await Promise.all([
    getResultByKeywords(keywords),
    getResultByCategories(categories),
    getResultByCategoryIds(category_ids),
  ])

    const products = [...resultByKeywords, ...resultByCategories, ...resultByCategoryIds];

    const productIdTracker = new Set();
    const uiPromises = products.map((p) => {
        if (productIdTracker.has(p._id.toString())) return;
        productIdTracker.add(p._id.toString());
        return generateText({
            model: openai('gpt-3.5-turbo'),
            system: 'You are a shopping assistant.',
            prompt: `
            Based on the original prompt: ${prompt}, 
            check if the product is a good recomendation for the user: ${p.name} with price: ${p.price}
            `,
            tools: {
                evaluation: {
                    description: 'Check if the product is a good recomendation for the user, give a brief product description',
                    parameters: z.object({
                        isGoodRecommendation: z.boolean(),
                        productName: z.string(),
                        productPrice: z.number(),
                        productDescription: z.string()
                    }),
                    execute: async ({ isGoodRecommendation, productName, productPrice, productDescription }) => {
                        console.log(`is ${productName} a good recommendation: `, isGoodRecommendation)
                        if (isGoodRecommendation) {
                            stream.append(<div>
                                <ProductCard name={productName} price={productPrice} description=''/>
                                <p>{productDescription}</p>
                            </div>);
                        }
                        return;
                    }
                }
            }
        })
    })
    await Promise.all(uiPromises);
    stream.done()
    return stream.value;
}