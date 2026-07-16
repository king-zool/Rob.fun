import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Trending() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Trending Tokens</h1>
          <p className="text-muted-foreground mb-8">Coming soon...</p>
          <Button onClick={() => setLocation('/explore')}>Explore Tokens</Button>
        </div>
      </div>
    </Layout>
  );
}
