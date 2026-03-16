// src/app/page.tsx

import FounderStory from "../components/FounderStory";
import WhyUs from "../components/FounderStory";
import Services from "../components/Services";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <FounderStory />
      <Services />
      <FAQ />
    </>
  );
}
