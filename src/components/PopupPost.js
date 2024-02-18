import "../styles/PopupPost.css";
import { SlCheck } from "react-icons/sl";

const PopupPost = () => {
  return (
    <div className="popup-container">
      <span className="popup-message">
        <SlCheck className="check-icon" />
        등록이 완료되었어요
      </span>
      <button className="verify">확인</button>
    </div>
  );
};

export default PopupPost;
