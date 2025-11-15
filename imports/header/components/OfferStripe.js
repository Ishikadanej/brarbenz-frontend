"use client";

import React, { useEffect, useState } from "react";
import { client, OFFERS_QUERY } from "../../../lib/sanity";

const OfferStripe = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await client.fetch(OFFERS_QUERY);
      setOffers(data);
    };

    fetchOffers();
  }, []);

  if (offers.length === 0) return null;

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: "#ff4d4d",
        color: "white",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: "scrollText 15s linear infinite",
        }}
      >
        {offers.map((offer) => (
          <span key={offer._id} style={{ marginRight: "50px" }}>
            {offer.link ? (
              <a href={offer.link} style={{ color: "white", textDecoration: "none" }}>
                {offer.message}
              </a>
            ) : (
              offer.message
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfferStripe;
