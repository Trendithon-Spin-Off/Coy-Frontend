import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/Modify.css";
import Popup from "../components/Popup";
import DoubleCheckPopup from "../components/DoubleCheckPopup";
function Modify() {
  //수정 완료 팝업 창
  const [showModify, setShowModify] = useState(false);
  //삭제 재확인 팝업 창
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="modify-page-buttons">
          <div className="modify-button">
            <button
              type="submit"
              className="modify-check-button"
              onClick={() => setShowModify(true)}
            >
              수정하기
            </button>
            {showModify && <Popup action="수정" />}
          </div>
          <div className="doublecheck-button">
            <button
              type="submit"
              className="delete-check-button"
              onClick={() => setShowDelete(true)}
            >
              삭제하기
            </button>
            {showDelete && <DoubleCheckPopup />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modify;
