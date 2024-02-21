import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Recruitment from "../components/Card_Recruitment";
import Card_Burn_Recruitment from "../components/Card_Burn_Recruitment";

import "../styles/Recruitment.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Scrollbar, Pagination]);

function Recruitment() {
  // useState를 사용하여 현재 활성화된 슬라이드의 인덱스를 추적
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    // 활성화된 슬라이드의 인덱스를 업데이트
    setActiveIndex(swiper.activeIndex);
  };

  const recruitCards = Array.from({ length: 10 }, (_, index) => <Card_Recruitment key={index} />);

  const BurnrecruitCards = Array.from({ length: 7 }, (_, index) => (
    <SwiperSlide key={index}>
      <Card_Burn_Recruitment />
    </SwiperSlide>
  ));

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Banner">
          <p className="Banner-sub">사람인이 제공하는 최신 공고로 새로운 기회 탐색!</p>
          <p className="Banner-title">채용 공고</p>
        </div>
        <div className="Burning">
          <div className="Burning-content">
            <div className="Burning-text">
              <p className="Burning-title">실시간 인기 채용 공고🔥</p>
              <p className="Burning-sub">지금 뜨고 있는 채용 공고를 구경해 보세요!</p>
            </div>
            <div className="Burning-card-list">
              <div className="Project-cards-list">
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
                  {BurnrecruitCards}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="Project-list">
          <div className="Project-content">
            <div className="Project-bar">
              <div className="Project-title">
                <p>채용 공고 탐색하기👀</p>
              </div>
            </div>
            <div className="Project-cards">
              <div className="Project-cards-list">{recruitCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recruitment;
