// app/pogodo/page.js
"use client";

import Link from "next/link";
import styles from "../project.module.css";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimation } from 'framer-motion';
import Lenis from 'lenis';

import ContactForm from '../ContactForm';

export default function Pogodo() {
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
              <h1 className={styles.mainTitleProject}>Leather Bottle Holder</h1>
              <h2 className={styles.subTitleProject}>POGODO</h2>
            </div>
            <img
              src="./accueil_pogodo.png"
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
          
          <h2 className={styles.aboutProject}>ABOUT POGODO /</h2>
          <div className={styles.textAndImageContainer}>
            {/* Text Container */}
            <div className={styles.overviewText}>
              <p>
             
                A <span className={styles.customFontcolor}> leather bag for your water bottle or glass, </span> so you can stay hydrated at all times without being burdened.
                <br />
                Still looking for a convenient way to <span className={styles.customFontcolor}>carry your favorite water bottle or cups</span> without the fear of spills ? 
                <span className={styles.customFontbig}> POGODO </span> is made to revolutionize your daily routine!
              </p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/pogodo1.png" alt="Photo of POGODO" className={styles.smallImage} />
            </div>
          </div>
        

        {/* Team Section */}
        
          <h2 className={styles.aboutProjectSmall}>Meet the Team</h2>
          <div className={styles.textAndImageContainer}>
          <div className={styles.imageContainer}>
             <img src="/pogodo_team.png" alt="Team" className={styles.smallImage} />
    
          </div>
          <div className={styles.overviewText}>

              Meet the <span className={styles.customFontbig}> POGODO Team </span>, where expertise and motivation come together to create <span className={styles.customFontcolor}>ingenious solutions</span>. <br />
              Our passion for <span className={styles.customFontcolor}>engineering</span> and <span className={styles.customFontcolor}>creativity</span> drives us to combine practicality and design in every detail of  <span className={styles.customFontbig}>   POGODO</span>.

          </div>
          </div>


          </section>

          {/* Overview Section */}
        <section className={styles.section}>
        <motion.h1
        className={`${styles.separator} ${styles.outlinedProcess}`}
        initial={{ x: -100, opacity: 0 }} // Start off-screen and transparent
        animate={controls} // Bind the animation controls to the element
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
       PROCESS • PROCESS • PROCESS • PROCESS • PROCESS • PROCESS
      </motion.h1>
         
          <h2 className={styles.moreProject}>Prototyping Process /</h2>
          <h2 className={styles.moreProjectSmall}>How it started</h2>
            {/* Text Container */}
            <div className={styles.paragraphText}>
            <span className={styles.customFontbig}>POGODO</span> began with a simple yet essential goal: to solve the challenges of carrying water bottles with ease and elegance. <br />
            Many people struggle to keep their bottles accessible and secure whether at work, during exercise, or while traveling. Understanding this need inspired us to create a solution that blends convenience with style. 
            By repurposing high-quality leather scraps from renowned fashion houses, <span className={styles.customFontbig}>POGODO</span> not only delivers a functional accessory but also embraces eco-friendly practices. <br />
            <span className={styles.customFontcolor2}>Stay hydrated</span>, <span className={styles.customFontcolor2}>stay stylish</span>, and <span className={styles.customFontcolor2}>stay mindful of the planet</span>.
            </div>
            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/pogodo_proto.png" alt="Prototypes" className={styles.longImage} />
              
          </div>
          <h2 className={styles.moreProjectSmall}>The product</h2>

          <div className={styles.textAndImageContainer}>
            {/* Text Container */}
            <div className={styles.overviewText2}>

              <span className={styles.customFontbig}>What’s in the Kit?</span> <br />
• <span className={styles.customFontcolor2}>1 large handle:</span> Enables you to wear your <span className={styles.customFontbig}>POGODO</span> long or short, adapting to your preference. <br />
• <span className={styles.customFontcolor2}>1 main lanyard:</span> Designed with strategically positioned notches, it securely fastens your entire <span className={styles.customFontbig}>POGODO</span> together for reliable use. <br />
• <span className={styles.customFontcolor2}>3 supporting straps:</span> Perfectly secure your water bottle, bottle, or cup in any setting, accommodating a wide range of sizes. <br />
• <span className={styles.customFontcolor2}>7 clasp buttons:</span> Add a stylish and functional touch, fastening the leather straps together seamlessly. <br />
<br />
Experience the perfect balance of functionality, adaptability, and style with the <span className={styles.customFontbig}>POGODO</span> kit!


            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/pogodo_kit.png" alt="Photo of POGODO" className={styles.smallImage} />
            </div>
          </div>

          <h2 className={styles.moreProject}>Funding goals /</h2>
          <h2 className={styles.moreProjectSmall}>Our campaign</h2>

          <div className={styles.textAndImageContainer}>
          <div className={styles.embedsContainer}>
  {/* Video iframe */}
  <iframe 
    width="480" 
    height="270" 
    src="https://www.kickstarter.com/projects/pogodo/quickstarter-pogodo/widget/video.html" 
    frameBorder="0" 
    scrolling="no" 
    title="Kickstarter Video">
  </iframe>
  
</div>

          <div className={styles.overviewText2}>

          We launched a crowdfunding campaign on <span className={styles.customFontcolor2}>Kickstarter</span> to bring our vision of <span className={styles.customFontbig}>POGODO</span> to life. <br />
Backers not only had the chance to own their very own <span className={styles.customFontbig}>POGODO</span>, but they could also amplify their impact by making a donation. <br />
Every contribution brought us closer to our funding goal and played a vital role in the success of our campaign. <br />
By supporting us, you are becoming an active part of this adventure, driven by an <span className={styles.customFontcolor2}>innovative vision</span> and a commitment to sustainable design!

          </div>
          </div>
          
  <Link href="http://kck.st/3v0FGXO">
    <button className={styles.learnMoreButton}>Click here to visit our campaign page</button>
  </Link>
  <div className={styles.overviewText2center}><span className={styles.customFontbig}>67 backers</span> pledged <span className={styles.customFontbig}>€1,706</span> to help bring this project to life</div>



          <h2 className={styles.moreProject}>PRODUCTION /</h2>
          <h2 className={styles.moreProjectSmall}>Fabrication process</h2>

  
            <div className={styles.paragraphText}>
            
              <p>
              To deliver the best possible product, we carefully evaluated a variety of leathers, considering factors like <span className={styles.customFontcolor2}>thickness</span> and <span className={styles.customFontcolor2}>texture</span>. <br />
After thorough testing, we selected the most suitable option: French leather, crafted using <span className={styles.customFontcolor2}>vegetable tanning</span>. <br />
This approach not only ensures exceptional quality but also helps minimize our environmental impact. <br />
With <span className={styles.customFontbig}>POGODO</span>, you’re choosing a product that balances sustainability, craftsmanship, and style.

</p>
            </div>


            <div className={styles.imageContainer}>
              <img src="/pogodo_fabrication.png" alt="Photo of POGODO" className={styles.longImage} />
            </div>

          
            <div className={styles.paragraphTextcenter}>
            
              <p>
              Don’t let your water bottle disrupt your day anymore. <span className={styles.customFontbig}>POGODO</span> is here to simplify your life, whether you’re on the move, enjoying a party with friends, or tackling a busy day. <br />
<br />
<span className={styles.customFontcolor2}>Free up your hands, free up your mind</span> – <span className={styles.customFontbig}>POGODO</span>, your ideal companion for a carefree life!
</p>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              <img src="/pogodo_bannierebas.png" alt="Photo of POGODO" className={styles.longImage} />
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
    <a href="https://github.com/inesbnr" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
      <img src="GitHub.png" alt="GitHUb" className={styles.linkedinLogo} />
    </a>
  </div>
</footer>
    </div>
  );
}
