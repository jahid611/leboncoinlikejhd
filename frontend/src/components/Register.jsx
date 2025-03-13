"use client"

import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Register() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

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
      marginBottom: "10px",
    },
    success: {
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
      padding: "12px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "10px",
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
    passwordStrength: {
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "#eee",
      marginTop: "5px",
      position: "relative",
      overflow: "hidden",
    },
    passwordStrengthBar: {
      height: "100%",
      transition: "width 0.3s, background-color 0.3s",
    },
    passwordStrengthText: {
      fontSize: "12px",
      marginTop: "5px",
    },
    terms: {
      fontSize: "13px",
      color: "#666",
      marginTop: "5px",
    },
  }

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)

    return strength
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "#eee"
      case 1:
        return "#f44336"
      case 2:
        return "#ff9800"
      case 3:
        return "#2196f3"
      case 4:
        return "#4caf50"
      default:
        return "#eee"
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return ""
      case 1:
        return "Faible"
      case 2:
        return "Moyen"
      case 3:
        return "Bon"
      case 4:
        return "Excellent"
      default:
        return ""
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Basic validation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (passwordStrength < 2) {
      setError("Votre mot de passe est trop faible. Utilisez au moins 8 caractères avec des lettres et des chiffres.")
      return
    }

    setIsLoading(true)

    axios
      .post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        const { user, token } = res.data
        login(user, token)
        setSuccess("Votre compte a été créé avec succès !")

        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate("/")
        }, 1500)
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Erreur lors de l'inscription"
        setError(msg)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Créer un compte</h2>
        <p style={styles.subtitle}>Rejoignez notre communauté et commencez à vendre ou acheter</p>
      </div>

      <form onSubmit={handleRegister} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Votre nom d'utilisateur"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

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
            onChange={handlePasswordChange}
            required
            placeholder="Créez un mot de passe sécurisé"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          <div style={styles.passwordStrength}>
            <div
              style={{
                ...styles.passwordStrengthBar,
                width: `${passwordStrength * 25}%`,
                backgroundColor: getPasswordStrengthColor(),
              }}
            ></div>
          </div>
          {password && (
            <div
              style={{
                ...styles.passwordStrengthText,
                color: getPasswordStrengthColor(),
              }}
            >
              {getPasswordStrengthText()}
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirmez votre mot de passe"
            style={{
              ...styles.input,
              borderColor: confirmPassword && password !== confirmPassword ? "#f44336" : "#ddd",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
            onBlur={(e) => {
              if (confirmPassword && password !== confirmPassword) {
                e.target.style.borderColor = "#f44336"
              } else {
                e.target.style.borderColor = "#ddd"
              }
            }}
          />
          {confirmPassword && password !== confirmPassword && (
            <div style={{ color: "#f44336", fontSize: "12px" }}>Les mots de passe ne correspondent pas</div>
          )}
        </div>

        <div style={styles.terms}>
          En créant un compte, vous acceptez nos{" "}
          <a href="#" style={styles.link}>
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" style={styles.link}>
            Politique de confidentialité
          </a>
          .
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
          disabled={isLoading}
        >
          {isLoading ? "Création en cours..." : "Créer mon compte"}
        </button>
      </form>

      <div style={styles.footer}>
        Vous avez déjà un compte ?{" "}
        <Link to="/login" style={styles.link}>
          Se connecter
        </Link>
      </div>
    </div>
  )
}

export default Register

