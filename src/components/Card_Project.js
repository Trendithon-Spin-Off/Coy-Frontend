import React from "react";
import PropTypes from "prop-types";
import "../styles/Card_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";
import Default from "../img/NonProject.png";

function Card_Project({ projectName, description, category, boardLike, onClick }) {
  return (
    <div className="Card-Project" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="Card-Project-img">
        <img src={Default} alt="프로젝트 이미지" />
      </div>
      <div className="Card-Project-content">
        <div className="Card-Project-common">
          <div className="Card-Project-content-texts">
            <div className="Card-Project-category">
              <p>{category}</p>
            </div>
            <div className="Card-Project-text">
              <p className="Card-Project-title">{projectName}</p>
              <p className="Card-Project-description">{description}</p>
            </div>
          </div>
          <div className="Card-Project-looklike">
            <div className="Card-Project-like">
              <img src={Like} alt="좋아요수" />
              <p>{boardLike}</p>
            </div>
          </div>
        </div>
        <div className="Card-Project-hover">
          <div className="to-project-btn">
            <p>👀</p>
            <img src={Arrow} alt="탐색 버튼" />
          </div>
        </div>
      </div>
    </div>
  );
}

Card_Project.propTypes = {
  projectName: PropTypes.string.isRequired, // 프로젝트 제목
  description: PropTypes.string.isRequired, // 프로젝트 한줄 소개
  category: PropTypes.string.isRequired, // 프로젝트 카테고리
  boardLike: PropTypes.number.isRequired, // 프로젝트의 게시물 좋아요 수
  onClick: PropTypes.func.isRequired, // 클릭 핸들러
};

export default Card_Project;
