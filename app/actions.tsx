'use server';

import { createStreamableUI } from 'ai/rsc';
import { promptInterpretation } from './services/openai';
import { getResultByCategoryIds, getResultByCategories, getResultByKeywords } from './services/mongo';

const LoadingComponent = (props: {s: string}) => (
  <div className="animate-pulse p-4">{props.s}</div>
);

const getProducts = async (prompt: string) => {
    return "data ok"
};

interface ProductProps {
  name: string;
  price: number;
}

export async function streamComponent(prompt: string): Promise<any> {
  const stream = createStreamableUI(<LoadingComponent s="Looking into your request..." />);
  const { agent_response, category_ids, categories, keywords} = await promptInterpretation(prompt);
  console.log("agent_response", agent_response);  
  stream.update(<LoadingComponent s="Getting products..." />);
  stream.update(<h1>{agent_response}</h1>);

  const [resultByKeywords, resultByCategories, resultByCategoryIds] = await Promise.all([
    getResultByKeywords(keywords),
    getResultByCategories(categories),
    getResultByCategoryIds(category_ids),
  ])

    const products = [...resultByKeywords, ...resultByCategories, ...resultByCategoryIds];
    const productIdTracker = new Set();
    products.forEach((p) => {
        console.log(p._id.toString())
        console.log(productIdTracker.has(p._id.toString()))
        if (productIdTracker.has(p._id.toString())) return;
        productIdTracker.add(p._id.toString());
        stream.append(
            <div className="flex flex-row bg-white rounded-lg shadow-lg p-4">
                <div className="w-32 h-32 bg-black"></div>
                <div className="mt-4">
                    <p className="text-black text-xl font-bold">{p.name}</p>
                    <p className="text-gray-500">${p.price}</p>
                </div>
            </div>
        );
    })

    stream.done();
    return stream.value;

}