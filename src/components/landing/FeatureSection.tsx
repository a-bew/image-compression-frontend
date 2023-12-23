// FeatureSection.tsx
import React from 'react';
import { FaRegFileImage, FaRulerCombined, FaFileImage, FaCompress } from 'react-icons/fa';
import s from './featuresection.module.scss';


const FeatureSection: React.FC = React.memo(() => {
  return (
    <section className={s["feature-section"]}>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
          <FaRegFileImage />
        </div>
        <h2>Image Format Flexibility</h2>
        {/* Radio buttons for PNG, JPEG, and WebP */}
        <p>Choose the ideal image format for your specific needs, be it high-quality PNG, space-saving JPEG, or efficient WebP.</p>
      </div>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
          <FaRulerCombined />
        </div>
        <h2>Aspect Ratio Control</h2>
        {/* Radio buttons for enabling/disabling aspect ratio */}
        <p>Gain full control over the aspect ratio of your images, ensuring they fit perfectly into your design.</p>
      </div>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
          <FaRulerCombined />
        </div>
        <h2>Custom Dimensions</h2>
        {/* Input elements for width and height */}
        <p>Resize your images effortlessly by specifying custom width and height, or let our tool maintain proportions for you.</p>
      </div>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
          <FaFileImage />
        </div>
        <h2>Quality Optimization</h2>
        {/* Range slider for image quality */}
        <p>Fine-tune image quality to perfection with our lossy or lossless compression options, ensuring an ideal balance of size and visual fidelity.</p>
      </div>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
          <FaCompress />
        </div>
        <h2>Effortless Compression</h2>
        {/* Upload button and display outcome */}
        <p>Experience hassle-free image compression with our easy upload process, and instantly view the outstanding results.</p>
      </div>
      <div className={s["feature"]}>
        <div className={s["feature-icon"]}>
        
      {`🌈`}
          {/* Use React Icons or images for color options */}
        </div>
        <h2>Custom Colorization</h2>
        {/* Radio buttons for color options */}
        <p>Add a unique touch to your images by selecting from a range of custom colorization options, including grayscale and more.</p>
      </div>
    </section>
  );
});

export default FeatureSection;
