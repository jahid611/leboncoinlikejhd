"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeMessage, setActiveMessage] = useState(null)
  const [replyText, setReplyText] = useState("")

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    composeButton: {
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
    },
    messagesList: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "20px",
    },
    messageCard: {
      borderRadius: "8px",
      border: "1px solid #eee",
      overflow: "hidden",
      transition: "box-shadow 0.2s, transform 0.2s",
      backgroundColor: "white",
    },
    messageCardUnread: {
      borderLeft: "4px solid #FF6B35",
    },
    messageHeader: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 20px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #eee",
    },
    messageSender: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#333",
    },
    messageDate: {
      color: "#777",
      fontSize: "14px",
    },
    messageContent: {
      padding: "20px",
      fontSize: "15px",
      lineHeight: "1.5",
      color: "#444",
    },
    messageFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 20px",
      borderTop: "1px solid #eee",
      backgroundColor: "#f8f9fa",
    },
    messageStatus: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#777",
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#4CAF50",
    },
    statusDotUnread: {
      backgroundColor: "#FF6B35",
    },
    messageActions: {
      display: "flex",
      gap: "15px",
    },
    actionButton: {
      background: "none",
      border: "none",
      color: "#555",
      fontSize: "14px",
      cursor: "pointer",
      padding: "5px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    replyContainer: {
      padding: "20px",
      borderTop: "1px solid #eee",
      backgroundColor: "#f8f9fa",
    },
    replyTextarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "15px",
      minHeight: "100px",
      resize: "vertical",
      marginBottom: "15px",
    },
    replyActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    sendButton: {
      backgroundColor: "#FF6B35",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    cancelButton: {
      backgroundColor: "transparent",
      color: "#555",
      border: "1px solid #ddd",
      padding: "10px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
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
    tabs: {
      display: "flex",
      borderBottom: "1px solid #eee",
      marginBottom: "20px",
    },
    tab: {
      padding: "12px 20px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "500",
      color: "#555",
      borderBottom: "2px solid transparent",
    },
    activeTab: {
      color: "#FF6B35",
      borderBottom: "2px solid #FF6B35",
    },
    badge: {
      backgroundColor: "#FF6B35",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "2px 6px",
      borderRadius: "10px",
      marginLeft: "5px",
    },
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/messages")
      .then((res) => {
        setMessages(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Impossible de charger vos messages. Veuillez réessayer plus tard.")
        setLoading(false)
      })
  }, [])

  const handleReply = (messageId) => {
    if (activeMessage === messageId) {
      setActiveMessage(null)
    } else {
      setActiveMessage(messageId)
      setReplyText("")
    }
  }

  const sendReply = (receiverId) => {
    // Here you would implement the API call to send the reply
    console.log(`Sending reply to ${receiverId}: ${replyText}`)

    // Mock implementation - in a real app, you'd make an API call
    const newMessage = {
      id: Date.now(),
      sender_id: "You", // This would be the current user's ID
      receiver_id: receiverId,
      content: replyText,
      is_read: false,
      created_at: new Date().toISOString(),
    }

    setMessages([newMessage, ...messages])
    setActiveMessage(null)
    setReplyText("")
  }

  const markAsRead = (messageId) => {
    // Update the UI optimistically
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, is_read: true } : msg)))

    // Here you would make an API call to update the message status
    console.log(`Marking message ${messageId} as read`)
  }

  const deleteMessage = (messageId) => {
    // Update the UI optimistically
    setMessages(messages.filter((msg) => msg.id !== messageId))

    // Here you would make an API call to delete the message
    console.log(`Deleting message ${messageId}`)
  }

  // Count unread messages
  const unreadCount = messages.filter((msg) => !msg.is_read).length

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mes Messages</h2>
        <button
          style={styles.composeButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
        >
          <span style={{ fontSize: "18px" }}>+</span> Nouveau message
        </button>
      </div>

      <div style={styles.tabs}>
        <div style={{ ...styles.tab, ...styles.activeTab }} onClick={() => console.log("Show all messages")}>
          Tous
        </div>
        <div style={styles.tab} onClick={() => console.log("Show unread messages")}>
          Non lus
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </div>
        <div style={styles.tab} onClick={() => console.log("Show sent messages")}>
          Envoyés
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>Chargement de vos messages...</div>
      ) : error ? (
        <div style={styles.errorContainer}>{error}</div>
      ) : messages.length === 0 ? (
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>📭</div>
          <p>Vous n'avez pas encore de messages</p>
          <p>Commencez une conversation avec un vendeur ou un acheteur</p>
        </div>
      ) : (
        <div style={styles.messagesList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageCard,
                ...(!msg.is_read ? styles.messageCardUnread : {}),
              }}
              onMouseOver={(e) => (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)")}
              onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            >
              <div style={styles.messageHeader}>
                <div style={styles.messageSender}>
                  {msg.sender_id === "You" ? "Vous" : `De: ${msg.sender_id}`}
                  {msg.sender_id !== "You" && ` → À: ${msg.receiver_id}`}
                </div>
                <div style={styles.messageDate}>
                  {new Date(msg.created_at).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div style={styles.messageContent}>{msg.content}</div>

              <div style={styles.messageFooter}>
                <div style={styles.messageStatus}>
                  <div
                    style={{
                      ...styles.statusDot,
                      ...(!msg.is_read ? styles.statusDotUnread : {}),
                    }}
                  ></div>
                  {msg.is_read ? "Lu" : "Non lu"}
                </div>

                <div style={styles.messageActions}>
                  {!msg.is_read && msg.sender_id !== "You" && (
                    <button
                      style={styles.actionButton}
                      onClick={() => markAsRead(msg.id)}
                      onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                      onMouseOut={(e) => (e.target.style.color = "#555")}
                    >
                      Marquer comme lu
                    </button>
                  )}

                  {msg.sender_id !== "You" && (
                    <button
                      style={styles.actionButton}
                      onClick={() => handleReply(msg.id)}
                      onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                      onMouseOut={(e) => (e.target.style.color = "#555")}
                    >
                      Répondre
                    </button>
                  )}

                  <button
                    style={styles.actionButton}
                    onClick={() => deleteMessage(msg.id)}
                    onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                    onMouseOut={(e) => (e.target.style.color = "#555")}
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {activeMessage === msg.id && (
                <div style={styles.replyContainer}>
                  <textarea
                    style={styles.replyTextarea}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                    onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
                    onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                  />
                  <div style={styles.replyActions}>
                    <button style={styles.cancelButton} onClick={() => setActiveMessage(null)}>
                      Annuler
                    </button>
                    <button
                      style={styles.sendButton}
                      onClick={() => sendReply(msg.sender_id)}
                      disabled={!replyText.trim()}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#E55A25")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B35")}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages

