"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

const ProfileTab = () => {
  const { user } = useAuth();
  const router = useRouter();

  const mainDetails = [
    {
      label: "Full Name",
      value: `${user?.name || ""} ${user?.lastName || ""}`.trim(),
    },
    { label: "Mobile Number", value: user?.phone },
    { label: "Email ID", value: user?.email },
  ];

  return (
    <div className="container shadow-sm p-4  my-xl-5 my-md-4 px-0">
      <div>
        <h3 className="mb-4 fw-bold">Profile </h3>
        {mainDetails.map((item, idx) => (
          <div className="mb-3" key={idx}>
            <div className="text-muted  mb-1">{item.label}</div>
            <div>
              {item.value || <span className="text-muted">- not added -</span>}
            </div>
          </div>
        ))}

        <hr className="mb-4 mt-1" />
        <h6 className="fw-bold mb-3">Saved Addresses</h6>
        {user?.addresses?.length > 0 ? (
          user.addresses.map((address, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{address.type?.toUpperCase() || "ADDRESS"}</strong>
                <span className="badge bg-secondary text-uppercase">
                  {address.type || "Other"}
                </span>
              </div>
              <div className="text-muted ">
                {address.Street && <div>{address.Street}</div>}
                {address.city && (
                  <div>
                    {address.city} - {address.postcode}
                  </div>
                )}

                <div className="mt-2">Mobile: {user.phone}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No addresses added yet.</p>
        )}
        <div className=" mt-4">
          <button
            className="bt-btn"
            onClick={() => router.push("/account/profile/edit")}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
