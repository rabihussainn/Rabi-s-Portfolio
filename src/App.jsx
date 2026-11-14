import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Journey from './components/Journey';
import AiSection from './components/AiSection';
import About from './components/About';
import Stack from './components/Stack';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <Journey />
        <AiSection />
        <About />
        <Stack />
        <Contact />
      </main>
      <CommandPalette />
    </>
  );
}
