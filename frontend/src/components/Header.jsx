"use client"

import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useLocation } from "react-router-dom"

function Header({ sidebarOpen }) {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notificationsRef = useRef(null)
  const searchRef = useRef(null)

  // Default avatar if user doesn't have one
  const defaultAvatar = "https://i.pravatar.cc/150?img=3"

  // Sample notifications
  const notifications = [
    { id: 1, type: "message", text: "Nouveau message de Jean", time: "Il y a 5 min", read: false },
    { id: 2, type: "offer", text: "Offre reçue sur votre annonce", time: "Il y a 2h", read: false },
    { id: 3, type: "system", text: "Votre annonce a été approuvée", time: "Hier", read: true },
    { id: 4, type: "message", text: "Nouveau message de Marie", time: "Il y a 2 jours", read: true },
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest("[data-search-toggle]")
      ) {
        setSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      height: "70px",
      backgroundColor: "#FF6B35",
      color: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      right: 0,
      left: sidebarOpen ? "280px" : "0",
      zIndex: 1000,
      transition: "left 0.3s ease",
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
      transition: "all 0.2s ease",
    },
    activeLink: {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      position: "relative",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid white",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    },
    avatarActive: {
      transform: "scale(1.1)",
      boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
    },
    iconButton: {
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "white",
      border: "none",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      position: "relative",
    },
    iconButtonActive: {
      backgroundColor: "rgba(255,255,255,0.4)",
      transform: "scale(1.1)",
    },
    badge: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: "#E74C3C",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #FF6B35",
    },
    dropdown: {
      position: "absolute",
      top: "55px",
      right: "0",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      width: "250px",
      zIndex: 1001,
      overflow: "hidden",
      animation: "fadeIn 0.2s ease",
    },
    dropdownHeader: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    dropdownAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    dropdownUserInfo: {
      display: "flex",
      flexDirection: "column",
    },
    dropdownUsername: {
      fontWeight: "600",
      color: "#333",
    },
    dropdownEmail: {
      fontSize: "12px",
      color: "#666",
    },
    dropdownMenu: {
      padding: "10px 0",
    },
    dropdownItem: {
      padding: "10px 15px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#333",
      textDecoration: "none",
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#f5f5f5",
    },
    dropdownDivider: {
      height: "1px",
      backgroundColor: "#eee",
      margin: "5px 0",
    },
    notificationDropdown: {
      width: "320px",
      maxHeight: "400px",
      overflowY: "auto",
    },
    notificationHeader: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    notificationTitle: {
      fontWeight: "600",
      color: "#333",
      margin: 0,
    },
    notificationClearAll: {
      fontSize: "12px",
      color: "#FF6B35",
      cursor: "pointer",
    },
    notificationItem: {
      padding: "12px 15px",
      borderBottom: "1px solid #f5f5f5",
      display: "flex",
      gap: "10px",
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    notificationIcon: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },
    notificationContent: {
      flex: 1,
    },
    notificationText: {
      margin: "0 0 5px 0",
      color: "#333",
      fontSize: "14px",
    },
    notificationTime: {
      color: "#999",
      fontSize: "12px",
    },
    notificationUnread: {
      backgroundColor: "#FFF5F0",
    },
    notificationFooter: {
      padding: "12px",
      textAlign: "center",
      borderTop: "1px solid #eee",
    },
    notificationViewAll: {
      color: "#FF6B35",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    searchContainer: {
      position: "absolute",
      top: "55px",
      right: "0",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      width: "400px",
      zIndex: 1001,
      padding: "15px",
      animation: "fadeIn 0.2s ease",
    },
    searchInput: {
      width: "100%",
      padding: "10px 15px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    searchInputFocus: {
      borderColor: "#FF6B35",
    },
    searchResults: {
      marginTop: "10px",
      maxHeight: "300px",
      overflowY: "auto",
    },
    searchCategory: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#999",
      textTransform: "uppercase",
      margin: "10px 0 5px 0",
    },
    searchItem: {
      padding: "8px 10px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#333",
      textDecoration: "none",
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    searchItemHover: {
      backgroundColor: "#f5f5f5",
    },
    searchItemIcon: {
      width: "30px",
      height: "30px",
      borderRadius: "4px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
    },
    searchItemContent: {
      flex: 1,
    },
    searchItemTitle: {
      margin: "0 0 2px 0",
      fontSize: "14px",
      fontWeight: "500",
    },
    searchItemSubtitle: {
      margin: 0,
      fontSize: "12px",
      color: "#666",
    },
    searchFooter: {
      marginTop: "10px",
      padding: "10px 0 0 0",
      borderTop: "1px solid #eee",
      textAlign: "center",
    },
    searchAdvanced: {
      color: "#FF6B35",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
  }

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        LeBonCoinLike
      </Link>

      <nav style={styles.nav}>
        {/* Search button */}
        <button
          style={{
            ...styles.iconButton,
            ...(searchOpen ? styles.iconButtonActive : {}),
          }}
          onClick={() => setSearchOpen(!searchOpen)}
          data-search-toggle
          onMouseOver={(e) => {
            if (!searchOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"
          }}
          onMouseOut={(e) => {
            if (!searchOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
          }}
          title="Recherche rapide"
        >
          🔍
        </button>

        {/* Search dropdown */}
        {searchOpen && (
          <div style={styles.searchContainer} ref={searchRef}>
            <input
              type="text"
              placeholder="Rechercher des annonces, catégories..."
              style={styles.searchInput}
              autoFocus
              onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <div style={styles.searchResults}>
              <div style={styles.searchCategory}>Catégories populaires</div>
              <Link
                to="/categories/vehicles"
                style={styles.searchItem}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={styles.searchItemIcon}>🚗</div>
                <div style={styles.searchItemContent}>
                  <div style={styles.searchItemTitle}>Véhicules</div>
                  <div style={styles.searchItemSubtitle}>Voitures, motos, vélos...</div>
                </div>
              </Link>
              <Link
                to="/categories/real-estate"
                style={styles.searchItem}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={styles.searchItemIcon}>🏠</div>
                <div style={styles.searchItemContent}>
                  <div style={styles.searchItemTitle}>Immobilier</div>
                  <div style={styles.searchItemSubtitle}>Appartements, maisons, terrains...</div>
                </div>
              </Link>

              <div style={styles.searchCategory}>Recherches récentes</div>
              <div
                style={styles.searchItem}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={styles.searchItemIcon}>📱</div>
                <div style={styles.searchItemContent}>
                  <div style={styles.searchItemTitle}>iPhone 13</div>
                  <div style={styles.searchItemSubtitle}>Il y a 2 jours</div>
                </div>
              </div>
              <div
                style={styles.searchItem}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={styles.searchItemIcon}>🛋️</div>
                <div style={styles.searchItemContent}>
                  <div style={styles.searchItemTitle}>Canapé d'angle</div>
                  <div style={styles.searchItemSubtitle}>Il y a 1 semaine</div>
                </div>
              </div>
            </div>
            <div style={styles.searchFooter}>
              <Link to="/advanced-search" style={styles.searchAdvanced}>
                Recherche avancée
              </Link>
            </div>
          </div>
        )}

        {user && (
          <>
            {/* Notifications button */}
            <button
              style={{
                ...styles.iconButton,
                ...(notificationsOpen ? styles.iconButtonActive : {}),
              }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              onMouseOver={(e) => {
                if (!notificationsOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"
              }}
              onMouseOut={(e) => {
                if (!notificationsOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
              }}
              title="Notifications"
            >
              🔔
              {notifications.filter((n) => !n.read).length > 0 && (
                <span style={styles.badge}>{notifications.filter((n) => !n.read).length}</span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div style={{ ...styles.dropdown, ...styles.notificationDropdown }} ref={notificationsRef}>
                <div style={styles.notificationHeader}>
                  <h3 style={styles.notificationTitle}>Notifications</h3>
                  <span style={styles.notificationClearAll}>Tout marquer comme lu</span>
                </div>
                <div>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        style={{
                          ...styles.notificationItem,
                          ...(notification.read ? {} : styles.notificationUnread),
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = notification.read ? "transparent" : "#FFF5F0"
                        }}
                      >
                        <div style={styles.notificationIcon}>
                          {notification.type === "message" ? "✉️" : notification.type === "offer" ? "💰" : "🔔"}
                        </div>
                        <div style={styles.notificationContent}>
                          <p style={styles.notificationText}>{notification.text}</p>
                          <span style={styles.notificationTime}>{notification.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>Aucune notification</div>
                  )}
                </div>
                <div style={styles.notificationFooter}>
                  <Link to="/notifications" style={styles.notificationViewAll}>
                    Voir toutes les notifications
                  </Link>
                </div>
              </div>
            )}

            {/* Quick action button - Sell */}
            <Link
              to="/post-annonce"
              style={{
                ...styles.link,
                backgroundColor: "#4CAF50",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "8px 16px",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#3d9140"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#4CAF50"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <span style={{ fontSize: "18px" }}>+</span> Vendre
            </Link>
          </>
        )}

        {user ? (
          <div style={styles.userSection}>
            {/* User avatar with dropdown */}
            <img
              src={user.avatar || defaultAvatar}
              alt="Profile"
              style={{
                ...styles.avatar,
                ...(dropdownOpen ? styles.avatarActive : {}),
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseOver={(e) => {
                if (!dropdownOpen) e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseOut={(e) => {
                if (!dropdownOpen) e.currentTarget.style.transform = "scale(1)"
              }}
            />

            {/* User dropdown menu */}
            {dropdownOpen && (
              <div style={styles.dropdown} ref={dropdownRef}>
                <div style={styles.dropdownHeader}>
                  <img src={user.avatar || defaultAvatar} alt="Profile" style={styles.dropdownAvatar} />
                  <div style={styles.dropdownUserInfo}>
                    <span style={styles.dropdownUsername}>{user.username}</span>
                    <span style={styles.dropdownEmail}>{user.email}</span>
                  </div>
                </div>
                <div style={styles.dropdownMenu}>
                  <Link
                    to="/my-account"
                    style={styles.dropdownItem}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>👤</span> Mon profil
                  </Link>
                  <Link
                    to="/annonces/mine"
                    style={styles.dropdownItem}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>📋</span> Mes annonces
                  </Link>
                  <Link
                    to="/messages"
                    style={styles.dropdownItem}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>✉️</span> Messages
                  </Link>
                  <Link
                    to="/favorites"
                    style={styles.dropdownItem}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>❤️</span> Favoris
                  </Link>
                  <div style={styles.dropdownDivider}></div>
                  <Link
                    to="/settings"
                    style={styles.dropdownItem}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>⚙️</span> Paramètres
                  </Link>
                  <div
                    style={styles.dropdownItem}
                    onClick={logout}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span>🚪</span> Se déconnecter
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.userSection}>
            <Link
              to="/register"
              style={{
                ...styles.link,
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "4px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Inscription
            </Link>
            <Link
              to="/login"
              style={{
                ...styles.link,
                backgroundColor: "white",
                color: "#FF6B35",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
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

