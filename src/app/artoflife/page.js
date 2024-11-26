// app/pogodo/page.js
"use client";

import Link from "next/link";
import styles from "../project.module.css";
import { useEffect, useRef, useState } from "react";

export default function Artoflife() {
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
          <li><a href="/">Home</a></li>
          <li><a href="/#aboutme">About Me</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#skills">Skills</a></li>
        </ul>

        {/* Contact Button */}
        <a href="/#contact" className={styles.contactButton}>GET IN TOUCH</a>

        {/* Dropdown Menu (Mobile) */}
        <div className={`${styles.dropdown} ${dropdownVisible ? styles.active : ''}`}>
          <a href="/">Home</a>
          <a href="/#aboutme">About Me</a>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
        </div>
      </header>
    </div>

      <main className={styles.mainContent}>
        {/* Welcome Section */}
        <section className={styles.welcomeSectionProject}>
          <div className={styles.imageContainer}>
            <div className={styles.textOverlay}>
              <h1 className={styles.mainTitleProject}>Interactive light projection</h1>
              <h2 className={styles.subTitleProject2}></h2>
            </div>
            <img
              src="./aol_welcome.png"
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
          <h2 className={styles.aboutProject}>ABOUT ART OF LIFE /</h2>
          <div className={styles.textAndImageContainer}>
            {/* Text Container */}
            <div className={styles.overviewText}>
              <p>
             
              <span className={styles.customFont}>Art of Life</span> is an interactive art installation designed to be a platform for artistic creations inspired by human physiological signals, fostering relaxation and mindfulness. <br />
<br />
The vision behind this project stems from the desire to create innovative ways for individuals to engage with their own biosignals, promoting health improvement and well-being. By utilizing <span className={styles.customFontcolor}>biofeedback</span> as a tool for emotion management, this installation transforms physiological data into a captivating artistic experience.

              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/pogodo1.png" alt="Photo of POGODO" className={styles.smallImage} />
            </div>
          </div>
        

        {/* Team Section */}
        
          <h2 className={styles.aboutProjectSmall}>Inspirations</h2>
          
          <div className={styles.overviewText}>
            <p>
            <span className={styles.customFontcolor}>The inspiration for the output</span> came from interactive exhibitions and light mapping shows, blending cutting-edge technology with creative expression. <br />
          These immersive experiences served as a foundation for designing a unique and engaging art installation that responds dynamically to human physiological signals, bringing the idea to life in a whole new way. 


            </p>
       
          </div>
          {/* Image Container */}
          <div className={styles.imageContainer}>
              <img src="/aol_inspiration.png" alt="AOL inspirations" className={styles.longImage} />
            </div>


          </section>

          {/* Overview Section */}
        <section className={styles.section}>
          <h1
            className={`${styles.separator} ${styles.outlinedProcess}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            PROCESS • PROCESS • PROCESS • PROCESS • PROCESS • PROCESS
          </h1>
          <h2 className={styles.moreProject}>Installation /</h2>
          <h2 className={styles.moreProjectSmall}>Sensors</h2>

          <div className={styles.textAndImageContainer}>
            {/* Text Container */}
            <div className={styles.overviewText}>
              <p>
              ECG Sensor This sensor uses three electrodes placed on the user’s upper body. You must connect the three electrodes to the sensor to ensure qualitative data. The reference electrode can be placed around the left lowest rib for an easier installation.
            EDA Sensor This sensor uses two electrodes placed on one of the user’s hands. You must connect the two electrodes to ensure qualitative data.
            Breathing Sensor This sensor uses a stretchable band that must be placed around the user’s ribs and will detect when the user inhales and exhales.
              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/aol_sensors.png" alt="sensors" className={styles.smallImage} />
            </div>
          </div>
          <div className={styles.imageContainer}>
              <img src="/aol_sensorinstallation.png" alt="installation" className={styles.longimage} />
            </div>
          
          <h2 className={styles.moreProjectSmall}>Light projection</h2>
          {/* Text Container */}
          <div className={styles.paragraphTexthalf}>
              <p>
              text wall sculpture
              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/aol_structure.png" alt="sculpture" className={styles.longImage} />
            </div>

          <div className={styles.paragraphTexthalf}>
              <p>
              text colors
              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/aol_valuescolor.png" alt="colors" className={styles.longImage} />
            </div>

            {/* Text Container */}
            <div className={styles.paragraphTexthalf}>
              <p>
              text shapes
              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/aol_shapes.png" alt="Shapes" className={styles.longImage} />
            </div>


          <h2 className={styles.moreProject}>Result /</h2>
          <h2 className={styles.moreProjectSmall}>Immersive experience</h2>

  
            <div className={styles.paragraphText}>
            
              <p>
             Text
</p>
            </div>


            <div className={styles.imageContainer}>
              <img src="/aol_result.png" alt="AOL result" className={styles.longImage} />
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
