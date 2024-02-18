import "../styles/PopupPost.css";
import { SlCheck } from "react-icons/sl";
import { Link } from "react-router-dom";
const PopupPost = () => {
  return (
    <div className="popup-container">
      <span className="popup-message">
        <SlCheck className="check-icon" />
        등록이 완료되었어요
      </span>
      <div>
        <Link to="/project">
          <button className="verify">확인</button>
        </Link>
      </div>
    </div>
  );
};

export default PopupPost;
