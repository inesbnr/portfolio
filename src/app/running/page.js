// app/Running/page.js
"use client";

import Link from "next/link";
import styles from "../project.module.css";
import { useEffect, useRef, useState } from "react";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimation } from 'framer-motion';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';

// Dynamically load the Three.js scene to avoid SSR issues
const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

export default function Running() {
  
  const [hovered, setHovered] = useState(false); // State to track hover

  const { scrollYProgress } = useScroll(); // This gives the scroll progress
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]); // Controls how much the image moves based on scroll

  
  const [scrollPos, setScrollPos] = useState(0);
  const controls = useAnimation(); // Animation control

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to trigger animation based on scroll position
  useEffect(() => {
    // Adjust this range for when you want the animation to trigger based on scroll
    if (scrollPos > 100) {
      controls.start({ x: (scrollPos-150)/10, opacity: 1 }); // Move the element to original position and set opacity to 1
    } else {
      controls.start({ x: -100, opacity: 0 }); // Move the element off-screen to the left and make it transparent
    }
  }, [scrollPos, controls]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  // Handle window resize for large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setDropdownVisible(false); // Hide dropdown if screen is larger than 768px
      }
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <div>
      {/* Navbar */}
      <header className={styles.navbar}>
        {/* Hamburger Menu for Small Screens */}
        <div className={styles.hamburger} onClick={toggleDropdown}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Items (Desktop) */}
        <ul className={styles.navItems}>
          <li><a href="/" >Home</a></li>
          <li><a href="/#aboutme">About Me</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#skills">Skills</a></li>
        </ul>

        {/* Contact Button */}
        <a href="/#contact" onClick={toggleDropdown} className={styles.contactButton}>GET IN TOUCH</a>

        {/* Dropdown Menu (Mobile) */}
        <div className={`${styles.dropdown} ${dropdownVisible ? styles.active : ''}`}>
          <a href="/" onClick={toggleDropdown}>Home</a>
          <a href="/#aboutme" onClick={toggleDropdown}>About Me</a>
          <a href="/#projects" onClick={toggleDropdown}>Projects</a>
          <a href="/#skills" onClick={toggleDropdown}>Skills</a>
        </div>
      </header>
    </div>

      <main className={styles.mainContent}>
        {/* Welcome Section */}
        <section className={styles.welcomeSectionProject}>
          <div className={styles.imageContainer}>
            <div className={styles.textOverlay}>
              <h1 className={styles.mainTitleProject}> </h1>
              <h2 className={styles.subTitleProject}> </h2>
            </div>
            <img
              src="./running_welcome.png"
              alt="Illustration of Leather Bottle Holder"
              className={styles.illustrationProject}
            />
          </div>
        </section>

        {/* Overview Section */}
        <section className={styles.section}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedOverview}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
       OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW
      </motion.h1>
          <h2 className={styles.aboutProject}>ABOUT OKSI & Smart Socks /</h2>
         
            {/* Text Container */}
            <div className={styles.overviewText}>
            <p>
  My innovation project features a <span className={styles.customFontbig}>bracelet</span> and <span className={styles.customFontbig}>socks</span> designed to enhance <span className={styles.customFontcolor}>running performance</span> while reducing the risk of <span className={styles.customFontcolor}>injury</span>. They aim to coach and improve <span className={styles.customFont}>biomechanical efficiency</span> and boost <span className={styles.customFont}>cardiovascular endurance</span> for a safer, more effective running experience.
</p>

            </div>

            <h2 className={styles.aboutProjectSmall}>My vision /</h2>
         
         {/* Text Container */}
         <div className={styles.overviewText}>
           <p>
           <span className={styles.customFontbigcolor}> Design new ways for people to interact with
           their own biosignals for health and performance improvements in sports</span>

           </p>
         </div>

            
     
        

        {/* Team Section */}
        
          <h2 className={styles.aboutProjectSmall}>Inspirations /</h2>
          <div className={styles.textAndImageContainer}>
          <div className={styles.imageContainer}>
             <img src="/passion.png" alt="DevinciRace" className={styles.smallImage} />
    
          </div>
          <div className={styles.overviewText}>
            <p>
            I'm passionate about both <span className={styles.customFontbig}>engineering</span> and <span className={styles.customFontbig}>running</span>, which inspired me to combine the two. <span className={styles.customFontcolor}>Running</span> offers many benefits, such as better <span className={styles.customFontcolor}>cardiovascular</span> and <span className={styles.customFontcolor}>mental health</span>, as well as the chance to <span className={styles.customFont}>set goals</span> and <span className={styles.customFont}>challenge yourself</span>. After experiencing an <span className={styles.customFontcolor}>injury</span> and learning that <span className={styles.customFontcolor}> 68.3% of runners </span> face similar issues, I wanted to create a solution to help <span className={styles.customFont}>prevent and manage injuries</span> while still enjoying all the <span className={styles.customFont}> benefits of running</span>.
            </p>
          </div>
          </div>


          </section>

          <section id="section3D" className={styles.section3D}>
          <ThreeScene/>
          </section>

          

          {/* Overview Section */}
        <section className={styles.section}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedProcess}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
 SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS
      </motion.h1>
         
          <h2 className={styles.moreProject}>Our Goal /</h2>
          <h2 className={styles.moreProjectSmall}>Target Users and Needs</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            
            </div>
            {/* Image Container */}
            <div className={styles.imageContainerDouble}>
              <img src="/targetusers.png" alt="Targetusers" className={styles.longImageSocks} />
              <img src="/userneeds.png" alt="Targetusers" className={styles.longImageSocks} />
        
          </div>
          <h2 className={styles.moreProject}>Prototyping Process /</h2>
          <h2 className={styles.moreProjectSmall}>EMG and pressure textile sensors</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            <p>
  The <span className={styles.customFontbig}>EMG sensor</span> detects muscle activity in the <span className={styles.customFontcolor2}>tibialis anterior</span> muscle. Three fabric electrodes are sewn into the socks to measure this activity.
