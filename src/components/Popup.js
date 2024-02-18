import "../styles/Popup.css";
import { SlCheck } from "react-icons/sl";
import { Link } from "react-router-dom";
const Popup = ({ action }) => {
  let message = "";
  if (action === "수정") {
    message = "수정이 완료되었어요";
  } else if (action === "삭제") {
    message = "삭제가 완료되었어요";
  } else if (action === "등록") {
    message = "등록이 완료되었어요";
  }

  return (
    <div className="popup-container">
      <span className="popup-message">
        <SlCheck className="check-icon" />
        {message}
      </span>
      <div>
        <Link to="/project">
          <button className="verify">확인</button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
