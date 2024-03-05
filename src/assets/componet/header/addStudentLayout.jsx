import "./style.scss";
import axios from "axios";

function checkInput() {
  var fullnameInput = document.getElementById("fullname");
  var emailInput = document.getElementById("email");
  var locationInput = document.getElementById("location");
  var phoneNumberInput = document.getElementById("phoneNumber");
  var scoreInput = document.getElementById("score");

  var isValid = true;

  // Kiểm tra trường fullname không được để trống
  if (fullnameInput.value.trim() === "") {
    setErrorMessage(fullnameInput, "Trường này không được để trống.");
    isValid = false;
  } else {
    clearErrorMessage(fullnameInput);
  }

  // Kiểm tra trường email
  var emailValue = emailInput.value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    setErrorMessage(emailInput, "Trường này phải là một địa chỉ email hợp lệ.");
    isValid = false;
  } else {
    clearErrorMessage(emailInput);
  }

  // Kiểm tra trường location không được để trống
  if (locationInput.value.trim() === "") {
    setErrorMessage(locationInput, "Trường này không được để trống.");
    isValid = false;
  } else {
    clearErrorMessage(locationInput);
  }

  if (phoneNumberInput.value.trim() === "") {
    setErrorMessage(phoneNumberInput, "Trường này không được để trống.");
    isValid = false;
  } else {
    clearErrorMessage(phoneNumberInput);
  }

  if (scoreInput.value.trim() === "") {
    setErrorMessage(scoreInput, "Trường này không được để trống.");
    isValid = false;
  } else {
    clearErrorMessage(scoreInput);
  }

  return isValid;
}

function setErrorMessage(input, message) {
  var errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;
}

function clearErrorMessage(input) {
  var errorMessage = input.nextElementSibling;
  errorMessage.textContent = "";
}

function hiddenAddStudent() {
  var addStudent = document.querySelector(".addStudent");
  addStudent.style.display = "none";
}

// eslint-disable-next-line react/prop-types
function AddStudent({ sendData }) {
  const handlerSubmit = async () => {
    // Lấy các trường nhập liệu
    var fullnameInput = document.getElementById("fullname");
    var emailInput = document.getElementById("email");
    var locationInput = document.getElementById("location");
    var phoneNumberInput = document.getElementById("phoneNumber");
    var scoreInput = document.getElementById("score");
    var addStudent = document.querySelector(".addStudent");
    var form = document.getElementById("form-1");
    // Kiểm tra dữ liệu nhập liệu trước khi gửi biểu mẫu
    var isValid = checkInput();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    // Nếu dữ liệu hợp lệ, log dữ liệu và gửi biểu mẫu
    if (isValid) {
      var formData = {
        name: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        city: locationInput.value.trim(),
        phoneNumber: phoneNumberInput.value.trim(),
        score: scoreInput.value.trim(),
      };

      sendData(formData);

      // Gửi dữ liệu formData lên API
      try {
        await axios.post(
          "https://60becf8e6035840017c17a48.mockapi.io/users",
          formData
        );
        // Xử lý logic sau khi gửi dữ liệu thành công
      } catch (error) {
        console.error("Error posting data:", error);
        // Xử lý logic khi gặp lỗi
      }

      // Xóa giá trị của các trường nhập liệu và ẩn form sau khi gửi thành công
      fullnameInput.value = null;
      emailInput.value = null;
      locationInput.value = null;
      phoneNumberInput.value = null;
      scoreInput.value = null;
      addStudent.style.display = "none";
    }
  };
  return (
    <form action="" method="POST" className="form" id="form-1">
      <h3 className="heading">Thêm sinh viên</h3>
      <i className="fa-solid fa-x" onClick={hiddenAddStudent}></i>
      <div className="spacer"></div>

      <div className="form-group">
        <label className="form-label">Tên đầy đủ</label>
        <input
          id="fullname"
          onBlur={checkInput}
          type="text"
          placeholder="VD: Đinh Duy Thành"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          onBlur={checkInput}
          id="email"
          type="text"
          placeholder="VD: email@domain.com"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label className="form-label">Địa chỉ</label>
        <input
          onBlur={checkInput}
          id="location"
          type="text"
          placeholder="VD : Hà Nội"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label className="form-label">Số điện thoại</label>
        <input
          onBlur={checkInput}
          id="phoneNumber"
          placeholder="VD : 093xxx"
          type="text"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label className="form-label">Điểm kết thúc học phần</label>
        <input
          onBlur={checkInput}
          id="score"
          placeholder="Vui lòng nhập số"
          type="text"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <button className="form-submit" onClick={handlerSubmit}>
        Submit
      </button>
    </form>
  );
}

export default AddStudent;
