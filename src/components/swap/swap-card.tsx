"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { getOptimalRoute } from "@/app/actions";
import { CHAINS, TOKENS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import RouteDisplay from "./route-display";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full transition-all" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding Best Route...
        </>
      ) : (
        "Swap"
      )}
    </Button>
  );
}

export default function SwapCard() {
  const [state, formAction] = useFormState(getOptimalRoute, initialState);
  const { toast } = useToast();

  const [fromChain, setFromChain] = useState(CHAINS[0].id);
  const [toChain, setToChain] = useState(CHAINS[1].id);

  const fromTokens = useMemo(() => TOKENS.filter(t => t.chain === fromChain), [fromChain]);
  const toTokens = useMemo(() => TOKENS.filter(t => t.chain === toChain), [toChain]);

  const [fromToken, setFromToken] = useState(fromTokens[0]?.id);
  const [toToken, setToToken] = useState(toTokens[0]?.id);

  useEffect(() => {
    setFromToken(fromTokens[0]?.id);
  }, [fromChain, fromTokens]);
  
  useEffect(() => {
    setToToken(toTokens[0]?.id);
  }, [toChain, toTokens]);

  useEffect(() => {
    if (state.message && state.message !== "Success") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);
  
  const handleSwitch = () => {
    const tempChain = fromChain;
    setFromChain(toChain);
    setToChain(tempChain);
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm border-border/60">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Cross-Chain Swap
        </CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <Label htmlFor="fromAmount" className="text-muted-foreground">From</Label>
            <div className="flex gap-2">
              <Select name="fromChain" value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Chain" />
                </SelectTrigger>
                <SelectContent>
                  {CHAINS.map(chain => (
                    <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="fromToken" value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {fromTokens.map(token => (
                    <SelectItem key={token.id} value={token.id}>{token.symbol}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input id="fromAmount" name="amount" placeholder="0.0" type="number" step="any" className="text-2xl h-14" required />
          </div>

          <div className="flex justify-center -my-3 z-10">
            <Button type="button" variant="outline" size="icon" className="rounded-full bg-card hover:bg-background" onClick={handleSwitch}>
                <ArrowRightLeft className="h-4 w-4 text-primary" />
            </Button>
          </div>

          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <Label htmlFor="toAmount" className="text-muted-foreground">To (estimated)</Label>
            <div className="flex gap-2">
              <Select name="toChain" value={toChain} onValueChange={setToChain}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Chain" />
                </SelectTrigger>
                <SelectContent>
                  {CHAINS.map(chain => (
                    <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <Select name="toToken" value={toToken} onValueChange={setToToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {toTokens.map(token => (
                    <SelectItem key={token.id} value={token.id}>{token.symbol}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input id="toAmount" value={state.data?.estimatedOutput?.toFixed(6) || ""} placeholder="0.0" disabled className="text-2xl h-14 bg-muted/30" />
          </div>

          {state.data && <RouteDisplay routeData={state.data} />}

        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
