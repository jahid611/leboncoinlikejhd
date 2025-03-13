"use client"

import { useState, useContext, useEffect, useRef } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function PostAnnonce() {
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [location, setLocation] = useState("")
  const [imageFiles, setImageFiles] = useState([]) // pour plusieurs fichiers
  const [showDepartments, setShowDepartments] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const departmentRef = useRef(null)

  // Liste des départements français avec leurs villes principales
  const frenchDepartments = [
    { code: "01", name: "Ain", cities: ["Bourg-en-Bresse", "Oyonnax", "Ambérieu-en-Bugey"] },
    { code: "02", name: "Aisne", cities: ["Laon", "Saint-Quentin", "Soissons"] },
    { code: "03", name: "Allier", cities: ["Moulins", "Vichy", "Montluçon"] },
    { code: "04", name: "Alpes-de-Haute-Provence", cities: ["Digne-les-Bains", "Manosque", "Sisteron"] },
    { code: "05", name: "Hautes-Alpes", cities: ["Gap", "Briançon", "Embrun"] },
    { code: "06", name: "Alpes-Maritimes", cities: ["Nice", "Cannes", "Antibes", "Grasse"] },
    { code: "07", name: "Ardèche", cities: ["Privas", "Annonay", "Aubenas"] },
    { code: "08", name: "Ardennes", cities: ["Charleville-Mézières", "Sedan", "Rethel"] },
    { code: "09", name: "Ariège", cities: ["Foix", "Pamiers", "Saint-Girons"] },
    { code: "10", name: "Aube", cities: ["Troyes", "Romilly-sur-Seine", "La Chapelle-Saint-Luc"] },
    { code: "11", name: "Aude", cities: ["Carcassonne", "Narbonne", "Castelnaudary"] },
    { code: "12", name: "Aveyron", cities: ["Rodez", "Millau", "Villefranche-de-Rouergue"] },
    { code: "13", name: "Bouches-du-Rhône", cities: ["Marseille", "Aix-en-Provence", "Arles", "Martigues"] },
    { code: "14", name: "Calvados", cities: ["Caen", "Lisieux", "Bayeux"] },
    { code: "15", name: "Cantal", cities: ["Aurillac", "Saint-Flour", "Mauriac"] },
    { code: "16", name: "Charente", cities: ["Angoulême", "Cognac", "La Couronne"] },
    { code: "17", name: "Charente-Maritime", cities: ["La Rochelle", "Saintes", "Rochefort"] },
    { code: "18", name: "Cher", cities: ["Bourges", "Vierzon", "Saint-Amand-Montrond"] },
    { code: "19", name: "Corrèze", cities: ["Tulle", "Brive-la-Gaillarde", "Ussel"] },
    { code: "2A", name: "Corse-du-Sud", cities: ["Ajaccio", "Porto-Vecchio", "Propriano"] },
    { code: "2B", name: "Haute-Corse", cities: ["Bastia", "Corte", "Calvi"] },
    { code: "21", name: "Côte-d'Or", cities: ["Dijon", "Beaune", "Chenôve"] },
    { code: "22", name: "Côtes-d'Armor", cities: ["Saint-Brieuc", "Lannion", "Dinan"] },
    { code: "23", name: "Creuse", cities: ["Guéret", "La Souterraine", "Aubusson"] },
    { code: "24", name: "Dordogne", cities: ["Périgueux", "Bergerac", "Sarlat-la-Canéda"] },
    { code: "25", name: "Doubs", cities: ["Besançon", "Montbéliard", "Pontarlier"] },
    { code: "26", name: "Drôme", cities: ["Valence", "Montélimar", "Romans-sur-Isère"] },
    { code: "27", name: "Eure", cities: ["Évreux", "Vernon", "Louviers"] },
    { code: "28", name: "Eure-et-Loir", cities: ["Chartres", "Dreux", "Châteaudun"] },
    { code: "29", name: "Finistère", cities: ["Quimper", "Brest", "Concarneau"] },
    { code: "30", name: "Gard", cities: ["Nîmes", "Alès", "Bagnols-sur-Cèze"] },
    { code: "31", name: "Haute-Garonne", cities: ["Toulouse", "Colomiers", "Tournefeuille"] },
    { code: "32", name: "Gers", cities: ["Auch", "Condom", "Fleurance"] },
    { code: "33", name: "Gironde", cities: ["Bordeaux", "Mérignac", "Pessac"] },
    { code: "34", name: "Hérault", cities: ["Montpellier", "Béziers", "Sète"] },
    { code: "35", name: "Ille-et-Vilaine", cities: ["Rennes", "Saint-Malo", "Fougères"] },
    { code: "36", name: "Indre", cities: ["Châteauroux", "Issoudun", "Le Blanc"] },
    { code: "37", name: "Indre-et-Loire", cities: ["Tours", "Joué-lès-Tours", "Saint-Cyr-sur-Loire"] },
    { code: "38", name: "Isère", cities: ["Grenoble", "Saint-Martin-d'Hères", "Échirolles"] },
    { code: "39", name: "Jura", cities: ["Lons-le-Saunier", "Dole", "Saint-Claude"] },
    { code: "40", name: "Landes", cities: ["Mont-de-Marsan", "Dax", "Biscarrosse"] },
    { code: "41", name: "Loir-et-Cher", cities: ["Blois", "Vendôme", "Romorantin-Lanthenay"] },
    { code: "42", name: "Loire", cities: ["Saint-Étienne", "Roanne", "Saint-Chamond"] },
    { code: "43", name: "Haute-Loire", cities: ["Le Puy-en-Velay", "Monistrol-sur-Loire", "Yssingeaux"] },
    { code: "44", name: "Loire-Atlantique", cities: ["Nantes", "Saint-Nazaire", "Saint-Herblain"] },
    { code: "45", name: "Loiret", cities: ["Orléans", "Fleury-les-Aubrais", "Olivet"] },
    { code: "46", name: "Lot", cities: ["Cahors", "Figeac", "Gourdon"] },
    { code: "47", name: "Lot-et-Garonne", cities: ["Agen", "Villeneuve-sur-Lot", "Marmande"] },
    { code: "48", name: "Lozère", cities: ["Mende", "Marvejols", "Florac"] },
    { code: "49", name: "Maine-et-Loire", cities: ["Angers", "Cholet", "Saumur"] },
    { code: "50", name: "Manche", cities: ["Saint-Lô", "Cherbourg-en-Cotentin", "Granville"] },
    { code: "51", name: "Marne", cities: ["Reims", "Châlons-en-Champagne", "Épernay"] },
    { code: "52", name: "Haute-Marne", cities: ["Chaumont", "Saint-Dizier", "Langres"] },
    { code: "53", name: "Mayenne", cities: ["Laval", "Château-Gontier", "Mayenne"] },
    { code: "54", name: "Meurthe-et-Moselle", cities: ["Nancy", "Vandœuvre-lès-Nancy", "Lunéville"] },
    { code: "55", name: "Meuse", cities: ["Bar-le-Duc", "Verdun", "Commercy"] },
    { code: "56", name: "Morbihan", cities: ["Vannes", "Lorient", "Lanester"] },
    { code: "57", name: "Moselle", cities: ["Metz", "Thionville", "Montigny-lès-Metz"] },
    { code: "58", name: "Nièvre", cities: ["Nevers", "Cosne-Cours-sur-Loire", "Varennes-Vauzelles"] },
    { code: "59", name: "Nord", cities: ["Lille", "Roubaix", "Tourcoing", "Dunkerque"] },
    { code: "60", name: "Oise", cities: ["Beauvais", "Compiègne", "Creil"] },
    { code: "61", name: "Orne", cities: ["Alençon", "Flers", "Argentan"] },
    { code: "62", name: "Pas-de-Calais", cities: ["Arras", "Calais", "Boulogne-sur-Mer"] },
    { code: "63", name: "Puy-de-Dôme", cities: ["Clermont-Ferrand", "Cournon-d'Auvergne", "Riom"] },
    { code: "64", name: "Pyrénées-Atlantiques", cities: ["Pau", "Bayonne", "Anglet"] },
    { code: "65", name: "Hautes-Pyrénées", cities: ["Tarbes", "Lourdes", "Bagnères-de-Bigorre"] },
    { code: "66", name: "Pyrénées-Orientales", cities: ["Perpignan", "Canet-en-Roussillon", "Saint-Estève"] },
    { code: "67", name: "Bas-Rhin", cities: ["Strasbourg", "Haguenau", "Illkirch-Graffenstaden"] },
    { code: "68", name: "Haut-Rhin", cities: ["Colmar", "Mulhouse", "Saint-Louis"] },
    { code: "69", name: "Rhône", cities: ["Lyon", "Villeurbanne", "Vénissieux"] },
    { code: "70", name: "Haute-Saône", cities: ["Vesoul", "Héricourt", "Luxeuil-les-Bains"] },
    { code: "71", name: "Saône-et-Loire", cities: ["Mâcon", "Chalon-sur-Saône", "Le Creusot"] },
    { code: "72", name: "Sarthe", cities: ["Le Mans", "La Flèche", "Sablé-sur-Sarthe"] },
    { code: "73", name: "Savoie", cities: ["Chambéry", "Aix-les-Bains", "Albertville"] },
    { code: "74", name: "Haute-Savoie", cities: ["Annecy", "Annemasse", "Thonon-les-Bains"] },
    { code: "75", name: "Paris", cities: ["Paris"] },
    { code: "76", name: "Seine-Maritime", cities: ["Rouen", "Le Havre", "Dieppe"] },
    { code: "77", name: "Seine-et-Marne", cities: ["Meaux", "Melun", "Chelles"] },
    { code: "78", name: "Yvelines", cities: ["Versailles", "Saint-Germain-en-Laye", "Mantes-la-Jolie"] },
    { code: "79", name: "Deux-Sèvres", cities: ["Niort", "Bressuire", "Parthenay"] },
    { code: "80", name: "Somme", cities: ["Amiens", "Abbeville", "Albert"] },
    { code: "81", name: "Tarn", cities: ["Albi", "Castres", "Gaillac"] },
    { code: "82", name: "Tarn-et-Garonne", cities: ["Montauban", "Castelsarrasin", "Moissac"] },
    { code: "83", name: "Var", cities: ["Toulon", "La Seyne-sur-Mer", "Hyères"] },
    { code: "84", name: "Vaucluse", cities: ["Avignon", "Carpentras", "Orange"] },
    { code: "85", name: "Vendée", cities: ["La Roche-sur-Yon", "Les Sables-d'Olonne", "Challans"] },
    { code: "86", name: "Vienne", cities: ["Poitiers", "Châtellerault", "Buxerolles"] },
    { code: "87", name: "Haute-Vienne", cities: ["Limoges", "Saint-Junien", "Panazol"] },
    { code: "88", name: "Vosges", cities: ["Épinal", "Saint-Dié-des-Vosges", "Remiremont"] },
    { code: "89", name: "Yonne", cities: ["Auxerre", "Sens", "Joigny"] },
    { code: "90", name: "Territoire de Belfort", cities: ["Belfort", "Valdoie", "Offemont"] },
    { code: "91", name: "Essonne", cities: ["Évry-Courcouronnes", "Massy", "Savigny-sur-Orge"] },
    { code: "92", name: "Hauts-de-Seine", cities: ["Nanterre", "Boulogne-Billancourt", "Colombes"] },
    { code: "93", name: "Seine-Saint-Denis", cities: ["Bobigny", "Saint-Denis", "Montreuil"] },
    { code: "94", name: "Val-de-Marne", cities: ["Créteil", "Vitry-sur-Seine", "Champigny-sur-Marne"] },
    { code: "95", name: "Val-d'Oise", cities: ["Cergy", "Argenteuil", "Sarcelles"] },
    { code: "971", name: "Guadeloupe", cities: ["Basse-Terre", "Pointe-à-Pitre", "Les Abymes"] },
    { code: "972", name: "Martinique", cities: ["Fort-de-France", "Le Lamentin", "Schoelcher"] },
    { code: "973", name: "Guyane", cities: ["Cayenne", "Matoury", "Saint-Laurent-du-Maroni"] },
    { code: "974", name: "La Réunion", cities: ["Saint-Denis", "Saint-Paul", "Saint-Pierre"] },
    { code: "976", name: "Mayotte", cities: ["Mamoudzou", "Koungou", "Dzaoudzi"] },
  ]

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "white",
    },
    header: {
      marginBottom: "25px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      margin: "0 0 10px 0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#555",
    },
    input: {
      padding: "10px 14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "15px",
    },
    textarea: {
      padding: "10px 14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "15px",
      minHeight: "120px",
      resize: "vertical",
    },
    fileInput: {
      padding: "8px 0",
    },
    button: {
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    error: {
      backgroundColor: "#FFEBEE",
      color: "#D32F2F",
      padding: "10px 14px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "15px",
    },
    success: {
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
      padding: "10px 14px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "15px",
    },
    locationContainer: {
      position: "relative",
    },
    departmentsList: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: "200px",
      overflowY: "auto",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "4px",
      zIndex: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    departmentItem: {
      padding: "10px 14px",
      cursor: "pointer",
      borderBottom: "1px solid #eee",
      transition: "background-color 0.2s",
    },
    departmentItemHover: {
      backgroundColor: "#f5f5f5",
    },
    departmentCode: {
      color: "#777",
      marginRight: "8px",
      fontWeight: "bold",
    },
    cityInfo: {
      fontSize: "12px",
      color: "#777",
      marginTop: "3px",
    },
  }

  // Fermer la liste des départements si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (departmentRef.current && !departmentRef.current.contains(event.target)) {
        setShowDepartments(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [departmentRef])

  // Fonction pour normaliser les chaînes (supprimer les accents, mettre en minuscule)
  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  const handleLocationChange = (e) => {
    const value = e.target.value
    setLocation(value)

    if (value.length > 0) {
      const searchTerm = normalizeString(value)

      // Recherche intelligente
      const filtered = frenchDepartments.filter((dept) => {
        // Vérifier le code du département
        if (dept.code.includes(searchTerm)) return true

        // Vérifier le nom du département
        if (normalizeString(dept.name).includes(searchTerm)) return true

        // Vérifier les villes du département
        return dept.cities.some((city) => normalizeString(city).includes(searchTerm))
      })

      setFilteredDepartments(filtered)
      setShowDepartments(true)
    } else {
      setShowDepartments(false)
    }
  }

  const selectDepartment = (dept) => {
    setLocation(dept.name)
    setShowDepartments(false)
  }

  const handleFileChange = (e) => {
    // e.target.files est une FileList ; convertissons-la en tableau
    setImageFiles(Array.from(e.target.files))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!user) {
      setError("Vous devez être connecté pour poster une annonce.")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("category_id", categoryId)
    formData.append("location", location)

    // Ajoute jusqu'à 5 fichiers
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    axios
      .post("http://localhost:5000/api/annonces", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuccess("Annonce créée avec succès !")
        navigate("/annonces/mine")
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Erreur lors de la création de l'annonce"
        setError(msg)
      })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Poster une Annonce (jusqu'à 5 images)</h2>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <div style={styles.formGroup}>
          <label style={styles.label}>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Prix (€)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Catégorie (ID)</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={styles.formGroup} ref={departmentRef}>
          <label style={styles.label}>Localisation</label>
          <div style={styles.locationContainer}>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#FF6B35"
                if (location.length > 0) {
                  setShowDepartments(true)
                }
              }}
              placeholder="Rechercher un département ou une ville..."
            />

            {showDepartments && filteredDepartments.length > 0 && (
              <div style={styles.departmentsList}>
                {filteredDepartments.map((dept) => (
                  <div
                    key={dept.code}
                    style={styles.departmentItem}
                    onClick={() => selectDepartment(dept)}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
                  >
                    <div>
                      <span style={styles.departmentCode}>{dept.code}</span>
                      {dept.name}
                    </div>
                    <div style={styles.cityInfo}>
                      {dept.cities.slice(0, 3).join(", ")}
                      {dept.cities.length > 3 ? "..." : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Images (max 5)</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
        >
          Poster l'annonce
        </button>
      </form>
    </div>
  )
}

export default PostAnnonce

