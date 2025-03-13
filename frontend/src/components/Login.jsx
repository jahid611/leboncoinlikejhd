"use client"

import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const styles = {
    container: {
      maxWidth: "450px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "white",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: "0 0 10px 0",
    },
    subtitle: {
      fontSize: "16px",
      color: "#666",
      margin: 0,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#555",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      outline: "none",
    },
    button: {
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      padding: "14px",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#E55A25",
    },
    error: {
      backgroundColor: "#FFEBEE",
      color: "#D32F2F",
      padding: "12px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "20px",
    },
    footer: {
      marginTop: "25px",
      textAlign: "center",
      fontSize: "14px",
      color: "#666",
    },
    link: {
      color: "#FF6B35",
      textDecoration: "none",
      fontWeight: "500",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "20px 0",
      color: "#999",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#ddd",
    },
    dividerText: {
      padding: "0 15px",
      fontSize: "14px",
    },
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const { user, token } = res.data
        login(user, token)
        navigate("/")
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Erreur lors de la connexion"
        setError(msg)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Connexion</h2>
        <p style={styles.subtitle}>Accédez à votre compte pour gérer vos annonces</p>
      </div>

      <form onSubmit={handleLogin} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemple@email.com"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Votre mot de passe"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <Link to="/forgot-password" style={styles.link}>
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>ou</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button
          type="button"
          style={{
            ...styles.button,
            backgroundColor: "white",
            color: "#333",
            border: "1px solid #ddd",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
        >
          Continuer avec Google
        </button>
      </form>

      <div style={styles.footer}>
        Pas encore de compte ?{" "}
        <Link to="/register" style={styles.link}>
          Créer un compte
        </Link>
      </div>
    </div>
  )
}

export default Login

