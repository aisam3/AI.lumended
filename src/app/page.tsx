// src/app/page.tsx
import Hero from "./components/Hero";
import SuccessStory from "./components/SuccessStory";
import Revenue from "./components/Revenue";
import CTA from "./components/CTA";
import FounderStory from "./components/FounderStory";

export default function Home() {
  return (
    <>
      <Hero/>
      <Revenue />
      <SuccessStory />
      <FounderStory />
      <CTA />
    </>
  );
}

