// pages/index.js
import Head from 'next/head';
import styles from './global.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Portfolio website built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>About Me</h2>
          <p>Hello, I am a Creative technology student at IFT. I love technologies and innovation. I am in the Human learning research group to study human interactions with technology.</p>
        </section>

        <section className={styles.section}>
          <h2>My Projects</h2>
          <p>Here are some of my recent projects:</p>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Project 3</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>My Skills</h2>
          <p>I am skilled in:</p>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Node.js</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
