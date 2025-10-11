"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileFilterBar({ isOpen, isMobile, onToggle }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const barHeight = 64;
    const root = document.documentElement;
    const safeVar = getComputedStyle(root).getPropertyValue("--sat").trim();
    const safeInset = safeVar ? parseInt(safeVar, 10) : 0;
    const total = barHeight + (Number.isFinite(safeInset) ? safeInset : 0);
    document.body.style.paddingBottom = `${total}px`;
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [isMobile]);

  if (!mounted || !isMobile) return null;

  return createPortal(
    <div
      className="mobile-filter-bar"
      role="region"
      aria-label="Mobile filter bar"
    >
      <button
        className="bt-btn mobile-filter-btn"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls="filter-sheet"
      >
        {isOpen ? (
          <span className="w-full">
            Filters <i className="fa-solid fa-xmark mr-1"></i>
          </span>
        ) : (
          <span className="w-full">Filters</span>
        )}
      </button>

      <style jsx global>{`
        :root {
          --sat: env(safe-area-inset-bottom);
        }

        .mobile-filter-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2147483000;
          background: #fff;
          box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.08);
          padding: 8px 12px calc(8px + var(--sat));
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mobile-filter-btn {
          width: 100%;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .filter-backdrop.show {
          z-index: 2147482000;
        }
        .filter-sheet.open {
          z-index: 2147483500;
        }
      `}</style>
    </div>,
    document.body
  );
}
