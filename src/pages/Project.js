import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
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

const API_BASE_URL = "https://likelion-running.store/api";

function Project() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [popularProjects, setPopularProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/project/search/all`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // 인기 프로젝트 목록 가져오기
    axios
      .get(`${API_BASE_URL}/project/popular/list`)
      .then((response) => {
        setPopularProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching popular projects:", error);
      });
  }, []);

  const handleToPostLink = () => {
    navigate("/project/post");
  };

  const handleToProjectLink = (bno) => {
    navigate(`/project/read/${bno}`);
  };

  // useState를 사용하여 현재 활성화된 슬라이드의 인덱스를 추적
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    // 활성화된 슬라이드의 인덱스를 업데이트
    setActiveIndex(swiper.activeIndex);
  };

  // const projectCards = Array.from({ length: 10 }, (_, index) => <Card_Project key={index} />);
  // const BurnprojectCards = Array.from({ length: 7 }, (_, index) => <Card_Burn_Project key={index} />);
  const projectCards = projects.map((project) => <Card_Project key={project.bno} projectName={project.projectName} description={project.description} category={project.category} boardLike={project.boardLike} onClick={() => handleToProjectLink(project.bno)} />);

  const BurnprojectCards = popularProjects.map((project) => (
    <SwiperSlide key={project.bno}>
      <Card_Burn_Project projectName={project.projectName} description={project.description} category={project.category} boardLike={project.boardLike} onClick={() => handleToProjectLink(project.bno)} />
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
