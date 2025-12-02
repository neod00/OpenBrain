import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Portfolio from '@/components/Portfolio';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="bg-deep-black min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Portfolio />
      <CTA />
    </main>
  );
}
