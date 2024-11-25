"use client"; // Mark this component as a Client Component
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './global.module.css';
import { Ines } from "./components/logoaccueil";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

export default function Home() {
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
      <Head>
        <title>Portfolio - INES</title>
        <meta name="description" content="Welcome to my portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Home Section */}
        <section id="home" className={styles.welcomeSection}>
          <div className={styles.mainTitle}>WELCOME TO MY PORTFOLIO</div>
          <div className={styles.containerlogo}>
          <img src="./ineslogoportfolio.png" alt="Illustration" className={styles.illustration} />
          <div className={styles.container3D}><Canvas
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            pointerEvents: 'auto', // Makes sure the canvas doesn't block interactions with the image
          }}
          camera={{ position: [0, 0, 5], fov: 45 }} 
        >
          {/* Ambient light and directional light */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />


              {/* OrbitControls for navigation */}
               {/* OrbitControls for navigation with zoom disabled */}
                <OrbitControls enableZoom={false} />
                <Ines/>
            </Canvas></div>

            </div>
        </section>
        

      

        {/* About Me Section */}
        <section id="aboutme" className={styles.section}>
          <h1
            className={`${styles.separator} ${styles.outlinedAboutme}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME
          </h1>
          
          <div className={styles.presentationSection}>
          <h2 className={styles.aboutMeTitle}>ABOUT ME / </h2>
          <div className={styles.textAndImageContainer}>
            <div className={styles.aboutMeText}>
              Hi, I am <span className={styles.customFontbig}>Inès Beaunoir</span>, 
              a <span className={styles.customFontcolor}> Creative technology student </span> 
              at the Institute for Future Technologies in Paris. <br />
              I love <span className={styles.customFont}> technologies</span> and <span className={styles.customFont}>innovation</span>. <br />
              I am in the <span className={styles.customFontcolor}>Human Learning</span> research group to study human interactions with technology.
            </div>
            <div className={styles.imageContainer}>
              <img src="/PhotoMemoji.png" alt="Photo" className={styles.profileImage} />
            
            </div>
          </div>
        </div>

        </section>

        {/* Projects Section */}
        <section id="projects" className={styles.section}>
          <h1
            className={`${styles.separator} ${styles.outlinedProject}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS
          </h1>
          <h2 className={styles.myProjectsTitle}>MY PROJECTS / </h2>
          <div className={styles.projectContainer}>
            {/* Project 1 */}
            <div className={`${styles.project} ${styles.left}`}>
              <img src="/ARTOFLIFE.png" alt="Project 1" className={styles.projectImage} />
              <div className={styles.projectDescription}>
                <h1>ART OF LIFE</h1>
                <div className={styles.divider}></div>
                <h3>INNOVATION PROJECT</h3>
                <p>An artistic immersive experience using biosignals for stress and emotions management.</p>
                <Link href="/artoflife">
                  <button className={styles.learnMoreButton}>Learn More</button>
                </Link>
              </div>
            </div>
            {/* Projet 2 */}
            <div className={`${styles.project} ${styles.right}`}>
     
                <img src="/SOCKS.png" alt="Project 2" className={styles.projectImage} />
              
              <div className={styles.projectDescription}>
                <h1>SMART SOCKS</h1>
                <div className={styles.divider}></div>
                <h3>INNOVATION PROJECT</h3>
                <p>Smart socks for running that help you to prevent injuries when running.</p>
                <Link href="/running">
                  <button className={styles.learnMoreButton}>Learn More</button>
                </Link>
              </div>
            </div>

            {/* Projet 3 */}
            <div className={`${styles.project} ${styles.left}`}>
              
                <img src="/BRACELET.png" alt="Project 3" className={styles.projectImage} />
             
              <div className={styles.projectDescription}>
                <h1>RUNNING BRACELET</h1>
                <div className={styles.divider}></div>
                <h3>INNOVATION PROJECT</h3>
                <p>A running coach that frees you from numbers to achieve your goals.</p>
                <Link href="/running">
                  <button className={styles.learnMoreButton}>Learn More</button>
                </Link>
              </div>
            </div>

            {/* Projet 4 */}
            <div className={`${styles.project} ${styles.right}`}>
             
                <img src="/POGODO.png" alt="Project 4" className={styles.projectImage} />
              
              <div className={styles.projectDescription}>
                <h1>POGODO</h1>
                <div className={styles.divider}></div>
                <h3>KICKSTARTER PROJECT</h3>
                <p>A water bottle holder made of leather. Do it yourself with this DIY kit.</p>
                {/* Learn More Button */}
                <Link href="/pogodo">
                  <button className={styles.learnMoreButton}>Learn More</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={styles.section}>
          <h1
            className={`${styles.separator} ${styles.outlinedSkills}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS
          </h1>
         
            <h2 className={styles.mySkillsTitle}>MY SKILLS /</h2>
          <div className={styles.skillsContainer}>
            {/* Programming Languages Card */}
            <div className={styles.skillCard}>
              <h3>Programming Languages</h3>
              <ul>
                <li>C & C#</li>
                <li>Python</li>
                <li>Arduino</li>
                <li>React & Next.js</li>
                <li>Three.js</li>
                <li>VS Code</li>
              </ul>
            </div>

            {/* Software & Tools Card */}
            <div className={styles.skillCard}>
              <h3>Software & Tools</h3>
              <ul>
                <li>Adobe Suite (Photoshop, Illustrator, After Effects)</li>
                <li>Office 365</li>
                <li>Computer-Aided Design (SolidWorks, Fusion 360, Kicad)</li>
              </ul>
            </div>

            {/* Prototyping & Fabrication Card */}
            <div className={styles.skillCard}>
              <h3>Prototyping & Fabrication</h3>
              <ul>
                <li>3D Printing</li>
                <li>Laser Cutting</li>
                <li>Arduino Microcontrollers</li>
                <li>PCB designing</li>
                <li>UX/UI Prototyping</li>
              </ul>
            </div>

            {/* Project Management & Collaboration Card */}
            <div className={styles.skillCard}>
              <h3>Project Management & Collaboration</h3>
              <ul>
                <li>Agile Methodology</li>
                <li>Design Thinking</li>
                <li>Trello</li>
                <li>Notion</li>
                <li>Figma</li>
              </ul>
            </div>
          </div>
        </section>

       

        {/* Contact Section */}
        <section id="contact" className={styles.contactSection}>
        <h1
            className={`${styles.separator} ${styles.outlinedContact}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME
          </h1>
          <div className={styles.contactContainer}>
            <div className={styles.formContainer}>
              <h2 className={styles.aboutMeTitle}>GET IN TOUCH</h2>
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
              <h2 className={styles.aboutMeTitle}>MY LOCATION</h2>
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
