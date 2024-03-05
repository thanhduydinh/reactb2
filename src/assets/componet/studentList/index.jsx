import "./style.scss";
import "../header/style.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AddStudent from "../header/addStudentLayout";

function calculateGrade(score) {
  if (score > 9) {
    return "A";
  } else if (score > 8) {
    return "B";
  } else if (score > 6) {
    return "C";
  } else if (score > 4) {
    return "D";
  } else if (score < 4) {
    return "F";
  }
}

function StudentList() {
  const [dataApi, setDataApi] = useState([]);
  const postApi = "https://60becf8e6035840017c17a48.mockapi.io/users";

  useEffect(() => {
    console.log("Fetching data from API");
    axios
      .get(postApi)
      .then((response) => {
        setDataApi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const editStudent = (studentData) => {
    var fullnameInput = document.getElementById("fullname");
    var emailInput = document.getElementById("email");
    var locationInput = document.getElementById("location");
    var phoneNumberInput = document.getElementById("phoneNumber");
    var scoreInput = document.getElementById("score");
    var addStudent = document.querySelector(".addStudent");
    addStudent.style.display = "flex";
    fullnameInput.value = studentData.name;
    emailInput.value = studentData.email;
    locationInput.value = studentData.city;
    phoneNumberInput.value = studentData.phoneNumber;
    scoreInput.value = studentData.score;

    const submitButton = document.querySelector(".form-submit");
    var formData = {
      name: fullnameInput.value.trim(),
      email: emailInput.value.trim(),
      city: locationInput.value.trim(),
      phoneNumber: phoneNumberInput.value.trim(),
      score: scoreInput.value.trim(),
    };
    submitButton.onclick = () => {
      try {
        axios
          .put(
            `https://60becf8e6035840017c17a48.mockapi.io/users/${studentData.id}`,
            formData
          )
          .then((response) => {
            console.log(response.data);
          });

        // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi cập nhật thành công
      } catch (error) {
        console.error("Error updating data:", error);
        // Xử lý lỗi khi gặp phải lỗi trong quá trình cập nhật
      }
    };
  };

  // Hàm xóa sinh viên
  const deleteStudent = (id) => {
    axios
      .delete(`${postApi}/${id}`)
      .then(() => {
        console.log("Student deleted successfully");
        // Cập nhật lại danh sách sinh viên sau khi xóa
        setDataApi((prevData) =>
          prevData.filter((student) => student.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const formData = (data) => {
    setDataApi([...dataApi, data]);
  };

  return (
    <>
      <div className="addStudent">
        <AddStudent sendData={formData} />
      </div>

      <div className="wrapper">
        <tbody>
          {dataApi.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.city}</td>
              <td>{student.phoneNumber}</td>
              <td
                className="score"
                style={
                  calculateGrade(student.score) === "F"
                    ? { color: "red" }
                    : { color: "black" }
                }
              >
                {calculateGrade(student.score)}
              </td>
              <div className="icon">
                <i
                  className="fa-solid fa-pen"
                  onClick={() => editStudent(student)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteStudent(student.id)}
                ></i>
              </div>
            </tr>
          ))}
        </tbody>
      </div>
    </>
  );
}

export default StudentList;
