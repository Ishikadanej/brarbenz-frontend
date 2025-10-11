"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { updateProfile } from "../api/api";
import { toast } from "react-toastify";
import { saveBillingDetails, updateUserAddress } from "../../checkout/api/api";

const defaultAddress = {
  type: "",
  Street: "",
  city: "Surat",
  postcode: "",
};

const EditProfile = () => {
  const { user, refetchUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    addresses: [],
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [tempAddress, setTempAddress] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const addresses = user.addresses?.length ? user.addresses : [];

      setFormData({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        addresses,
      });

      if (addresses.length === 0) {
        const defaultAddr = { ...defaultAddress };
        setFormData((prev) => ({
          ...prev,
          addresses: [defaultAddr],
        }));
        setEditingIndex(0);
        setTempAddress(defaultAddr);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setTempAddress({ ...formData.addresses[index] });
  };

  const handleTempChange = (field, value) => {
    setTempAddress((prev) => ({ ...prev, [field]: value }));
  };

  const saveAddress = async () => {
    const updated = [...formData.addresses];
    updated[editingIndex] = { ...tempAddress };

    const apiAddress = {
      type: tempAddress.type,
      Street: tempAddress.Street,
      city: tempAddress.city,
      postcode: tempAddress.postcode,
    };

    try {
      if (tempAddress.id) {
        await updateUserAddress(tempAddress.id, apiAddress);
      }

      await saveBillingDetails({
        ...user,
        addresses: updated.map((addr) => ({
          type: addr.type,
          Street: addr.Street,
          city: addr.city,
          postcode: addr.postcode,
        })),
      });

      refetchUser();

      setFormData((prev) => ({ ...prev, addresses: updated }));
      setEditingIndex(null);
      setTempAddress(null);

      toast.success("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address");
    }
  };

  const cancelEdit = () => {
    if (
      editingIndex === formData.addresses.length - 1 &&
      JSON.stringify(formData.addresses[editingIndex]) ===
        JSON.stringify(defaultAddress)
    ) {
      const updated = formData.addresses.slice(0, -1);
      setFormData((prev) => ({ ...prev, addresses: updated }));
    }

    setEditingIndex(null);
    setTempAddress(null);
  };

  const addAddress = () => {
    const newAddresses = [...formData.addresses, { ...defaultAddress }];
    setFormData((prev) => ({ ...prev, addresses: newAddresses }));
    setEditingIndex(newAddresses.length - 1);
    setTempAddress({ ...defaultAddress });
  };

  const removeAddress = async (index) => {
    try {
      const updated = formData.addresses.filter((_, i) => i !== index);

      setFormData((prev) => ({ ...prev, addresses: updated }));
      if (editingIndex === index) {
        setEditingIndex(null);
        setTempAddress(null);
      }

      await saveBillingDetails({
        ...user,
        addresses: updated.map((addr) => ({
          type: addr.type,
          Street: addr.Street,
          city: addr.city,
          postcode: addr.postcode,
        })),
      });

      refetchUser();
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  const isAddressValid = (address) => {
    return (
      address?.type?.trim() &&
      address?.Street?.trim() &&
      address?.city?.trim() &&
      address?.postcode?.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await updateProfile(formData);
      refetchUser();
      toast.success("Profile updated successfully!");
      router.push("/account/profile");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="container py-md-4 py-0 px-0">
      <h3 className="fw-bold mb-4 profile-title">Edit Profile</h3>

      <form onSubmit={handleSubmit}>
        <div className="row g-3 edit-form">
          <div className="col-md-6 ">
            <label className="form-label  fw-semibold">First Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
        </div>

        <hr className="my-4" />
        {editingIndex === null && (
          <div className="d-flex justify-content-between align-items-center ">
            {formData.addresses.length > 0 && (
              <label className="text-secondary fs-6 fw-bold">
                Saved Addresses
              </label>
            )}
            <button
              type="button"
              className="bt bt-btn py-3"
              onClick={addAddress}
            >
              + ADD NEW ADDRESS
            </button>
          </div>
        )}

        {formData.addresses.map((address, index) => (
          <div
            key={index}
            className="border profile-data rounded p-4 my-4 bg-light shadow-sm"
          >
            {editingIndex === index ? (
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempAddress?.type || ""}
                    onChange={(e) => handleTempChange("type", e.target.value)}
                    placeholder="Home, Office, etc."
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label fw-semibold">
                    {" "}
                    Address (House No, Building, Street, Area){" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempAddress?.Street || ""}
                    onChange={(e) => handleTempChange("Street", e.target.value)}
                    placeholder="Street address"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={"Surat"}
                    placeholder="City"
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Zip</label>
                  <input
                    type="number"
                    className="form-control"
                    value={tempAddress?.postcode || ""}
                    onChange={(e) =>
                      handleTempChange("postcode", e.target.value)
                    }
                    placeholder="Postal code"
                  />
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  {!(
                    formData.addresses.length === 1 &&
                    JSON.stringify(formData.addresses[0]) ===
                      JSON.stringify(defaultAddress)
                  ) && (
                    <button
                      type="button"
                      className="cancel-btn "
                      onClick={cancelEdit}
                      // style={{ background: "black" }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className=" mobile-btn"
                    onClick={saveAddress}
                    // style={{ background: "#3e976c", borderColor: "#3e976c" }}
                    disabled={!isAddressValid(tempAddress)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between profile-info">
                  <div>
                    <div className="pb-2 fw-bold">{formData.name}</div>
                    <div>{address.Street}</div>
                    <div>
                      {" "}
                      {address.city} - {address.postcode}
                    </div>

                    <div className="pt-2">Mobile: {formData.phone}</div>
                  </div>
                  <span className="badge bg-light text-dark px-3 py-1 text-uppercase align-self-start">
                    {address.type || "Other"}
                  </span>
                </div>

                <div className="d-flex justify-content-around mt-3 border-top pt-3">
                  <div
                    type="button"
                    onClick={() => startEditing(index)}
                    style={{ cursor: "pointer" }}
                    title="Edit"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </div>
                  {formData.addresses.length > 1 && (
                    <>
                      <div className="vr" />
                      <div
                        type="button"
                        onClick={() => removeAddress(index)}
                        style={{ cursor: "pointer" }}
                        title="Remove"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        <div>
          <button type="submit" className="bt-btn theme-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
