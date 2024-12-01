"use client"; // Mark this component as a Client Component
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './global.module.css';
import { Ines } from "./components/logoaccueil";
import ContactForm from './ContactForm';

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimation } from 'framer-motion';
import Lenis from 'lenis';


import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

export default function Home() {

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (cardId) => setHoveredCard(cardId);
  const handleMouseLeave = () => setHoveredCard(null);


  const { scrollYProgress } = useScroll(); 
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]); 

  
  const [scrollPos, setScrollPos] = useState(0);
  const controls = useAnimation(); 


  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  useEffect(() => {
    
    if (scrollPos > 80) {
      controls.start({ x: (scrollPos-150)/10, opacity: 1 });
    } else {
      controls.start({ x: -100, opacity: 0 }); 
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
        setDropdownVisible(false); // Hide small navbar if screen is larger than 768px
      }
    };

  // Add event listener for resize
    window.addEventListener('resize', handleResize);

  // Clean up 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //Dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  //Dropdown no visibility
  const noDropdown = () => {
    setDropdownVisible(false);
  };

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
        {/* Menu for small screens */}
        <div className={styles.hamburger} onClick={toggleDropdown}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Items */}
        <ul className={styles.navItems}>
          <li><a href="/" >Home</a></li>
          <li><a href="#aboutme">About Me</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
        </ul>

        {/* Contact Button */}
        <a href="#contact" onClick={noDropdown} className={styles.contactButton}>GET IN TOUCH</a>

        {/* Dropdown Menu (Mobile) */}
        <div className={`${styles.dropdown} ${dropdownVisible ? styles.active : ''}`}>
          <a href="/" onClick={toggleDropdown}>Home</a>
          <a href="#aboutme" onClick={toggleDropdown}>About Me</a>
          <a href="#projects" onClick={toggleDropdown}>Projects</a>
          <a href="#skills" onClick={toggleDropdown}>Skills</a>
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
            pointerEvents: 'auto',
          }}
          camera={{ position: [0, 0, 5], fov: 45 }} 
        >
          {/* Ambient light and directional light */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
               {/* OrbitControls for navigation with zoom disabled */}
                <OrbitControls enableZoom={false} />
                <Ines/>
            </Canvas></div>

            </div>
        </section>

        {/* About Me Section */}
        <section id="aboutme" className={styles.section}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedAboutme}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
        ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME
      </motion.h1>
          
          <div className={styles.presentationSection}>
          <motion.h2
            className={styles.aboutMeTitle}
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ duration: 2, ease: "easeOut" }}
          >
            ABOUT ME /
          </motion.h2>
          <div className={styles.textAndImageContainer}>
              
              <motion.div
    className={styles.aboutMeText}
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div className={styles.aboutMeTextbig} >Hi, I'm <span className={styles.customFontbig}>Inès Beaunoir </span> ! </div>
                I'm a <span className={styles.customFontcolor}> Creative technology student </span> 
                at the Institute for Future Technologies in Paris. <br />
                I love <span className={styles.customFont}> technologies</span> and <span className={styles.customFont}>innovation</span>. <br />
                I'm in the <span className={styles.customFontcolor}>Human Learning</span> research group to study human interactions with technology.
             
  </motion.div>
  <motion.div
  className={styles.imageContainer}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
  whileHover={{ scale: 1.1 }} 
>
  <img src="/photomemoji.png" alt="Photo" className={styles.profileImage} />
