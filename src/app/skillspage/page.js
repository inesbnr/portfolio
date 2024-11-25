"use client"; // Mark this component as a Client Component
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../global.module.css';

import Link from 'next/link';

export default function Home() {
  const [scrollPos, setScrollPos] = useState(0);
  const skillsRef = useRef(null);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      setScrollPos(window.scrollY); // Update scroll position
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate translate value based on scroll position
  const translateX = (scrollPos / 10); // Adjust divisor for speed


  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio - INES</title>
        <meta name="description" content="Welcome to my portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <header className={styles.navbar}>
        <ul className={styles.navItems}>
          <li><Link href="/">Home</Link></li>
          
          <li><a href="/aboutmepage">About Me</a></li>
          <li><a href="/projectpage">Projects</a></li>
          <li><a href="#">Skills</a></li>
        </ul>
        <a href="#" className={styles.contactButton}>CONTACT ME</a>
      </header>

      {/* Main content */}
      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h1 className={styles.mainTitle}>Learn more about my skills</h1>
        </section>

        <section className={styles.svgSection}>
          <img src="./ineslogoportfolio.png" alt="Illustration" className={styles.illustration} />
        </section>
      
        

        <section className={styles.aboutMeSection}>
        <h1
            className={`${styles.separator} ${styles.outlinedSkills}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS
          </h1>
        </section>


        <section className={styles.presentationSection}>
          <div className={styles.textContainer}>
            <h2 className={styles.mySkillsTitle}>MY SKILLS / </h2>
            <ul className={styles.skillsList}>
              <li>Programming Languages</li>
              <li>Software & Tools</li>
              <li>Prototyping & Fabrication</li>
              <li>Project Management & Collaboration</li>
            </ul>
          </div>
        </section>

     

        <section className={styles.contactSection}>
          <div className={styles.contactContainer}>
            <div className={styles.formContainer}>
              <h2>GET IN TOUCH</h2>
              <form className={styles.contactForm}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Please enter your email" required />

                <label htmlFor="mobile">Mobile</label>
                <input type="tel" id="mobile" placeholder="Enter mobile" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Enter your message" required></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>
            <div className={styles.mapContainer}>
              <h2>MY LOCATION</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0572704367494!2d2.2399123156771693!3d48.89267187928893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e7c16ec3a53%3A0xd589485799ae55db!2sLa%20D%C3%A9fense!5e0!3m2!1sen!2sfr!4v1689185688573!5m2!1sen!2sfr"
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
        <img src="ineslogocontourportfolio.png" alt="Ines" className={styles.logo} />
      </footer>
    </div>
  );
}
