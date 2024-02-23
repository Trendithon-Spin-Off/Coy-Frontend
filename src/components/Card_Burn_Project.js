import React from "react";
import PropTypes from "prop-types";
import "../styles/Card_Burn_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";
import Default from "../img/NonProject.png";

function Card_Burn_Project({ projectName, description, category, boardLike, imageUrl, onClick }) {
  return (
    <div className="Card-Burn-Project" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="Card-Burn-img">
        <img src={imageUrl || Default} alt="프로젝트 이미지" />
      </div>
      <div className="Card-Burn-Project-common">
        <div className="Card-Burn-Project-looklike">
          <div className="Card-Project-like">
            <img src={Like} alt="좋아요수" />
            <p>{boardLike}</p>
          </div>
        </div>

        <div className="Card-Project-content-texts">
          <div className="Card-Burn-Project-category">
            <p>{category || "미선택"}</p>
          </div>
          <div className="Card-Burn-Project-text">
            <p className="Card-Burn-Project-title">{projectName || "미작성"}</p>
            <p className="Card-Burn-Project-description">{description || "미작성"}</p>
          </div>
        </div>
      </div>
      <div className="Card-Burn-Project-hover">
        <div className="to-Burn-project-btn">
          <p>🔥</p>
          <img src={Arrow} alt="인기 프로젝트 탐색 버튼" />
        </div>
      </div>
    </div>
  );
}

Card_Burn_Project.propTypes = {
  projectName: PropTypes.string.isRequired, // 프로젝트 제목
  description: PropTypes.string.isRequired, // 프로젝트 한줄 소개
  category: PropTypes.string.isRequired, // 프로젝트 카테고리
  boardLike: PropTypes.number.isRequired, // 프로젝트의 게시물 좋아요 수
  onClick: PropTypes.func.isRequired, // 클릭 핸들러
};

export default Card_Burn_Project;
