import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Burn_Project from "../components/Card_Burn_Project";
import Card_Project from "../components/Card_Project";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu/DropdownMenu";

import "../styles/Project.css";
import "swiper/css";

import Add from "../img/plus.png";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Scrollbar, Pagination]);

function Project() {
  const navigate = useNavigate();

  const handleToPostLink = () => {
    navigate("/project/post");
  };

  // useState를 사용하여 현재 활성화된 슬라이드의 인덱스를 추적
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    // 활성화된 슬라이드의 인덱스를 업데이트
    setActiveIndex(swiper.activeIndex);
  };

  const projectCards = Array.from({ length: 10 }, (_, index) => <Card_Project key={index} />);
  // const BurnprojectCards = Array.from({ length: 7 }, (_, index) => <Card_Burn_Project key={index} />);

  const BurnprojectCards = Array.from({ length: 7 }, (_, index) => (
    <SwiperSlide key={index}>
      <Card_Burn_Project />
    </SwiperSlide>
  ));

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Banner">
          <p className="Banner-sub">가치도 증명하고 아이디어도 탐색할 시간!</p>
          <p className="Banner-title">프로젝트</p>
        </div>
        <div className="Burning">
          <div className="Burning-content">
            <div className="Burning-text">
              <p className="Burning-title">실시간 인기 프로젝트🔥</p>
              <p className="Burning-sub">지금 뜨고 있는 프로젝트를 구경해 보세요!</p>
            </div>
            <div className="Burning-card-list">
              <div className="Burning-list">
                <Swiper
                  className="cardSwiper"
                  spaceBetween={0}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{ 1730: { slidesPerView: 4 }, 1450: { slidePreView: 3 }, 1160: { slidePreView: 2 } }}
                  style={{
                    "--swiper-pagination-color": "#439AFF",
                    "--swiper-navigation-color": "rgb(0,0,0,0)",
                  }}
                >
                  {BurnprojectCards}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="Project-list">
          <div className="Project-content">
            <div className="Project-bar">
              <div className="Project-title">
                <p>프로젝트 탐색하기👀</p>
              </div>
              <div className="Project-btn" onClick={handleToPostLink} style={{ cursor: "pointer" }}>
                <img src={Add} alt="프로젝트 등록 버튼" />
                <p> 프로젝트 등록하기</p>
              </div>
            </div>
            <div className="Project-category">
              <DropdownMenu />
            </div>
            <div className="Project-cards">
              <div className="Project-cards-list">{projectCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Project;
