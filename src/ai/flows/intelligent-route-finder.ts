'use server';

/**
 * @fileOverview An AI agent for finding the most efficient and cost-effective routes for cross-chain swaps.
 *
 * - findOptimalRoute - A function that handles the route finding process.
 * - FindOptimalRouteInput - The input type for the findOptimalRoute function.
 * - FindOptimalRouteOutput - The return type for the findOptimalRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindOptimalRouteInputSchema = z.object({
  fromChain: z.string().describe('The blockchain network to swap from.'),
  fromToken: z.string().describe('The token to swap from.'),
  toChain: z.string().describe('The blockchain network to swap to.'),
  toToken: z.string().describe('The token to swap to.'),
  amount: z.number().describe('The amount of the fromToken to swap.'),
});
export type FindOptimalRouteInput = z.infer<typeof FindOptimalRouteInputSchema>;

const FindOptimalRouteOutputSchema = z.object({
  route: z.array(
    z.object({
      exchange: z.string().describe('The DEX to use for this step.'),
      fromToken: z.string().describe('The token to swap from in this step.'),
      toToken: z.string().describe('The token to swap to in this step.'),
      amount: z.number().describe('The amount of the fromToken to swap in this step.'),
      estimatedGas: z.number().describe('The estimated gas fee for this step.'),
    })
  ).describe('The optimal route for the cross-chain swap.'),
  totalEstimatedGas: z.number().describe('The total estimated gas fee for the entire swap.'),
  estimatedOutput: z.number().describe('The estimated output amount of the toToken.'),
});
export type FindOptimalRouteOutput = z.infer<typeof FindOptimalRouteOutputSchema>;

export async function findOptimalRoute(input: FindOptimalRouteInput): Promise<FindOptimalRouteOutput> {
  return findOptimalRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findOptimalRoutePrompt',
  input: {schema: FindOptimalRouteInputSchema},
  output: {schema: FindOptimalRouteOutputSchema},
  prompt: `You are an AI assistant designed to find the most efficient and cost-effective routes for cross-chain token swaps.

  Given the following information, analyze real-time network conditions, token liquidity across various DEXs, and gas fees to suggest the optimal route for the swap.

  From Chain: {{{fromChain}}}
  From Token: {{{fromToken}}}
  To Chain: {{{toChain}}}
  To Token: {{{toToken}}}
  Amount: {{{amount}}}

  Consider factors such as transaction costs, slippage, and network congestion.

  Provide the optimal route for the cross-chain swap, including the DEX to use for each step, the tokens to swap, the amount to swap, and the estimated gas fees.
  Also provide the total estimated gas fee for the entire swap and the estimated output amount of the toToken.

  Ensure that the suggested route minimizes transaction costs and slippage for the user.
  `,
});

const findOptimalRouteFlow = ai.defineFlow(
  {
    name: 'findOptimalRouteFlow',
    inputSchema: FindOptimalRouteInputSchema,
    outputSchema: FindOptimalRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
