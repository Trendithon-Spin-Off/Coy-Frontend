import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SearchRecruitment.css";

function SearchRecruitment() {
  const { searchData } = useParams();

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

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Search-text">
          <p div className="Search-title">
            🔎'{searchData}'에 대한 검색 결과
          </p>
          <p div className="Search-sub">
            n개의 검색결과를 발견했어요.
          </p>
        </div>
        <div className="Search-content">
          <div className="Search-bar">
            <p className="Search-bar-project-2" onClick={handleProjectSearch}>
              프로젝트
            </p>
            <p className="Search-bar-recruit-2" onClick={handleRecruitSearch}>
              채용 공고
            </p>
          </div>
          <div className="Search-list">
            <div className="Search-list-cards">해당 컴포넌트 삽입해주세요 !</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchRecruitment;
