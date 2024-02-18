import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Profile_Project from "../components/Card_Profile_Project";

import "../styles/MyPage.css";
import Upload from "../img/upload.png";
import Default from "../img/NonProfile.png";

function MyPage() {
  const [imagePreview, setImagePreview] = useState(null);

  const setImageFn = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const projectProfileCards = Array.from({ length: 10 }, (_, index) => <Card_Profile_Project key={index} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Profile-content">
          <div className="Profile-profile">
            <div className="Profile-profile-content">
              <div className="Profile-profile-space">
                <div className="Profile-mypage-img">
                  <label htmlFor="file" className="upload-label">
                    <img src={Upload} alt="이미지 업로드" /> 이미지 업로드
                  </label>
                  <input type="file" name="file" id="file" accept="image" onChange={setImageFn} />
                  <div id="file-preview">{imagePreview && <img src={imagePreview} alt="Preview" />}</div>
                  <div className="Profile-mypage-preview-img" style={{ display: imagePreview ? "none" : "block" }}>
                    <img src={Default} alt="프로젝트 이미지" />
                  </div>
                </div>
              </div>

              <div className="Profile-profile-space">
                <div className="Profile-profile-modify-btn">
                  <p>수정하기</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Profile-projects">
            <p div className="Profile-projects-title">
              👩🏻‍💻프로젝트
            </p>
            <div className="Profile-project-list">
              <div className="Profile-project-list-cards">{projectProfileCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
