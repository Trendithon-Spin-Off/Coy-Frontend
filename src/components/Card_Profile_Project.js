import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Profile_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";
import Default from "../img/NonProject.png";

function Card_Profile_Project({ projectName, description, category, boardLike, imageUrl, onClick }) {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/read");
  };

  return (
    <div className="Card-Profile-Project" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="Card-Profile-Project-img">
        <img src={imageUrl || Default} alt="프로젝트 이미지" />
      </div>
      <div className="Card-Profile-Project-content">
        <div className="Card-Project-common">
          <div className="Card-Project-content-texts">
            <div className="Card-Profile-Project-category">
              <p>{category || "미선택"}</p>
            </div>
            <div className="Card-Project-text">
              <p className="Card-Profile-Project-title">{projectName || "미작성"}</p>
              <p className="Card-Profile-Project-description">{description || "미작성"}</p>
            </div>
          </div>
          <div className="Card-Project-looklike">
            <div className="Card-Profile-Project-like">
              <img src={Like} alt="좋아요수" />
              <p>{boardLike}</p>
            </div>
          </div>
        </div>
        <div className="Card-Profile-Project-hover">
          <div className="to-Profile-project-btn">
            <p>👀</p>
            <img src={Arrow} alt="탐색 버튼" />
          </div>
        </div>
      </div>
    </div>
  );
}

Card_Profile_Project.propTypes = {
  projectName: PropTypes.string.isRequired, // 프로젝트 제목
  description: PropTypes.string.isRequired, // 프로젝트 한줄 소개
  category: PropTypes.string.isRequired, // 프로젝트 카테고리
  boardLike: PropTypes.number.isRequired, // 프로젝트의 게시물 좋아요 수
  onClick: PropTypes.func.isRequired, // 클릭 핸들러
};

export default Card_Profile_Project;
