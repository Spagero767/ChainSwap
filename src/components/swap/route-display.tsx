import type { FindOptimalRouteOutput } from "@/ai/flows/intelligent-route-finder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Fuel } from "lucide-react";

type RouteDisplayProps = {
  routeData: FindOptimalRouteOutput;
};

export default function RouteDisplay({ routeData }: RouteDisplayProps) {
    const fromToken = routeData.route[0]?.fromToken;
    const toToken = routeData.route[routeData.route.length - 1]?.toToken;
    const fromAmount = routeData.route[0]?.amount;
    const exchangeRate = fromAmount > 0 ? routeData.estimatedOutput / fromAmount : 0;

  return (
    <div className="space-y-4 text-sm animate-in fade-in duration-500">
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Exchange Rate</span>
        <span className="font-mono text-foreground">1 {fromToken} ≈ {exchangeRate.toFixed(6)} {toToken}</span>
      </div>
      <div className="flex justify-between items-center text-muted-foreground">
        <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>Total Gas Fee</span>
        </div>
        <span className="font-mono text-foreground">${routeData.totalEstimatedGas.toFixed(2)}</span>
      </div>
      
      <Card className="bg-background/50">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Intelligent Route</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          {routeData.route.map((step, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{step.exchange}</div>
                <div className="text-xs text-muted-foreground">Gas: ${step.estimatedGas.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{step.fromToken}</span>
                <ArrowRight className="h-4 w-4" />
                <span>{step.toToken}</span>
              </div>
              {index < routeData.route.length - 1 && <Separator className="mt-2"/>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
