// app/Running/page.js
"use client";

import Link from "next/link";
import styles from "../project.module.css";
import { useEffect, useRef, useState } from "react";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
// pages/index.js
import dynamic from 'next/dynamic';

// Dynamically load the Three.js scene to avoid SSR issues
const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });



export default function Running() {
  const [scrollPos, setScrollPos] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  
  const translateX = scrollPos / 10; // Adjust divisor for speed


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
          <li><a href="#Home">Home</a></li>
          <li><a href="#aboutme">About Me</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
        </ul>

        {/* Contact Button */}
        <a href="#contact" className={styles.contactButton}>GET IN TOUCH</a>

        {/* Dropdown Menu (Mobile) */}
        <div className={`${styles.dropdown} ${dropdownVisible ? styles.active : ''}`}>
          <a href="/">Home</a>
          <a href="#aboutme">About Me</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
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
          <h1
            className={`${styles.separator} ${styles.outlinedOverview}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW • OVERVIEW
          </h1>
          <h2 className={styles.aboutProject}>ABOUT OKSI & Smart Socks /</h2>
         
            {/* Text Container */}
            <div className={styles.overviewText}>
              <p>
              My innovation project features a bracelet and socks designed to enhance running performance while reducing the risk of injury. They aim to coach and improve biomechanical efficiency and boost cardiovascular endurance for a safer, more effective running experience.
              </p>
            </div>

            <h2 className={styles.aboutProjectSmall}>My vision /</h2>
         
         {/* Text Container */}
         <div className={styles.overviewText}>
           <p>
           Design new ways for people to interact with
           their own biosignals for health and performance improvements in sports

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
              My passion for <span className={styles.customFontcolor}>engineering</span> and <span className={styles.customFontcolor}>running</span> drives me to combine 
            
              Running has many benefits, including improved cardiovascular and mental health, as well as the opportunity to set goals and push limits. However, after experiencing an injury myself, and learning that 68.3% of runners face similar challenges, I wanted to create a solution to help prevent and manage injuries while still enjoying the benefits of running.
            </p>
          </div>
          </div>


          </section>

          <ThreeScene/>

          {/* Overview Section */}
        <section className={styles.section}>
          <h1
            className={`${styles.separator} ${styles.outlinedProcess}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS • SMART SOCKS
          </h1>
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
            text?
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_proto.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
          <h2 className={styles.moreProjectSmall}>UX/UI interface prototypes</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            text?
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_uiux.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>
          <h2 className={styles.moreProjectSmall}>System overview</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            text?
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/socks_system.png" alt="Prototypes" className={styles.longImage} />
              
        
          </div>

          <h1
            className={`${styles.separator} ${styles.outlinedProcess}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET • OKSI BRACELET
          </h1>
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
            <div className={styles.paragraphText}>
            text?
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/bracelet_proto.png" alt="Prototypes" className={styles.longImage} />
              <p className={styles.imageCaption}>First prototypes of Smart socks</p>
        
          </div>
        
        

          </section>


        {/* Contact Section */}
        
        <section className={styles.contactSection}>
        <h1
            className={`${styles.separator} ${styles.outlinedContact}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME
          </h1>
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
                src="https://www.google.com/maps/embed?...La%20Défense!"
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
        <img src="ineslogocontourportfolio.png" alt="Ines Logo" className={styles.logo} />
      </footer>
    </div>
  );
}
