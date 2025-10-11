"use client";
import React, { useState, useEffect } from "react";
import WishlistProducts from "./WishlistProducts";
import OrderProducts from "./OrderProducts";
import { useAuth } from "../../../../hooks/useAuth";
import { saveBillingDetails } from "../../api/api";
import Cookies from "js-cookie";
import AddressCard from "./AddressCard";

const CheckoutArea = () => {
  const token = Cookies.get("token");
  const { user, refetchUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createAccount: false,
    password: "",
    shipping: "free",
    orderNotes: "",
    addresses: [],
    selectedAddress: null,
    Street: "",
    city: "Surat",
    postcode: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        addresses: user.addresses || [],
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.selectedAddress) {
      if (!formData.Street.trim()) {
        newErrors.Street = "Address is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.postcode.toString().trim()) {
        newErrors.postcode = "postcode code is required";
      }
      if (!formData.type.trim()) {
        newErrors.type = "type is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const addressesToSave =
      formData.addresses && formData.addresses.length > 0
        ? formData.addresses
        : [
            {
              type: formData.type,
              Street: formData.Street,
              city: formData.city,
              postcode: formData.postcode,
            },
          ];

    const payload = {
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      addresses: addressesToSave,
    };

    try {
      const response = await saveBillingDetails(payload);

      const updatedUser = refetchUser();

      setFormData((prev) => ({
        ...prev,
        addresses: updatedUser.addresses || [],
        selectedAddress: updatedUser.addresses?.[0] || null,
      }));
      setErrors({});
    } catch (error) {
      console.error("Error saving billing details:", error);
    }
  };

  return (
    <section className="checkout-area pb-70">
      <div className="container">
        <div>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkbox-form">
                <h3>Billing Details</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "input-error" : ""}
                      />
                      {errors.firstName && (
                        <p className="error-text">{errors.firstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "input-error" : ""}
                      />
                      {errors.lastName && (
                        <p className="error-text">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "input-error" : ""}
                      />
                      {errors.email && (
                        <p className="error-text">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "input-error" : ""}
                      />
                      {errors.phone && (
                        <p className="error-text">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {!formData.selectedAddress && (
                    <>
                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Address type <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Home, Office, etc."
                            name="type"
                            onChange={handleChange}
                          />
                          {errors.type && (
                            <p className="error-text">{errors.type}</p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Address
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Street address (House No, Building, Street, Area)"
                            name="Street"
                            onChange={handleChange}
                          />
                          {errors.Street && (
                            <p className="error-text">{errors.Street}</p>
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
                            placeholder="City"
                            name="city"
                            value="Surat"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="checkout-form-list">
                          <label>
                            Postcode / postcode{" "}
                            <span className="required">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Postal code"
                            name="postcode"
                            onChange={handleChange}
                          />
                          {errors.postcode && (
                            <p className="error-text">{errors.postcode}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {formData.addresses.length >= 1 && (
                    <div className="col-md-12">
                      <AddressCard
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div></div>
              <div>
                {errors.global && (
                  <p
                    className="error-text"
                    style={{ marginTop: "10px", color: "red" }}
                  >
                    {errors.global}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-sm bt-btn mb-4"
                  onClick={handleSubmit}
                  style={{ paddingTop: "12px", paddingBottom: "12px" }}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <OrderProducts
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}
              />
            </div>
          </div>
        </div>

        <WishlistProducts />
      </div>
    </section>
  );
};

export default CheckoutArea;
