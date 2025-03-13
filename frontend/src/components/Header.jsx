"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

function Header() {
  const { user, logout } = useContext(AuthContext)

  // Default avatar if user doesn't have one
  const defaultAvatar = "https://i.pravatar.cc/150?img=3"

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#FF6B35", // Orange theme for marketplace
      color: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: 0,
      textDecoration: "none",
      color: "white",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      padding: "8px 12px",
      borderRadius: "4px",
      transition: "background-color 0.2s",
    },
    activeLink: {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid white",
    },
    username: {
      fontWeight: "500",
    },
    button: {
      backgroundColor: "white",
      color: "#FF6B35",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "opacity 0.2s",
    },
    sellButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      fontWeight: "bold",
      padding: "10px 20px",
      borderRadius: "4px",
      marginRight: "15px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
  }

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        LeBonCoinLike
      </Link>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Accueil
        </Link>

        {user && (
          <Link to="/post-annonce" style={{ ...styles.link, ...styles.sellButton }}>
            <span style={{ fontSize: "18px" }}>+</span> Vendre un article
          </Link>
        )}

        {user ? (
          <div style={styles.userSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={user.avatar || defaultAvatar} alt="Profile" style={styles.avatar} />
              <span style={styles.username}>Bonjour, {user.username}</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/my-account" style={styles.link}>
                Mon compte
              </Link>
              <Link to="/messages" style={styles.link}>
                Messages
              </Link>
              <button
                onClick={logout}
                style={styles.button}
                onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.userSection}>
            <Link
              to="/register"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              Inscription
            </Link>
            <Link
              to="/login"
              style={{ ...styles.link, ...styles.button }}
              onMouseOver={(e) => (e.target.style.opacity = 0.9)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
            >
              Connexion
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

