import "./style.scss";

function addStudent() {
  var addStudent = document.querySelector(".addStudent");
  addStudent.style.display = "flex";
}

function Header() {
  return (
    <header>
      <h1>Môn học : Hệ thống phân tán</h1>
      <p>Giảng viên : Nguyễn Xuân Anh</p>
      <div className="header__table">
        <h3>Quản lý sinh viên</h3>
        <button onClick={addStudent}>Thêm sinh viên</button>
      </div>
    </header>
  );
}

export default Header;
