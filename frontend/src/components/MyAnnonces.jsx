"use client";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import Carousel from "./Carousel"; // <-- Import du composant Carousel

function MyAnnonces() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "0 20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    createButton: {
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
    },
    grid: {
      display: "grid",
      gap: "25px",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    },
    card: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.3s, box-shadow 0.3s",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    },
    cardImage: {
      height: "180px",
      backgroundColor: "#f5f5f5",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    price: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
      backgroundColor: "#FF6B35",
      color: "white",
      padding: "5px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
    cardContent: {
      padding: "15px",
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0 0 10px 0",
      color: "#333",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#666",
      margin: "0 0 15px 0",
      flex: "1",
      lineHeight: "1.5",
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #eee",
      padding: "12px 15px",
      backgroundColor: "#f9f9f9",
    },
    location: {
      fontSize: "13px",
      color: "#666",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    date: {
      fontSize: "13px",
      color: "#888",
    },
    actions: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    actionButton: {
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      border: "none",
      transition: "background-color 0.2s",
    },
    editButton: {
      backgroundColor: "#f0f0f0",
      color: "#555",
    },
    deleteButton: {
      backgroundColor: "#ffebee",
      color: "#d32f2f",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    activeStatus: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
    },
    pendingStatus: {
      backgroundColor: "#fff8e1",
      color: "#f57c00",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px 0",
      color: "#777",
    },
    errorContainer: {
      backgroundColor: "#FFEBEE",
      color: "#D32F2F",
      padding: "15px 20px",
      borderRadius: "4px",
      marginTop: "20px",
    },
    emptyContainer: {
      textAlign: "center",
      padding: "50px 0",
      color: "#777",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "15px",
      color: "#ddd",
    },
    stats: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    statCard: {
      flex: "1",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#FF6B35",
      margin: "0 0 5px 0",
    },
    statLabel: {
      fontSize: "14px",
      color: "#666",
    },
  };

  // Charger les annonces
  useEffect(() => {
    setLoading(true);
    api
      .get("/annonces/mine")
      .then((res) => {
        setAnnonces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger vos annonces. Veuillez réessayer plus tard.");
        setLoading(false);
      });
  }, []);

  // Supprimer une annonce
  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      api
        .delete(`/annonces/${id}`)
        .then(() => {
          setAnnonces((prev) => prev.filter((a) => a.id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la suppression de l'annonce");
        });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Truncate text
  const truncate = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Calcul stats
  const totalAnnonces = annonces.length;
  const annoncesActives = annonces.filter((a) => a.status === "active").length;
  const vuesTotales = Math.floor(Math.random() * 100); // exemple

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mes Annonces</h2>
        <Link
          to="/post-ad"
          style={styles.createButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
        >
          <span style={{ fontSize: "18px" }}>+</span> Créer une annonce
        </Link>
      </div>

      {/* Stats section */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{totalAnnonces}</div>
          <div style={styles.statLabel}>Annonces publiées</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{annoncesActives}</div>
          <div style={styles.statLabel}>Annonces actives</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{vuesTotales}</div>
          <div style={styles.statLabel}>Vues totales</div>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>Chargement de vos annonces...</div>
      ) : error ? (
        <div style={styles.errorContainer}>{error}</div>
      ) : annonces.length === 0 ? (
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>📦</div>
          <p>Vous n'avez pas encore d'annonces</p>
          <p>Créez votre première annonce pour commencer à vendre</p>
          <Link
            to="/post-ad"
            style={{
              ...styles.createButton,
              display: "inline-block",
              marginTop: "20px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
          >
            Créer une annonce
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {annonces.map((a) => {
            // On parse le champ "images" (JSON ou chaîne)
            let images = [];
            if (a.images) {
              try {
                images = JSON.parse(a.images); // ex. ["uploads/image1.jpg","uploads/image2.png"]
              } catch (e) {
                images = [a.images.replace(/\\/g, "/")];
              }
            }

            return (
              <div
                key={a.id}
                style={styles.card}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                {/* Zone d'image */}
                <div style={styles.cardImage}>
                  {images.length > 1 ? (
                    // Si plusieurs images, on affiche le carrousel
                    <Carousel images={images} />
                  ) : images.length === 1 ? (
                    // Une seule image
                    <img
                      src={`http://localhost:5000/${images[0]}`}
                      alt={a.title}
                      style={styles.image}
                    />
                  ) : (
                    // Aucune image
                    <img
                      src="https://source.unsplash.com/400x300/?product"
                      alt={a.title}
                      style={styles.image}
                    />
                  )}
                  <div style={styles.price}>{a.price} €</div>
                </div>

                {/* Contenu texte */}
                <div style={styles.cardContent}>
                  <div
                    style={{
                      ...styles.statusBadge,
                      ...(a.status === "active"
                        ? styles.activeStatus
                        : styles.pendingStatus),
                    }}
                  >
                    {a.status === "active" ? "Active" : "En attente"}
                  </div>
                  <h3 style={styles.cardTitle}>{a.title}</h3>
                  <p style={styles.cardDescription}>{truncate(a.description, 100)}</p>

                  <div style={styles.actions}>
                    <Link
                      to={`/edit-ad/${a.id}`}
                      style={{
                        ...styles.actionButton,
                        ...styles.editButton,
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                    >
                      Modifier
                    </Link>
                    <button
                      style={{
                        ...styles.actionButton,
                        ...styles.deleteButton,
                      }}
                      onClick={() => handleDelete(a.id)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#ffcdd2")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#ffebee")}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                {/* Pied de card : localisation + date */}
                <div style={styles.cardFooter}>
                  <div style={styles.location}>{a.location}</div>
                  <div style={styles.date}>
                    {a.created_at ? formatDate(a.created_at) : "Date inconnue"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyAnnonces;
