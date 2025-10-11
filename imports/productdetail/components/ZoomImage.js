"use client";
import React, { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize, X } from "lucide-react";

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageContainerRef = useRef(null);

  const handleToggleZoomOverlay = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(1);
  };

  const handleToggleZoomLevel = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  const handleToggleFullscreen = () => {
    const elem = imageContainerRef.current;

    if (!document.fullscreenElement) {
      elem?.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      {!isZoomed ? (
        <img
          src={src}
          alt={alt}
          style={{
            cursor: "zoom-in",
            maxWidth: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
          onClick={handleToggleZoomOverlay}
        />
      ) : (
        <div
          ref={imageContainerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "30px",
              display: "flex",
              gap: "10px",
              zIndex: 10000,
            }}
          >
            <button
              onClick={handleToggleZoomLevel}
              style={toolbarButtonStyle}
              title={zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
            >
              {zoomLevel === 1 ? (
                <ZoomIn size={20} color="black" />
              ) : (
                <ZoomOut size={20} color="black" />
              )}
            </button>

            <button
              onClick={handleToggleFullscreen}
              style={toolbarButtonStyle}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize size={20} color="black" />
              ) : (
                <Maximize size={20} color="black" />
              )}
            </button>

            <button
              onClick={handleToggleZoomOverlay}
              style={toolbarButtonStyle}
              title="Close"
            >
              <X size={20} color="black" />
            </button>
          </div>
          <img
            src={src}
            alt={alt}
            onClick={handleToggleZoomLevel}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease",
              cursor: zoomLevel === 1 ? "zoom-in" : "zoom-out",
            }}
          />
        </div>
      )}
    </>
  );
};

const toolbarButtonStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  width: "36px",
  height: "36px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(6px)",
};

export default ImageZoom;
