import React, { useRef } from 'react'
import Navbar from './components/compressimage/Navbar'
import CompressImage from './CompressImage'
import AboutSection from './components/landing/AboutSection'
import FeatureSection from './components/landing/FeatureSection'
import IntroSection from './components/landing/IntroSection'
import { VITE_APP_DEBUG } from './api/secrets'
import SideNotification from './components/sidenotification/SideNotification'
import useNotification from './hooks/useNotification'

if (!VITE_APP_DEBUG) {
  console.log = () => { };
  console.info = () => { };
  console.warn = () => { };
  console.error = () => { };
  console.debug = () => { };
}

// IntroSection.tsx

const App = () => {
  const { notifications, onClose } = useNotification();

  //Create a ref for the target div
  const targetDivRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the target div
  const scrollToDiv = () => {
    if (targetDivRef.current) {
      const pos = targetDivRef.current.style.position;
      const top = targetDivRef.current.style.top;
      targetDivRef.current.style.position = "relative";
      targetDivRef.current.style.top = '-60px';
      targetDivRef.current.scrollIntoView({
        behavior: 'smooth', // Add smooth scrolling effect
        block: 'start',    // Scroll to the top of the div
      });
      targetDivRef.current.style.top = top;
      targetDivRef.current.style.position = pos;
    }
  };

  return (
    <div>
      {notifications.map((notification) => (
        <SideNotification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          position={notification.position}
          urgency={notification.urgency}
          onClose={()=>onClose(notification.id)}
        />
      ))}
      <Navbar title = " Image At A TIme" />
      <IntroSection scrollToDiv={scrollToDiv} />
      <FeatureSection />
      <CompressImage targetDivRef={targetDivRef} />
      <AboutSection/>
    </div>
  )
}


export default App