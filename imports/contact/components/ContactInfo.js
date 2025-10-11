import React from "react";

const ContactInfo = () => {
  return (
    <section className="contact__info p-relative">
      <div className="container">
        <div className="contact__info-inner theme-bg">
          <div className="row">
            <div className="col-xl-4 col-md-4 col-sm-6 col-12">
              <div className="contact__info-item text-center text-sm-left  mb-30">
                <div className="contact__icon mr-20">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div className="contact__info-content">
                  <h3>Our Address</h3>
                  <span>24 Broadcast Drive Charlotte</span>
                  <span> NC 28202, USA</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-6 col-12">
              <div className="contact__info-item text-center text-sm-left  mb-30">
                <div className="contact__icon mr-20">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact__info-content">
                  <h3>Phone Number</h3>
                  <span>(+06) 325 - 635 - 3265 </span>
                  <span>(+02) 653 - 352 - 6524</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-6 col-12">
              <div className="contact__info-item text-center text-sm-left mb-30">
                <div className="contact__icon mr-20">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact__info-content">
                  <h3>Email Support</h3>
                  <span>patient@basicme.com</span>
                  <span>info@basicme.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
