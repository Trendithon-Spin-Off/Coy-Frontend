import "../styles/Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer-content">
        <div className="Footer-Coy">
          <p>ⓒ2024. Coy All rights reserved.</p>
        </div>
        <div className="Footer-Developers">
          <div className="Developers-PM">
            <p>PM/DE</p>
            <p>권하영</p>
          </div>
          <p>|</p>
          <div className="Developers-FE">
            <p>FE</p>
            <p>고도희</p>
            <p>김서윤</p>
            <p>이현진</p>
          </div>
          <p>|</p>
          <div className="Developers-BE">
            <p>BE</p>
            <p>김민석</p>
            <p>박준태</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
