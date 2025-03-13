"use client"
import { Link } from "react-router-dom"

const HomePage = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heroSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#f8f9fa",
      marginBottom: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    heroContent: {
      padding: "40px",
      flex: "1",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    heroTitle: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    heroSubtitle: {
      fontSize: "18px",
      color: "#666",
      margin: "0",
      lineHeight: "1.5",
    },
    heroImage: {
      flex: "1",
      height: "400px",
      overflow: "hidden",
    },
    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    button: {
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      padding: "14px 24px",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "inline-block",
      textDecoration: "none",
      textAlign: "center",
      maxWidth: "200px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "24px",
      position: "relative",
      paddingBottom: "10px",
    },
    sectionTitleAfter: {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "60px",
      height: "3px",
      backgroundColor: "#FF6B35",
    },
    trendSection: {
      marginBottom: "60px",
    },
    trendGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    trendItem: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      backgroundColor: "white",
    },
    trendImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
    },
    trendName: {
      padding: "15px",
      margin: "0",
      fontSize: "16px",
      fontWeight: "500",
      color: "#333",
      textAlign: "center",
    },
    categorySection: {
      marginBottom: "60px",
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "25px",
    },
    categoryCard: {
      position: "relative",
      borderRadius: "8px",
      overflow: "hidden",
      height: "200px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.3s",
      cursor: "pointer",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    categoryOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "20px",
      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
      color: "white",
    },
    categoryName: {
      margin: "0",
      fontSize: "18px",
      fontWeight: "bold",
    },
    footer: {
      borderTop: "1px solid #eee",
      padding: "30px 0",
      marginTop: "40px",
      textAlign: "center",
      color: "#666",
    },
    footerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    footerLinks: {
      display: "flex",
      gap: "20px",
    },
    footerLink: {
      color: "#666",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.2s",
    },
    copyright: {
      fontSize: "14px",
      margin: "0",
    },
    // Media queries would be handled with JavaScript in this case
    "@media (max-width: 768px)": {
      heroSection: {
        flexDirection: "column",
      },
      heroImage: {
        width: "100%",
        height: "250px",
      },
    },
  }

  // Function to handle hover effects
  const handleItemHover = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-5px)"
      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)"
    } else {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"
    }
  }

  // Function to handle button hover
  const handleButtonHover = (e, enter) => {
    e.currentTarget.style.backgroundColor = enter ? "#E55A25" : "#FF6B35"
  }

  // Responsive adjustments
  const isMobile = window.innerWidth <= 768

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section
        style={{
          ...styles.heroSection,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>C'est le moment de vendre</h1>
          <p style={styles.heroSubtitle}>
            Profitez de notre communauté pour vendre rapidement vos articles et donner une seconde vie à vos objets.
          </p>
          <Link
            to="/post-annonce"
            style={styles.button}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Déposer une annonce
          </Link>
        </div>
        <div
          style={{
            ...styles.heroImage,
            height: isMobile ? "250px" : "400px",
          }}
        >
          <img
            src="https://static-rules.leboncoin.fr/landingPageAssets/hero-leboncoin.jpg"
            alt="Vendre et acheter facilement"
            style={styles.heroImg}
          />
        </div>
      </section>

      {/* Trends Section */}
      <section style={styles.trendSection}>
        <h2 style={styles.sectionTitle}>
          Tendance en ce moment
          <div style={styles.sectionTitleAfter}></div>
        </h2>
        <div style={styles.trendGrid}>
          {[
            { name: "Mobilier de jardin", img: "https://source.unsplash.com/400x300/?garden,furniture" },
            { name: "Vélos", img: "https://source.unsplash.com/400x300/?bike,cycling" },
            { name: "Vacances insolites", img: "https://source.unsplash.com/400x300/?vacation,unusual" },
            { name: "Réalité virtuelle", img: "https://source.unsplash.com/400x300/?vr,technology" },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.trendItem}
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <img src={item.img || "/placeholder.svg"} alt={item.name} style={styles.trendImage} />
              <p style={styles.trendName}>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>
          Top catégories
          <div style={styles.sectionTitleAfter}></div>
        </h2>
        <div style={styles.categoryGrid}>
          {[
            { name: "Voitures", img: "https://source.unsplash.com/400x300/?car,automobile" },
            { name: "Immobilier", img: "https://source.unsplash.com/400x300/?real-estate,house" },
            { name: "Maison", img: "https://source.unsplash.com/400x300/?furniture,home" },
            { name: "Multimédia", img: "https://source.unsplash.com/400x300/?multimedia,technology" },
          ].map((category, index) => (
            <div
              key={index}
              style={styles.categoryCard}
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <img src={category.img || "/placeholder.svg"} alt={category.name} style={styles.categoryImage} />
              <div style={styles.categoryOverlay}>
                <p style={styles.categoryName}>{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ads Section (New) */}
      <section style={styles.trendSection}>
        <h2 style={styles.sectionTitle}>
          Annonces à la une
          <div style={styles.sectionTitleAfter}></div>
        </h2>
        <div style={styles.trendGrid}>
          {[
            {
              title: "iPhone 13 Pro - Excellent état",
              price: "750 €",
              location: "Paris",
              img: "https://source.unsplash.com/400x300/?iphone",
            },
            {
              title: "Canapé d'angle convertible",
              price: "450 €",
              location: "Lyon",
              img: "https://source.unsplash.com/400x300/?sofa",
            },
            {
              title: "VTT Scott Aspect 950",
              price: "580 €",
              location: "Marseille",
              img: "https://source.unsplash.com/400x300/?mountain,bike",
            },
            {
              title: "Appartement 3 pièces - 65m²",
              price: "295 000 €",
              location: "Bordeaux",
              img: "https://source.unsplash.com/400x300/?apartment",
            },
          ].map((ad, index) => (
            <div
              key={index}
              style={{
                ...styles.trendItem,
                padding: "0 0 15px 0",
              }}
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <img src={ad.img || "/placeholder.svg"} alt={ad.title} style={styles.trendImage} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{ad.title}</h3>
                <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#FF6B35" }}>{ad.price}</p>
                <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>{ad.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLinks}>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              À propos
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              Conditions d'utilisation
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              Confidentialité
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              Aide
            </a>
          </div>
          <p style={styles.copyright}>&copy; 2023 - LeBonCoinLike</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

