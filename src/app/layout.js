// src/app/layout.js

import './global.css';  // Import global CSS

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
