import React from "react";

const TeamMember = ({ teamData }) => {
  const teamMember = teamData?.sections?.find(
    (section) => section._type === "teamSection"
  );

  return (
    <div className="team-area pt-100  pb-70 ">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div className="section-title text-center mb-40 ">
              <span>{teamMember?.subtitle}</span>
              <h4>{teamMember?.title}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          {teamMember?.members?.map((member, index) => (
            <div key={index} className="col-lg-3 col-6 ">
              <div className="bt-team text-center mb-30">
                <div className="team-img">
                  <img src={member.photo?.asset?.url} alt={member.name} />
                  <div className="team-social">
                    <a href={member.facebook}>
                      <i className="fab fa-facebook-f"></i>
                    </a>

                    <a href={member.linkedin}>
                      <i className="fab fa-linkedin"></i>
                    </a>

                    <a href={member.instagram}>
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="mb-sm-30 mb-10"></div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
