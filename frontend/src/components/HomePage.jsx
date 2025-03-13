"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Sidebar from "./Sidebar"

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Handle scroll for subtle UI changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize() // Set initial state
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Determine if mobile view
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: "#333",
      backgroundColor: "#FAFAFA",
      minHeight: "100vh",
      marginLeft: sidebarOpen ? "280px" : "0",
      transition: "margin-left 0.3s ease",
    },
    section: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "40px 20px" : "60px 30px",
      position: "relative",
    },
    heroSection: {
      background: "linear-gradient(135deg, #FF6B35 0%, #FF8C61 100%)",
      color: "white",
      borderRadius: "0 0 30px 30px",
      padding: isMobile ? "40px 20px 60px" : "80px 30px 100px",
      marginBottom: isMobile ? "40px" : "60px",
      position: "relative",
      overflow: "hidden",
    },
    heroPattern: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage:
        "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 8%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 8%)",
      backgroundSize: "60px 60px",
      opacity: 0.6,
      zIndex: 0,
    },
    heroContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: isMobile ? "30px" : "60px",
      position: "relative",
      zIndex: 1,
    },
    heroText: {
      flex: isMobile ? "1" : "0.6",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    heroTitle: {
      fontSize: isMobile ? "32px" : "48px",
      fontWeight: "800",
      lineHeight: "1.2",
      margin: "0",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    heroSubtitle: {
      fontSize: isMobile ? "16px" : "18px",
      lineHeight: "1.6",
      margin: "0",
      opacity: "0.9",
      maxWidth: "500px",
    },
    heroImage: {
      flex: isMobile ? "1" : "0.4",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transform: "perspective(1000px) rotateY(-5deg)",
      transition: "transform 0.5s ease",
      height: isMobile ? "200px" : "350px",
      width: "100%",
    },
    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "14px 28px",
      backgroundColor: "white",
      color: "#FF6B35",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textDecoration: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      gap: "8px",
      width: "fit-content",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    },
    buttonIcon: {
      fontSize: "20px",
    },
    sectionTitle: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "700",
      color: "#333",
      marginBottom: "40px",
      position: "relative",
      display: "inline-block",
    },
    sectionTitleUnderline: {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "0",
      width: "60px",
      height: "4px",
      backgroundColor: "#FF6B35",
      borderRadius: "2px",
    },
    trendGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
      gap: isMobile ? "16px" : "24px",
      marginBottom: "60px",
    },
    trendItem: {
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    trendItemHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    },
    trendImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    trendImageHover: {
      transform: "scale(1.05)",
    },
    trendContent: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: "1",
    },
    trendName: {
      margin: "0",
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
    },
    trendDescription: {
      margin: "0",
      fontSize: "14px",
      color: "#666",
      lineHeight: "1.5",
    },
    categorySection: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: isMobile ? "30px 20px" : "50px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      marginBottom: "60px",
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: "20px",
    },
    categoryCard: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      height: "200px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    categoryCardHover: {
      transform: "scale(1.03)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    categoryImageHover: {
      transform: "scale(1.1)",
    },
    categoryOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "20px",
      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
      color: "white",
      transition: "all 0.3s ease",
    },
    categoryOverlayHover: {
      padding: "30px 20px",
    },
    categoryName: {
      margin: "0",
      fontSize: "20px",
      fontWeight: "600",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    featuredSection: {
      marginBottom: "60px",
    },
    featuredGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: "30px",
    },
    featuredCard: {
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
    },
    featuredCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    },
    featuredImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    featuredImageHover: {
      transform: "scale(1.05)",
    },
    featuredContent: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      flex: "1",
    },
    featuredTitle: {
      margin: "0",
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
    },
    featuredPrice: {
      margin: "0",
      fontSize: "20px",
      fontWeight: "700",
      color: "#FF6B35",
    },
    featuredMeta: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "auto",
      paddingTop: "15px",
      borderTop: "1px solid #eee",
    },
    featuredLocation: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "#666",
      fontSize: "14px",
    },
    featuredDate: {
      color: "#999",
      fontSize: "14px",
    },
    badge: {
      display: "inline-block",
      padding: "6px 12px",
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    footer: {
      backgroundColor: "#333",
      color: "white",
      padding: isMobile ? "40px 20px" : "60px 30px",
      borderRadius: "20px 20px 0 0",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      gap: isMobile ? "30px" : "0",
    },
    footerColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    footerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: "0 0 10px 0",
    },
    footerLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.2s ease",
    },
    footerLinkHover: {
      color: "white",
    },
    footerBottom: {
      maxWidth: "1200px",
      margin: "40px auto 0",
      paddingTop: "20px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "center" : "flex-start",
      gap: isMobile ? "15px" : "0",
      color: "rgba(255,255,255,0.5)",
      fontSize: "14px",
    },
    socialLinks: {
      display: "flex",
      gap: "15px",
    },
    socialIcon: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    socialIconHover: {
      backgroundColor: "rgba(255,255,255,0.2)",
      transform: "translateY(-3px)",
    },
    searchBar: {
      display: "flex",
      maxWidth: "500px",
      margin: "30px 0",
      position: "relative",
      zIndex: 1,
    },
    searchInput: {
      flex: "1",
      padding: "16px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px 0 0 8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      outline: "none",
    },
    searchButton: {
      padding: "0 20px",
      backgroundColor: "white",
      color: "#FF6B35",
      border: "none",
      borderRadius: "0 8px 8px 0",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    categoryTabs: {
      display: "flex",
      overflowX: "auto",
      gap: "10px",
      marginBottom: "30px",
      padding: "5px 0",
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE and Edge
      "::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Opera
      },
    },
    categoryTab: {
      padding: "10px 20px",
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    categoryTabActive: {
      backgroundColor: "white",
      color: "#FF6B35",
    },
    categoryTabHover: {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    statsSection: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "60px",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "20px",
      flex: "1",
      minWidth: isMobile ? "120px" : "150px",
    },
    statNumber: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#FF6B35",
      margin: "0",
    },
    statLabel: {
      fontSize: "14px",
      color: "#666",
      textAlign: "center",
      margin: "0",
    },
    ctaSection: {
      backgroundColor: "#F5F7FA",
      borderRadius: "12px",
      padding: "40px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "30px",
      marginBottom: "60px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    },
    ctaText: {
      flex: "0.6",
    },
    ctaTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#333",
      margin: "0 0 15px 0",
    },
    ctaDescription: {
      fontSize: "16px",
      color: "#666",
      margin: "0",
      lineHeight: "1.6",
    },
    ctaButtons: {
      flex: "0.4",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "15px",
      justifyContent: "flex-end",
      width: isMobile ? "100%" : "auto",
    },
    ctaButton: {
      padding: "14px 28px",
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textDecoration: "none",
      textAlign: "center",
    },
    ctaButtonSecondary: {
      backgroundColor: "transparent",
      color: "#FF6B35",
      border: "1px solid #FF6B35",
    },
    mobileMenuButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#FF6B35",
      color: "white",
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
      zIndex: 999,
      cursor: "pointer",
    },
  }

  // Sample data for trends
  const trends = [
    {
      name: "Mobilier de jardin",
      image: "https://source.unsplash.com/400x300/?garden,furniture",
      description: "Aménagez votre extérieur avec style",
    },
    {
      name: "Vélos",
      image: "https://source.unsplash.com/400x300/?bike,cycling",
      description: "Pour vos déplacements ou vos loisirs",
    },
    {
      name: "Vacances insolites",
      image: "https://source.unsplash.com/400x300/?vacation,unusual",
      description: "Découvrez des hébergements uniques",
    },
    {
      name: "Réalité virtuelle",
      image: "https://source.unsplash.com/400x300/?vr,technology",
      description: "Plongez dans des univers immersifs",
    },
  ]

  // Sample data for categories
  const categories = [
    { name: "Voitures", image: "https://source.unsplash.com/400x300/?car,automobile" },
    { name: "Immobilier", image: "https://source.unsplash.com/400x300/?real-estate,house" },
    { name: "Maison", image: "https://source.unsplash.com/400x300/?furniture,home" },
    { name: "Multimédia", image: "https://source.unsplash.com/400x300/?multimedia,technology" },
  ]

  // Sample data for featured ads
  const featuredAds = [
    {
      title: "iPhone 13 Pro - Excellent état",
      price: "750 €",
      location: "Paris",
      date: "Aujourd'hui",
      image: "https://source.unsplash.com/400x300/?iphone",
      badge: "Populaire",
    },
    {
      title: "Canapé d'angle convertible",
      price: "450 €",
      location: "Lyon",
      date: "Hier",
      image: "https://source.unsplash.com/400x300/?sofa",
    },
    {
      title: "VTT Scott Aspect 950",
      price: "580 €",
      location: "Marseille",
      date: "Il y a 2 jours",
      image: "https://source.unsplash.com/400x300/?mountain,bike",
      badge: "Bon état",
    },
  ]

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroPattern}></div>
          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <h1 style={styles.heroTitle}>C'est le moment de vendre</h1>
              <p style={styles.heroSubtitle}>
                Profitez de notre communauté pour vendre rapidement vos articles et donner une seconde vie à vos objets.
              </p>

              <div style={styles.categoryTabs}>
                {["Toutes catégories", "Véhicules", "Immobilier", "Multimédia", "Maison", "Loisirs", "Mode"].map(
                  (cat, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.categoryTab,
                        ...(activeCategory === index ? styles.categoryTabActive : {}),
                      }}
                      onMouseOver={(e) => {
                        if (activeCategory !== index) {
                          e.target.style.backgroundColor = "rgba(255,255,255,0.2)"
                        }
                      }}
                      onMouseOut={(e) => {
                        if (activeCategory !== index) {
                          e.target.style.backgroundColor = "rgba(255,255,255,0.1)"
                        }
                      }}
                      onClick={() => setActiveCategory(index)}
                    >
                      {cat}
                    </div>
                  ),
                )}
              </div>

              <div style={styles.searchBar}>
                <input type="text" placeholder="Que recherchez-vous ?" style={styles.searchInput} />
                <button style={styles.searchButton}>Rechercher</button>
              </div>

              <Link
                to="/post-annonce"
                style={styles.button}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)"
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <span style={styles.buttonIcon}>+</span> Déposer une annonce
              </Link>
            </div>

            <div
              style={styles.heroImage}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg)"
                const img = e.currentTarget.querySelector("img")
                if (img) img.style.transform = "scale(1.05)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg)"
                const img = e.currentTarget.querySelector("img")
                if (img) img.style.transform = "scale(1)"
              }}
            >
              <img
                src="https://static-rules.leboncoin.fr/landingPageAssets/hero-leboncoin.jpg"
                alt="Vendre et acheter facilement"
                style={styles.heroImg}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ ...styles.section, ...styles.statsSection }}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>10M+</h3>
            <p style={styles.statLabel}>Utilisateurs actifs</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>800K</h3>
            <p style={styles.statLabel}>Nouvelles annonces par jour</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>30M</h3>
            <p style={styles.statLabel}>Transactions par an</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>4.8/5</h3>
            <p style={styles.statLabel}>Note moyenne</p>
          </div>
        </section>

        {/* Trends Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Tendance en ce moment
            <div style={styles.sectionTitleUnderline}></div>
          </h2>
          <div style={styles.trendGrid}>
            {trends.map((trend, index) => (
              <div
                key={index}
                style={styles.trendItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)"
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1.05)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1)"
                }}
              >
                <img src={trend.image || "/placeholder.svg"} alt={trend.name} style={styles.trendImage} />
                <div style={styles.trendContent}>
                  <h3 style={styles.trendName}>{trend.name}</h3>
                  <p style={styles.trendDescription}>{trend.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ ...styles.section, ...styles.ctaSection }}>
          <div style={styles.ctaText}>
            <h2 style={styles.ctaTitle}>Vous avez des objets qui ne vous servent plus ?</h2>
            <p style={styles.ctaDescription}>
              Donnez-leur une seconde vie et gagnez de l'argent en les vendant sur notre plateforme. C'est simple,
              rapide et sécurisé !
            </p>
          </div>
          <div style={styles.ctaButtons}>
            <Link
              to="/post-annonce"
              style={styles.ctaButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
            >
              Vendre maintenant
            </Link>
            <Link
              to="/how-it-works"
              style={{ ...styles.ctaButton, ...styles.ctaButtonSecondary }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255,107,53,0.1)"
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent"
              }}
            >
              Comment ça marche
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{ ...styles.section, ...styles.categorySection }}>
          <h2 style={styles.sectionTitle}>
            Top catégories
            <div style={styles.sectionTitleUnderline}></div>
          </h2>
          <div style={styles.categoryGrid}>
            {categories.map((category, index) => (
              <div
                key={index}
                style={styles.categoryCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)"
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1.1)"
                  const overlay = e.currentTarget.querySelector("div")
                  if (overlay) overlay.style.padding = "30px 20px"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1)"
                  const overlay = e.currentTarget.querySelector("div")
                  if (overlay) overlay.style.padding = "20px"
                }}
              >
                <img src={category.image || "/placeholder.svg"} alt={category.name} style={styles.categoryImage} />
                <div style={styles.categoryOverlay}>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Ads Section */}
        <section style={{ ...styles.section, ...styles.featuredSection }}>
          <h2 style={styles.sectionTitle}>
            Annonces à la une
            <div style={styles.sectionTitleUnderline}></div>
          </h2>
          <div style={styles.featuredGrid}>
            {featuredAds.map((ad, index) => (
              <div
                key={index}
                style={styles.featuredCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)"
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1.05)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"
                  const img = e.currentTarget.querySelector("img")
                  if (img) img.style.transform = "scale(1)"
                }}
              >
                <img src={ad.image || "/placeholder.svg"} alt={ad.title} style={styles.featuredImage} />
                <div style={styles.featuredContent}>
                  {ad.badge && <span style={styles.badge}>{ad.badge}</span>}
                  <h3 style={styles.featuredTitle}>{ad.title}</h3>
                  <p style={styles.featuredPrice}>{ad.price}</p>
                  <div style={styles.featuredMeta}>
                    <div style={styles.featuredLocation}>
                      <span>📍</span> {ad.location}
                    </div>
                    <div style={styles.featuredDate}>{ad.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>LeBonCoinLike</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                La plateforme de référence pour acheter et vendre entre particuliers en France.
              </p>
            </div>

            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Liens utiles</h3>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                À propos
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Comment ça marche
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Sécurité
              </a>
            </div>

            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Informations légales</h3>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Conditions d'utilisation
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Cookies
              </a>
            </div>

            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Aide & Contact</h3>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Centre d'aide
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Nous contacter
              </a>
              <a
                href="#"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                Signaler un problème
              </a>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div>© 2023 - LeBonCoinLike. Tous droits réservés.</div>

            <div style={styles.socialLinks}>
              <div
                style={styles.socialIcon}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
                  e.currentTarget.style.transform = "translateY(-3px)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <span>f</span>
              </div>
              <div
                style={styles.socialIcon}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
                  e.currentTarget.style.transform = "translateY(-3px)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <span>t</span>
              </div>
              <div
                style={styles.socialIcon}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
                  e.currentTarget.style.transform = "translateY(-3px)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <span>in</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile menu toggle button */}
      {isMobile && (
        <div style={styles.mobileMenuButton} onClick={toggleSidebar}>
          {sidebarOpen ? "✕" : "☰"}
        </div>
      )}
    </>
  )
}

export default HomePage

