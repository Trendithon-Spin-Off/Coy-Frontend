import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Project from "../components/Card_Project";

import "../styles/SearchProject.css";

const API_BASE_URL = "https://likelion-running.store/api";

function SearchProject() {
  const { searchData } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/project/search/list?&searchKeyword=${searchData}`);
        setSearchResults(response.data.content);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchData.trim() !== "") {
      fetchData();
    }
  }, [searchData]);

  const navigate = useNavigate();

  const handleProjectSearch = () => {
    if (searchData.trim() !== "") {
      navigate(`/search/project/${searchData.trim()}`); // 검색어를 trim하여 공백을 제거하고 검색합니다.
    }
  };

  const handleRecruitSearch = () => {
    if (searchData.trim() !== "") {
      navigate(`/search/recruitment/${searchData.trim()}`); // 검색어를 trim하여 공백을 제거하고 검색합니다.
    }
  };

  const handleToProjectLink = (bno) => {
    navigate(`/project/read/${bno}`);
  };

  // const projectCards = Array.from({ length: 10 }, (_, index) => <Card_Project key={index} />);
  const projectCards = searchResults.map((project) => <Card_Project key={project.bno} projectName={project.projectName} description={project.description} category={project.category} boardLike={project.boardLike} onClick={() => handleToProjectLink(project.bno)} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Search-text">
          <p div className="Search-title">
            🔎'{searchData}'에 대한 검색 결과
          </p>
          <p div className="Search-sub">
            {searchResults.length}개의 검색결과를 발견했어요.
          </p>
        </div>
        <div className="Search-content">
          <div className="Search-bar">
            <p className="Search-bar-project-1" onClick={handleProjectSearch}>
              프로젝트
            </p>
            <p className="Search-bar-recruit-1" onClick={handleRecruitSearch}>
              채용 공고
            </p>
          </div>
          <div className="Search-list">
            <div className="Search-list-cards">{projectCards}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchProject;
