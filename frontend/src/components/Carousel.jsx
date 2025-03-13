// src/components/Carousel.jsx
import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.imageWrapper}>
        <img
          src={`http://localhost:5000/${images[currentIndex]}`}
          alt={`Slide ${currentIndex}`}
          style={styles.carouselImage}
        />
      </div>
      {images.length > 1 && (
        <div style={styles.controls}>
          <button onClick={goToPrevious} style={styles.btn}>◀</button>
          <span style={styles.indicator}>
            {currentIndex + 1} / {images.length}
          </span>
          <button onClick={goToNext} style={styles.btn}>▶</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "180px",
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  controls: {
    position: "absolute",
    top: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transform: "translateY(-50%)",
  },
  btn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "16px",
  },
  indicator: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
    alignSelf: "center",
  },
};

export default Carousel;