</motion.div>

          </div>

 

        </div>

        </section>

        

        {/* Projects Section */}
        <section id="projects" className={styles.section}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedProject}`}
        initial={{ x: 0, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
       PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS • PROJECTS
      </motion.h1>
      <motion.h2
            className={styles.myProjectsTitle}
            initial={{ opacity: 0 }} // Start with opacity 0 (invisible)
            whileInView={{ opacity: 1 }} // Fade in to full opacity when in view
            viewport={{ once: true, amount: 0.5 }} // Trigger when 20% of the element is in view
            transition={{ duration: 2, ease: "easeOut" }} // Duration of the fade-in animation
          >
            MY PROJECTS /
          </motion.h2>

          
          <div className={styles.projectContainer}>
            {/* Project 1 */}
            <motion.div
      key={1}
      className={`${styles.project} ${styles.left}`}
      initial={{ opacity: 0, x: -100}}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
              <img src="/ARTOFLIFE.png" alt="Project 1" className={styles.projectImage} />
              <div className={styles.projectDescription}>
                <h1>ART OF LIFE</h1>
                <h2>March 2024</h2>
              
                <h3>INNOVATION PROJECT</h3>
                <p>An artistic immersive experience using biosignals for stress and emotions management.</p>
                <Link href="/artoflife">
                  <button className={styles.learnMoreButton}>Learn More → </button>
                </Link>
              </div>
              </motion.div>
  
            {/* Projet 2 */}
            <motion.div
      key={2}
      className={`${styles.project} ${styles.right}`}
      initial={{ opacity: 0, x: 100}}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
     
                <img src="/SOCKS.png" alt="Project 2" className={styles.projectImage} />
              
              <div className={styles.projectDescription}>
                <h1>SMART SOCKS</h1>
                <h2>November 2024</h2>
              
                <h3>INNOVATION PROJECT</h3>
                <p>Smart socks for running that help you to prevent injuries when running.</p>
                <Link href="/running">
                  <button className={styles.learnMoreButton}>Learn More →</button>
                </Link>
              </div>
              </motion.div>
      

            {/* Projet 3 */}
            <motion.div
      key={3}
      className={`${styles.project} ${styles.left}`}
      initial={{ opacity: 0, x: -100}}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
              
                <img src="/BRACELET.png" alt="Project 3" className={styles.projectImage} />
             
              <div className={styles.projectDescription}>
                <h1>OKSI</h1>
                <h2>December 2024</h2>

                <h3>INNOVATION PROJECT</h3>
                <p>A bracelet coach for running that frees you from numbers to achieve your goals.</p>
                <Link href="/running">
                  <button className={styles.learnMoreButton}>Learn More →</button>
                </Link>
              </div>
              </motion.div>
      

            {/* Projet 4 */}
            <motion.div
      key={4}
      className={`${styles.project} ${styles.right}`}
      initial={{ opacity: 0, x: 100}}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
             
                <img src="/POGODO.png" alt="Project 4" className={styles.projectImage} />
              
              <div className={styles.projectDescription}>
                <h1>POGODO</h1>
                <h2>February 2024</h2>
                <h3>KICKSTARTER PROJECT</h3>
                <p>A water bottle holder made of leather. Do it yourself with this DIY kit.</p>
                {/* Learn More Button */}
                <Link href="/pogodo">
                  <button className={styles.learnMoreButton}>Learn More →</button>
                </Link>
              </div>
              </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={styles.section}>
          

          <motion.h1
        className={`${styles.separator} ${styles.outlinedexp}`}
        initial={{ x: 0, opacity: 0 }} 
        animate={controls} 
        transition={{ duration: 0.5, ease: "easeOut" }} 
      >
       EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION • WORK EXPERIENCE • EDUCATION 

      </motion.h1>

      <div className={styles.textresume}>
  {/* Education Section */}
  <div className={styles.textdiv}>
  <motion.h2
            className={styles.expTitle}
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ duration: 2, ease: "easeOut" }} 
          >
            MY STUDIES /
          </motion.h2>

       

          <motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2020 - 2025</span>
    <span className={styles.school}>École Supérieure d'Ingénieur Léonard de Vinci (ESILV)</span>
    <span className={styles.location}>Paris La Défense, France</span>
    <span className={styles.degree}>Master's Degree in Engineering</span>
  </h3>
  </motion.div>

  <motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2023 - 2025</span>
    <span className={styles.school}>Institute for Future Technologies (IFT)</span>
    <span className={styles.location}>Paris La Défense, France</span>
    <span className={styles.degree}>MSc in Innovation and Creative Technology</span>
    <span className={styles.group}>Human Learning Research Group</span>
  </h3>
  </motion.div>

  <motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2022</span>
    <span className={styles.school}>Sungkyunkwan University (SKKU)</span>
    <span className={styles.location}>Seoul, South Korea</span>
    <span className={styles.degree}>International Exchange Semester</span>
  </h3>
  </motion.div>

  <motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2020</span>
    <span className={styles.school}>Lycée Notre-Dame de Boulogne</span>
    <span className={styles.degree}>Scientific Baccalaureate, Specialization in Mathematics, with Honors</span>
  </h3>
  </motion.div>
  </div>

  {/* Work Experiences Section */}
  <div className={styles.textdiv}>
 
      <motion.h2
            className={styles.expTitle}
            initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
          >
            MY EXPERIENCES /
          </motion.h2>
         
      
          <motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2024</span>
    <span className={styles.company}>Sopra Steria</span>
    <span className={styles.position}>Business Analyst Intern</span>
    <span className={styles.description}>Technical Internship as a software business analyst on the BRASIDAS Project for Defense & Security Business Unit.</span>
  </h3>
  </motion.div>

<motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2023</span>
    <span className={styles.company}>BDE Vegas</span>
    <span className={styles.position}>Secretary General of the Student Council</span>
    <span className={styles.description}>Management & Coordination of various projects throughout the year. Organization of events and a trip to Europe.</span>
  </h3>
  </motion.div>

<motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2024</span>
    <span className={styles.company}>National Domain of Saint-Cloud</span>
    <span className={styles.position}>Student Job</span>
    <span className={styles.description}>Welcoming visitors, cash management, surveillance.</span>
  </h3>
  </motion.div>

<motion.div
    className={styles.expDescription}
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
  <h3>
    <span className={styles.year}>2022</span>
    <span className={styles.company}>Médiamétrie</span>
    <span className={styles.position}>Assistant Research Intern</span>
    <span className={styles.description}>Business discovery internship at the radio department for the release of the audience study.</span>
  </h3>
  </motion.div>
  </div>
</div>
<Link href="/Ines-BEAUNOIR_CV.pdf">
  <motion.button
    className={styles.resumebutton}
    whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }} 
    whileTap={{ scale: 0.95 }} 
  >
    See my full resume →
  </motion.button>
</Link>

</section>



        {/* Skills Section */}
        <section id="skills" className={styles.section}>
          

          <motion.h1
        className={`${styles.separator} ${styles.outlinedSkills}`}
        initial={{ x: 0, opacity: 0 }} 
        animate={controls} 
        transition={{ duration: 0.5, ease: "easeOut" }} 
      >
       SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS • SKILLS

      </motion.h1>

      <motion.h2
            className={styles.mySkillsTitle}
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ duration: 2, ease: "easeOut" }}
          >
          MY SKILLS /
          </motion.h2>
         
      

      <motion.div
  className={styles.skillsContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
  }}
>
            {/* Programming Languages Card */}
            <motion.div
      className={styles.skillCard}
      onMouseEnter={() => handleMouseEnter('card1')}
  onMouseLeave={handleMouseLeave} 
  variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden" 
      animate="visible" 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {hoveredCard === 'card1' ? (
      
        <div className={styles.logoGrid}>
          <img src="/logocode/logo1.png" alt="C Logo" className={styles.logoskills} />
          <img src="/logocode/logo2.png" alt="Python Logo" className={styles.logoskills} />
          <img src="/logocode/logo3.png" alt="Arduino Logo" className={styles.logoskills} />
          <img src="/logocode/logo4.png" alt="React Logo" className={styles.logoskills} />
          <img src="/logocode/logo5.png" alt="Three.js Logo" className={styles.logoskills} />
          <img src="/logocode/logo6.png" alt="VS Code Logo" className={styles.logoskills} />
          <img src="/logocode/logo7.png" alt="Three.js Logo" className={styles.logoskills} />
          <img src="/logocode/logo8.png" alt="VS Code Logo" className={styles.logoskills} />
        </div>
      ) : (
    
        <div className={styles.textContent}>
          <h3>Programming Languages</h3>
          <ul>
          <li className={styles.skillItem}>C & C#</li>
    <li className={styles.skillItem}>Python</li>
    <li className={styles.skillItem}>Arduino</li>
    <li className={styles.skillItem}>React & Next.js</li>
    <li className={styles.skillItem}>Three.js</li>
    <li className={styles.skillItem}>VS Code</li>
          </ul>
        </div>
      )}
    </motion.div>

            {/* Software & Tools Card */}
            <motion.div
      className={styles.skillCard}
      onMouseEnter={() => handleMouseEnter('card2')}
  onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden" 
      animate="visible" 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {hoveredCard === 'card2' ? (
        <div className={styles.logoGrid}>
          <img src="/logoapp/logo1.png" alt="C Logo" className={styles.logoskills} />
          <img src="/logoapp/logo2.png" alt="Python Logo" className={styles.logoskills} />
          <img src="/logoapp/logo3.png" alt="Arduino Logo" className={styles.logoskills} />
          <img src="/logoapp/logo4.png" alt="React Logo" className={styles.logoskills} />
          <img src="/logoapp/logo5.png" alt="Three.js Logo" className={styles.logoskills} />
          <img src="/logoapp/logo6.png" alt="VS Code Logo" className={styles.logoskills} />
          <img src="/logoapp/logo7.png" alt="Three.js Logo" className={styles.logoskills} />
        </div>
      ) : (
        <div className={styles.textContent}>
          
          <h3>Software & Tools</h3>
              <ul>
    <li className={styles.skillItem}>Adobe Creative Cloud</li>
    <li className={styles.skillItem}>Office 365</li>
    <li className={styles.skillItem}>Figma</li>
    <li className={styles.skillItem}>Solidworks</li>
    <li className={styles.skillItem}>Kicad</li>
    <li className={styles.skillItem}>Fusion 360</li>


    <li className={styles.skillItem}>Blender</li>
          </ul>
        </div>
      )}
    </motion.div>
           

            {/* Prototyping & Fabrication Card */}
            <motion.div
      className={styles.skillCard}
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
              <h3>Prototyping & Fabrication</h3>
              <ul>
              <li className={styles.skillItem}>3D Printing</li>
    <li className={styles.skillItem}>Laser Cutting</li>
    <li className={styles.skillItem}>Microcontrollers</li>
    <li className={styles.skillItem}>PCB designing</li>
    <li className={styles.skillItem}>UX/UI Prototyping</li>
              </ul>
              </motion.div>

            {/* Project Management & Collaboration Card */}
            <motion.div
      className={styles.skillCard}
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
              <h3>Project Management & Collaboration</h3>
              <ul>
              <li className={styles.skillItem}>Agile Methodology</li>
    <li className={styles.skillItem}>Design Thinking</li>
    <li className={styles.skillItem}>Leadership</li>
    <li className={styles.skillItem}>Trello</li>
    <li className={styles.skillItem}>Notion</li>
       
              </ul>
              </motion.div>
            </motion.div>
        </section>

       

        {/* Contact Section */}
        <section id="contact" className={styles.contactSection}>
        
              <motion.h1
        className={`${styles.separator} ${styles.outlinedContact}`}
        initial={{ x: 0, opacity: 0 }} 
        animate={controls} 
        transition={{ duration: 0.5, ease: "easeOut" }} 
      >
      
      CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME • CONTACT ME
            </motion.h1>
          
          <div className={styles.contactContainer}>
            <div className={styles.formContainer}>
              <h2 className={styles.contactMeTitle}>GET IN TOUCH</h2>
              <div>
      <ContactForm />
    </div>
            </div>
            <div className={styles.mapContainer}>
              <h2 className={styles.contactMeTitle}>MY LOCATION</h2>
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
      <img src="linkedin.png" alt="LinkedIn" className={styles.linkedinLogo} />
    </a>
    <a href="https://github.com/inesbnr" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
      <img src="GitHub.png" alt="GitHUb" className={styles.linkedinLogo} />
    </a>
  </div>
</footer>

    </div>
  );
}