</p>
<p>
  The <span className={styles.customFontbig}>pressure sensor</span> detects the pressure and impacts under the foot while running. This data helps analyze factors like <span className={styles.customFontcolor2}>balance</span>, <span className={styles.customFontcolor2}>stride</span>, and <span className={styles.customFontcolor2}>cadence</span>.
</p>

            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_proto.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
          <h2 className={styles.moreProjectSmall}>UX/UI interface prototypes</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            <p>
  The  <span className={styles.customFontbig}>Smart Socks App </span>displays detailed analytics, such as 
  <span className={styles.customFontcolor2}> distance</span>, 
  <span className={styles.customFontcolor2}> speed</span>, and 
  <span className={styles.customFontcolor2}> foot pressure</span>. The user can track their progress and adjust their 
  <span className={styles.customFontcolor2}> training routine</span>.
  Users can export their performance and health data as  
  <span className={styles.customFontcolor2}> reports</span>, making it easy to share with healthcare professionals.
</p>
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_uiux.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
          <h2 className={styles.moreProjectSmall}>System overview</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>

            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_system.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
          <motion.h1
        className={`${styles.separator} ${styles.outlinedProcess}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
       OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET
      </motion.h1>

         
          <h2 className={styles.moreProject2}>Our Goal /</h2>
          <h2 className={styles.moreProjectSmall2}>Target Users and Needs</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            
            </div>
            {/* Image Container */}
            <div className={styles.imageContainerDouble}>
              <img src="/bracelet_users.png" alt="Targetusers" className={styles.longImageSocks} />
              <img src="/bracelet_needs.png" alt="Targetusers" className={styles.longImageSocks} />
        
          </div>
          <h2 className={styles.moreProject2}>Prototyping Process /</h2>
          <h2 className={styles.moreProjectSmall2}>First prototypes</h2>
            {/* Text Container */}
            <div className={styles.paragraphText2}>
            <p>
  The <span className={styles.customFontbig}>OKSI bracelet</span> provides <span className={styles.customFontcolor3}>real-time feedback</span> while running through 
  <span className={styles.customFontcolor3}>LEDs</span> and <span className={styles.customFontcolor3}>vibrations</span>. 
  It calculates the heartbeat rhythm (BPM) and cadence (SPM). Based on these two values, 
  OKSI creates <span className={styles.customFontcolor3}>animations</span> to help runners adjust their 
  <span className={styles.customFont2}> heartbeat rhythm</span> and <span className={styles.customFont2}>cadence</span>.
</p>

            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/bracelet_proto.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
        
        

          </section>


        {/* Contact Section */}
        
        <section className={styles.contactSection}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedContact}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
       CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME
      </motion.h1>
          <div className={styles.contactContainer}>
            <div className={styles.formContainer}>
              <h2>GET IN TOUCH</h2>
              <form className={styles.contactForm}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Please enter your email" required />

                <label htmlFor="mobile">Mobile</label>
                <input type="tel" id="mobile" placeholder="Enter your mobile" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Enter your message" required></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>
            <div className={styles.mapContainer}>
              <h2>MY LOCATION</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.992237531098!2d2.2364918!3d48.8964851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e665002d2c6665%3A0x9595552cb384bd7!2sP%C3%B4le%20L%C3%A9onard%20de%20Vinci!5e0!3m2!1sfr!2sfr!4v1732619774799!5m2!1sfr!2sfr"
                width="400"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="My location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
  <div className={styles.footerContent}>
    <img src="ineslogocontourportfolio.png" alt="Ines Logo" className={styles.logo} />
    <a href="https://www.linkedin.com/in/ines-beaunoir/" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
      <img src="linkedIn.png" alt="LinkedIn" className={styles.linkedinLogo} />
    </a>
  </div>
</footer>
    </div>
  );
}
