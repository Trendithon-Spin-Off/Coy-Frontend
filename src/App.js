import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyPage from "./pages/MyPage";
import LikeProject from "./pages/LikeProject";
import LikeRecruitment from "./pages/LikeRecruitment";
import SearchProject from "./pages/SearchProject";
import SearchRecruitment from "./pages/SearchRecruitment";
import Project from "./pages/Project";
import Post from "./pages/Post";
import Modify from "./pages/Modify";
import Read from "./pages/Read";
import Recruitment from "./pages/Recruitment";
import Chat from "./pages/Chat";

import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩, 회원가입, 로그인 */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          {/* 프로필 조회 */}
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/mypage" element={<MyPage />} />

          {/* 좋아요한 프로젝트, 채용 공고 */}
          <Route exact path="/like/project" element={<LikeProject />} />
          <Route exact path="/like/recruitment" element={<LikeRecruitment />} />

          {/* 검색한 프로젝트, 채용 공고 */}
          <Route exact path="/search/project/:searchData" element={<SearchProject />} />
          <Route exact path="/search/recruitment/:searchData" element={<SearchRecruitment />} />

          {/* 프로젝트 */}
          <Route exact path="/project" element={<Project />} />
          <Route exact path="/project/post" element={<Post />} />
          <Route exact path="/project/modify" element={<Modify />} />
          <Route exact path="/project/read" element={<Read />} />

          {/* 채용 공고  */}
          <Route exact path="/recruitment" element={<Recruitment />} />

          {/* 채팅 */}
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
