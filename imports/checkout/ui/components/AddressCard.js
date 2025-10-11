"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { saveBillingDetails, updateUserAddress } from "../../api/api";

const defaultAddress = {
  type: "",
  Street: "",
  city: "Surat",
  postcode: "",
};

const AddressCard = ({ formData, setFormData }) => {
  const { user, refetchUser } = useAuth();
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempAddress, setTempAddress] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user?.addresses?.length) {
      setFormData((prev) => ({
        ...prev,
        addresses: user.addresses,
        selectedAddress: user.addresses[0],
      }));
      setSelectedIndex(0);
      setShowForm(false);
    }
  }, [user, setFormData]);

  const startEditing = (index) => {
    setEditingIndex(index);
    setTempAddress({ ...formData.addresses[index] });
    setShowForm(true);
    setErrors({});
  };

  const handleTempChange = (field, value) => {
    setTempAddress((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateAddress = () => {
    const newErrors = {};

    if (!tempAddress?.type?.trim()) {
      newErrors.type = "Address type is required";
    }
    if (!tempAddress?.Street?.trim()) {
      newErrors.Street = "Street address is required";
    }
    if (!tempAddress?.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!tempAddress?.postcode?.toString().trim()) {
      newErrors.postcode = "Postcode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const saveAddress = async () => {
    if (!validateAddress()) {
      return;
    }

    const updated = [...formData.addresses];
    updated[editingIndex] = { ...tempAddress };

    try {
      if (tempAddress.id) {
        await updateUserAddress(tempAddress.id, tempAddress);
      }

      await saveBillingDetails({
        ...user,
        addresses: updated,
      });

      refetchUser();

      setFormData((prev) => ({ ...prev, addresses: updated }));
      setEditingIndex(null);
      setTempAddress(null);
      setShowForm(false);
      setErrors({});
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const cancelEdit = () => {
    if (formData.addresses.length === 1 && !user?.addresses?.length) {
      return;
    }

    if (
      editingIndex !== null &&
      !formData.addresses[editingIndex]?.type &&
      !formData.addresses[editingIndex]?.Street &&
      !formData.addresses[editingIndex]?.city &&
      !formData.addresses[editingIndex]?.postcode
    ) {
      const updated = formData.addresses.filter((_, i) => i !== editingIndex);
      setFormData((prev) => ({ ...prev, addresses: updated }));
    }

    setEditingIndex(null);
    setTempAddress(null);
    setShowForm(false);
    setErrors({});
  };

  const addAddress = () => {
    const newAddresses = [...formData.addresses, { ...defaultAddress }];
    setFormData((prev) => ({ ...prev, addresses: newAddresses }));
    setEditingIndex(newAddresses.length - 1);
    setTempAddress({ ...defaultAddress });
    setShowForm(true);
    setErrors({});
  };

  const removeAddress = (index) => {
    const updated = formData.addresses.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, addresses: updated }));
    setEditingIndex(null);
    setTempAddress(null);
    setShowForm(false);
    setErrors({});
    if (selectedIndex === index) setSelectedIndex(null);
  };

  const handleSelectAddress = (index) => {
    setSelectedIndex(index);
    setFormData((prev) => ({
      ...prev,
      selectedAddress: formData.addresses[index],
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {formData.addresses.length > 0 && !showForm && (
          <>
            <label className="text-secondary fw-bold">
              Select Delivery Address
            </label>
            <button
              type="button"
              className="bt-btn"
              onClick={addAddress}
              style={{ paddingTop: "12px", paddingBottom: "12px" }}
            >
              + ADD NEW ADDRESS
            </button>
          </>
        )}
      </div>

      {formData.addresses.map((address, index) => {
        const isSelected = index === selectedIndex;

        if (editingIndex === index && showForm) {
          return (
            <div key={index} className="rounded border p-3 mb-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>
                      Address type <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={tempAddress?.type || ""}
                      onChange={(e) => handleTempChange("type", e.target.value)}
                      placeholder="Home, Office, etc."
                    />
                    {errors.type && (
                      <div className="error-text">{errors.type}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>
                      Address (House No, Building, Street, Area){" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={tempAddress?.Street || ""}
                      onChange={(e) =>
                        handleTempChange("Street", e.target.value)
                      }
                      placeholder="Street address"
                    />
                    {errors.Street && (
                      <div className="error-text">{errors.Street}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>
                      Town / City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={"Surat"}
                      readOnly
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>
                      Postcode / Zip <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={tempAddress?.postcode || ""}
                      onChange={(e) =>
                        handleTempChange("postcode", e.target.value)
                      }
                      placeholder="Postal code"
                    />
                    {errors.postcode && (
                      <div className="error-text">{errors.postcode}</div>
                    )}
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="cancel-btn "
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="mobile-btn"
                    // style={{ background: "#3e976c", borderColor: "#3e976c" }}
                    onClick={saveAddress}
                  >
                    {formData.addresses[editingIndex]?.id ? "Edit" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`rounded address-card shadow-sm ${
              isSelected ? "bg-light" : "border"
            }`}
            onClick={() => handleSelectAddress(index)}
            style={{
              cursor: "pointer",
              border: isSelected ? "1px solid #3e976c" : "1px solid #dee2e6",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start gap-2">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={isSelected}
                  onChange={() => handleSelectAddress(index)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div>
                  <strong>{address?.type}</strong>
                  <div>{address.Street}</div>

                  <div>
                    {address.city} - {address.postcode}
                  </div>
                  <div className="mt-2"> {user?.phone}</div>
                </div>
              </div>

              <div
                type="button"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(index);
                }}
              >
                <i className="fa-solid fa-pencil"></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressCard;
