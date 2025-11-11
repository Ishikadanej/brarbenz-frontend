import React from "react";

const ConatactForm = () => {
  return (
    <section className="contact__area pt-120 pb-120  contact_page">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5">
            <div className="contact__info-head mb-40 ">
              <div className="section-title mb-20">
                <span>Contact info</span>
                <h4>Have Any Question Or Emergency Problem Contact With Us.</h4>
              </div>
              <p>We are BearBenz — a men’s fashion brand offering premium shirts and t-shirts designed for comfort, style, and confidence. Feel free to reach out to us for any queries, collaborations, or support.
              </p>
            </div>
          </div>
          <div className="col-xl-6 offset-xl-1 col-lg-6 offset-lg-1">
            <div className="contact__form">
              <form id="contact-form" action="mail.php" method="POST">
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      name="name"
                      className="contact__input contact__input-3 contact__input-4"
                      type="text"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-xl-6">
                    <input
                      name="email"
                      className="contact__input contact__input-3 contact__input-4"
                      type="email"
                      placeholder="E-mail Address"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      name="phone"
                      className="contact__input contact__input-3 contact__input-4"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="col-xl-6">
                    <input
                      name="subject"
                      className="contact__input contact__input-3 contact__input-4"
                      type="text"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <textarea
                      name="message"
                      className="contact__input contact__input-3 contact__input-4 txt-area "
                      cols="30"
                      rows="10"
                      placeholder="Write Message"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <button className="bt-btn s-btn__square" type="submit">
                      submit message
                    </button>
                  </div>
                </div>
              </form>
              <p className="ajax-response"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConatactForm;
