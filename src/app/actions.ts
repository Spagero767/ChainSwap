'use server';

import { findOptimalRoute, type FindOptimalRouteInput, type FindOptimalRouteOutput } from '@/ai/flows/intelligent-route-finder';
import { z } from 'zod';
import { CHAINS, TOKENS } from '@/lib/constants';

const formSchema = z.object({
  fromChain: z.string().min(1, 'From chain is required'),
  fromToken: z.string().min(1, 'From token is required'),
  toChain: z.string().min(1, 'To chain is required'),
  toToken: z.string().min(1, 'To token is required'),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
});

type FormState = {
  message: string;
  data?: FindOptimalRouteOutput;
  errors?: {
    fromChain?: string[];
    fromToken?: string[];
    toChain?: string[];
    toToken?: string[];
    amount?: string[];
    _form?: string[];
  }
}

export async function getOptimalRoute(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const fromTokenObj = TOKENS.find(t => t.id === validatedFields.data.fromToken);
  const toTokenObj = TOKENS.find(t => t.id === validatedFields.data.toToken);
  const fromChainObj = CHAINS.find(c => c.id === validatedFields.data.fromChain);
  const toChainObj = CHAINS.find(c => c.id === validatedFields.data.toChain);

  if (!fromTokenObj || !toTokenObj || !fromChainObj || !toChainObj) {
    return { message: "Invalid token or chain selection." };
  }

  const aiInput: FindOptimalRouteInput = {
    fromChain: fromChainObj.name,
    fromToken: fromTokenObj.symbol,
    toChain: toChainObj.name,
    toToken: toTokenObj.symbol,
    amount: validatedFields.data.amount,
  };

  try {
    const result = await findOptimalRoute(aiInput);
    if (!result || !result.route || result.route.length === 0) {
      return { message: "AI could not find a route. Please try different tokens or amounts." };
    }
    return { message: "Success", data: result };
  } catch (e) {
    console.error(e);
    return { message: "An unexpected error occurred while finding the route." };
  }
}
