import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            ChainSwap
          </h1>
        </div>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
