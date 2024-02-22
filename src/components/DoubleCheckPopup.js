import React, { useState } from "react";
import "../styles/Popup.css";
import "../styles/DoubleCheckPopup.css";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Popup from "./Popup";
const DoubleCheckPopup = () => {
  //삭제 완료 팝업 창
  const [showDeleteComplete, setShowDeleteComplete] = useState(false);
  return (
    <div className="doublecheck-container">
      <div className="popup-container">
        <span className="popup-message">
          <IoIosInformationCircleOutline className="information-icon" />
          정말 삭제할까요 ?
        </span>

        <div className="delete-buttons">
          <Link to="/project">
            <button className="delete-cancle">취소</button>
          </Link>{" "}
          <button
            type="submit"
            onClick={() => setShowDeleteComplete(true)}
            className="delete-verify"
          >
            확인
          </button>
        </div>
      </div>
      {showDeleteComplete && <Popup action="삭제" />}
    </div>
  );
};
export default DoubleCheckPopup;
