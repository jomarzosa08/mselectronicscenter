import './index.css'

function Footer() {
  // Dynamically pulls the current year from the system clock
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} MS Electronics Center. All rights reserved.</p>
    </footer>
  )
}

export default Footer