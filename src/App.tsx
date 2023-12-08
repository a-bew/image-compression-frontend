import React, { useRef, useState } from 'react'
import Navbar from './components/compressimage/Navbar'
import CompressImage from './CompressImage'
import FeatureConfigSection from './components/configfeatures/FeatureConfigSectionProps'
import AboutSection from './components/landing/AboutSection'
import FeatureSection from './components/landing/FeatureSection'
import IntroSection from './components/landing/IntroSection'

// IntroSection.tsx

const App = () => {

  //Create a ref for the target div
  const targetDivRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the target div
  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: 'smooth', // Add smooth scrolling effect
        block: 'start',    // Scroll to the top of the div
      });
    }
  };

  return (
    <div>
      <Navbar title = "Image Compression App" />
      <IntroSection scrollToDiv={scrollToDiv} />
      <FeatureSection />
      <CompressImage targetDivRef={targetDivRef} />
      <AboutSection/>
    </div>
  )
}


export default App