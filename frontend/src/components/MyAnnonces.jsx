"use client";

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import Carousel from "./Carousel"; // Composant carrousel pour les images multiples

function MyAnnonces() {
  // État principal
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Onglet actif : "online" ou "expired"
  const [tab, setTab] = useState("online");

  // Recherche / Filtres
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Récupération du contexte (si besoin de user, token, etc.)
  const { user } = useContext(AuthContext);

  // Charger les annonces au montage
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

  // Filtrer en fonction de l’onglet (online vs expired) et de la recherche
  const filteredAnnonces = annonces.filter((a) => {
    // Suppose qu’un statut "expired" existe pour les annonces expirées
    const isExpired = a.status === "expired";

    // Gérer l’onglet
    if (tab === "online" && isExpired) return false;
    if (tab === "expired" && !isExpired) return false;

    // Filtrer par recherche (titre + description)
    const inTitle = a.title?.toLowerCase().includes(search.toLowerCase());
    const inDesc = a.description?.toLowerCase().includes(search.toLowerCase());
    if (!(inTitle || inDesc)) return false;

    // Filtrer par catégorie (si a.category_id existe)
    if (category && a.category_id !== Number(category)) {
      return false;
    }
    return true;
  });

  // Supprimer une annonce
  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      api
        .delete(`/annonces/${id}`)
        .then(() => {
          setAnnonces((prev) => prev.filter((ann) => ann.id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la suppression de l'annonce");
        });
    }
  };

  // Actions multiples (exemples)
  const handleRemonter = () => {
    alert("Remontez votre annonce (sélection multiple à implémenter)");
  };
  const handleVendezPlusVite = () => {
    alert("Vendez plus vite (sélection multiple à implémenter)");
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Troncature
  const truncate = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Calcul stats
  const totalAnnonces = annonces.length;
  const annoncesActives = annonces.filter((a) => a.status === "active").length;
  const vuesTotales = Math.floor(Math.random() * 100);

  // Nombre d'annonces expirées
  const expiredCount = annonces.filter((a) => a.status === "expired").length;
  const onlineCount = totalAnnonces - expiredCount;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Mes annonces</h1>

      {/* Barre d'onglets + recherche */}
      <div style={styles.navBar}>
        <ul style={styles.tabList}>
          <li
            style={tab === "online" ? styles.tabActive : styles.tab}
            onClick={() => setTab("online")}
          >
            En ligne ({onlineCount})
          </li>
          <li
            style={tab === "expired" ? styles.tabActive : styles.tab}
            onClick={() => setTab("expired")}
          >
            Expirées ({expiredCount})
          </li>
        </ul>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Recherchez dans vos annonces"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>Rechercher</button>
        </div>

        <div style={styles.filters}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">Catégories</option>
            <option value="1">Véhicules</option>
            <option value="2">Multimédia</option>
            <option value="3">Immobilier</option>
          </select>
          <button style={styles.searchButton}>Rechercher</button>
        </div>
      </div>

      {/* Barre d'actions (Remontez votre annonce, etc.) */}
      <div style={styles.actionsBar}>
        <button style={styles.actionBtn} onClick={handleRemonter}>
          Remontez votre annonce
        </button>
        <button style={styles.actionBtn} onClick={() => alert("À la une")}>
          À la une
        </button>
        <button style={styles.actionBtn} onClick={() => alert("Logo Urgent")}>
          Logo Urgent
        </button>
        <button style={styles.actionBtn} onClick={handleVendezPlusVite}>
          Vendez plus vite
        </button>
        <button style={styles.actionBtn} onClick={() => alert("Modifier multiple")}>
          Modifier
        </button>
        <button style={styles.actionBtn} onClick={() => alert("Supprimer multiple")}>
          Supprimer
        </button>
      </div>

      {/* Stats */}
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

      {/* Corps */}
      {loading ? (
        <div style={styles.loading}>Chargement de vos annonces...</div>
      ) : error ? (
        <div style={styles.errorMsg}>{error}</div>
      ) : filteredAnnonces.length === 0 ? (
        <div style={styles.emptyMsg}>
          <p>Aucune annonce ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredAnnonces.map((a) => {
            // Parser le champ images
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
                    // Carrousel
                    <Carousel images={images} />
                  ) : images.length === 1 ? (
                    <img
                      src={`http://localhost:5000/${images[0]}`}
                      alt={a.title}
                      style={styles.image}
                    />
                  ) : (
                    <img
                      src="https://source.unsplash.com/400x300/?product"
                      alt={a.title}
                      style={styles.image}
                    />
                  )}
                  <div style={styles.price}>{a.price} €</div>
                </div>

                {/* Contenu */}
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

                {/* Pied de card */}
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

// Styles
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    padding: "20px 0",
  },
  pageTitle: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  navBar: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  tabList: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  tab: {
    cursor: "pointer",
    color: "#777",
    padding: "5px 10px",
    borderRadius: "4px",
  },
  tabActive: {
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#333",
    fontWeight: "bold",
    border: "1px solid #ddd",
    padding: "5px 10px",
    borderRadius: "4px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  searchInput: {
    padding: "6px 10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  searchButton: {
    backgroundColor: "#ff6b35",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  select: {
    padding: "6px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  actionsBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  actionBtn: {
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    flex: "1",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: "5px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
  },
  loading: {
    textAlign: "center",
    color: "#777",
    padding: "20px",
  },
  errorMsg: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    padding: "10px 15px",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#777",
    padding: "20px 0",
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
    transition: "transform 0.3s, boxShadow 0.3s",
    backgroundColor: "#fff",
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
    color: "#fff",
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
  },
  date: {
    fontSize: "13px",
    color: "#888",
  },
};

export default MyAnnonces;
