"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// Modifier la largeur du sidebar pour qu'il disparaisse complètement quand fermé
// et ajuster le positionnement de la flèche pour rouvrir
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const [expandedMenus, setExpandedMenus] = useState({
    annonces: true,
    communication: false,
    account: false,
    settings: false,
  })

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu],
    })
  }

  const menuItems = [
    {
      category: "annonces",
      title: "Annonces",
      icon: "📦",
      items: [
        { name: "Accueil", path: "/", icon: "🏠" },
        { name: "Catégories", path: "/categories", icon: "📂" },
        { name: "Favoris", path: "/favorites", icon: "❤️" },
        { name: "Mes annonces", path: "/annonces/mine", icon: "📋" },
        { name: "Publier une annonce", path: "/post-annonce", icon: "➕" },
        { name: "Recherches sauvegardées", path: "/saved-searches", icon: "🔍" },
      ],
    },
    {
      category: "communication",
      title: "Communication",
      icon: "💬",
      items: [
        { name: "Messages", path: "/messages", icon: "✉️" },
        { name: "Commentaires", path: "/comments", icon: "💭" },
        { name: "Avis", path: "/reviews", icon: "⭐" },
        { name: "Notifications", path: "/notifications", icon: "🔔" },
      ],
    },
    {
      category: "account",
      title: "Mon compte",
      icon: "👤",
      items: [
        { name: "Transactions", path: "/transactions", icon: "💰" },
        { name: "Abonnements", path: "/subscriptions", icon: "🔄" },
        { name: "Coupons", path: "/coupons", icon: "🎟️" },
        { name: "Historique", path: "/annonce-history", icon: "📜" },
        { name: "Sessions", path: "/sessions", icon: "🔑" },
      ],
    },
    {
      category: "settings",
      title: "Paramètres",
      icon: "⚙️",
      items: [
        { name: "Paramètres", path: "/settings", icon: "⚙️" },
        { name: "Options d'expédition", path: "/shipping-options", icon: "🚚" },
        { name: "Support", path: "/support-tickets", icon: "🆘" },
        { name: "Signalements", path: "/reports", icon: "🚩" },
        { name: "Activité", path: "/activity-logs", icon: "📊" },
      ],
    },
  ]

  return (
    <>
      {/* Bouton pour ouvrir le sidebar quand il est fermé */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "0",
            backgroundColor: "#2A2A2A",
            color: "#fff",
            width: "30px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "0 8px 8px 0",
            boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
            zIndex: 1001,
            transition: "all 0.3s ease",
            border: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "none",
          }}
          onClick={toggleSidebar}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3A3A3A"
            e.currentTarget.style.width = "35px"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2A2A2A"
            e.currentTarget.style.width = "30px"
          }}
        >
          <span style={{ fontSize: "16px" }}>▶</span>
        </div>
      )}

      {/* Le sidebar lui-même */}
      <div
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{
          width: isOpen ? "280px" : "0",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#2A2A2A",
          color: "#fff",
          transition: "all 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
          overflowX: "hidden",
          paddingTop: "70px",
          boxShadow: isOpen ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
          borderRight: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "10px",
              cursor: "pointer",
              zIndex: 1001,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              opacity: 0.8,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
              e.currentTarget.style.opacity = 1
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              e.currentTarget.style.opacity = 0.8
            }}
            onClick={toggleSidebar}
          >
            ◀
          </div>
        )}

        {user && isOpen && (
          <div
            style={{
              padding: "15px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <img
              src={user.avatar || "https://i.pravatar.cc/150?img=3"}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #FF6B35",
              }}
            />
            <div>
              <div style={{ fontWeight: "600" }}>{user.username}</div>
              <div style={{ fontSize: "12px", color: "#ccc" }}>{user.email}</div>
            </div>
          </div>
        )}

        <div style={{ padding: "0 15px" }}>
          {menuItems.map((menu) => (
            <div key={menu.category} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: expandedMenus[menu.category] ? "rgba(255, 107, 53, 0.2)" : "transparent",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
                onClick={() => toggleMenu(menu.category)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{menu.icon}</span>
                  <span style={{ fontWeight: "600" }}>{menu.title}</span>
                </div>
                <span>{expandedMenus[menu.category] ? "▼" : "▶"}</span>
              </div>

              {expandedMenus[menu.category] && (
                <div style={{ marginLeft: "15px" }}>
                  {menu.items.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "8px 10px",
                          textDecoration: "none",
                          color: isActive ? "#FF6B35" : "#fff",
                          borderRadius: "6px",
                          backgroundColor: isActive ? "rgba(255, 107, 53, 0.1)" : "transparent",
                          marginBottom: "5px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent"
                          }
                        }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "20px",
            marginTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#FF6B35",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#E55A25"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6B35"
            }}
          >
            <Link
              to="/post-annonce"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "white",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "18px" }}>+</span>
              <span>Publier une annonce</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

