import { Component } from 'react';
import './index.css';
import axios from 'axios';

export default class Students extends Component {
    state = {
        students: [
            {
                id: "",
                name: "",
                surname: "",
                birth_Day: "",
                birth_Month: "",
                birth_Year: "",
                gender: "",
                grade_Number: "",
                grade_Symbol: "",
            },
        ],
        inputs: []
    };

    // when component first time mounted to the page
    componentDidMount = () => {
        // get students data from server and set to State
        axios.get("http://localhost:3000/students").then(
            (response) => {
                const studentsData = response.data.map((studentObj) => {
                    return { ...studentObj };
                });
                this.setState({ students: studentsData });
            },
            (error) => {
                console.error(error);
            }
        );

        // make submit button disable when component first time rendered/mounted to the page
        this.submitButtonRef.disabled = true;
    };


    // handle onChange event of input/select
    handleInput = (event) => {
        const { inputs } = this.state;
        // check state if doesnt include this event target elements, then add/setState onchanged inputs and selects
        inputs.includes(event.target) === false && this.setState({ inputs: [event.target, ...inputs] });


        // check validity
        const checkV = inputs.map((inputOrSelect) => { return inputOrSelect.checkValidity(); })
        // check if all validity/array-inside are true
        const checkAllTrueValidity = checkV.every(function (element) { return element === checkV[1]; })


        // check if all inputs and selects filled(added to state). then set submit button to enabled to click
        inputs.length >= 8 && checkAllTrueValidity
            ? (this.submitButtonRef.disabled = false)
            : (this.submitButtonRef.disabled = true);
    }

    // add new student
    addStudentToData = async () => {
        const { inputs, students } = this.state;

        // enable button
        this.submitButtonRef.disabled = false;

        // get inputs and selects' Nodes from state (general function):
        this.getNodeValues = (classNames) => {
            return inputs.map(inputOrSelect => inputOrSelect.classList.value === classNames && inputOrSelect.value);
        }

        // filter all values and return one as string type
        this.getStringValue = (classNames) => {
            return String(this.getNodeValues(classNames).filter(e => e !== false))
        }

        // send/post new data/student to the server. and setState/rerender conponent/student data again
        await axios.post("http://localhost:3000/students", {
            id: this.getStringValue("idRef"),
            name: this.getStringValue("nameRef"),
            surname: this.getStringValue("surnameRef"),
            birth_Day: this.getStringValue("birthDayRef"),
            birth_Month: this.getStringValue("birthMonthRef"),
            birth_Year: this.getStringValue("birthYearRef"),
            gender: this.getStringValue("genderRef"),
            grade_Number: this.getStringValue("gradeNRef"),
            grade_Symbol: this.getStringValue("gradeSRef"),
        }).then((response) => {
            this.setState({ students: [...students, response.data] });
            console.log(response.data);
        });

    };


    // handle Delete
    handleDelete = (e) => {
        const { students } = this.state;

        // find clicked ID which is true in the students' data
        const clickedIDTrueArray = students.map((student) => {
            return student.id === e.target.parentNode.parentNode.firstChild.innerText && student.id;
        })

        // filter array and return related clicked ID
        const clickedID = String(clickedIDTrueArray.filter(element => element !== false));

        // if cleint is sure then delete related user's data and return new state
         window.confirm(
           `Are you sure to delete the student with ID ${clickedID} from the data?\nEither OK or Cancel.`
         ) === true &&
        axios.delete(`http://localhost:3000/students/${clickedID}`).then(
            response => {
                const newData = students.filter((student) => student.id !== clickedID)
                this.setState({ students: newData })
            }, error => {
                console.log(error);
            });
    }


    render() {
        const { students } = this.state;
        return (
            <div className="students">
                <h1>students</h1>

                <div className="studentsContainer">
                    {/* Form */}
                    <div className="studentsForm">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="studentId">
                                <label htmlFor="studentID">STUDENT ID:</label>
                                <input
                                    onChange={this.handleInput}
                                    className="idRef"
                                    type="number"
                                    pattern="^\d{4}$"
                                    minLength={4}
                                    max={1500}
                                    required
                                    placeholder="4 digit number (Ex:0001 to 1500)"
                                />
                            </div>
                            <div className="studentName">
                                <label htmlFor="name">FIRST NAME:</label>
                                <input
                                    onChange={this.handleInput}
                                    className="nameRef"
                                    type="text"
                                    name="name"
                                    pattern="[A-z]{2,30}"
                                    placeholder="Student's name"
                                    maxLength={30}
                                    required
                                />
                            </div>
                            <div className="studentSurname">
                                <label htmlFor="surname">LAST NAME:</label>
                                <input
                                    onChange={this.handleInput}
                                    className="surnameRef"
                                    pattern="[A-z]{2,30}"
                                    type="text"
                                    name="surname"
                                    placeholder="Student's surname"
                                    maxLength={30}
                                    required
                                />
                            </div>
                            <div className="birthday-dates">
                                <span>DATE OF BIRTH: </span>
                                <div className="selectDate">
                                    <select
                                        className="birthDayRef"
                                        onChange={this.handleInput}
                                        name="dayOfBirth"
                                        required
                                    >
                                        <option value="-1" label="DAY:"></option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    <select
                                        className="birthMonthRef"
                                        name="monthOfBirth"
                                        required
                                        onChange={this.handleInput}
                                    >
                                        <option value="-1">Months:</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <select
                                        className="birthYearRef"
                                        name="yearOfBirth"
                                        required
                                        onChange={this.handleInput}
                                    >
                                        <option value="-1">Years:</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                            </div>
                            <div className="gender">
                                <span>GENDER:</span>
                                <div className="genders">
                                    <select
                                        name="gender"
                                        onChange={this.handleInput}
                                        className="genderRef"
                                        required
                                    >
                                        <option value="-1">gender:</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grade">
                                <span>GRADE:</span>
                                <div className="grades">
                                    <select
                                        name="gradeNumber"
                                        className="gradeNRef"
                                        onChange={this.handleInput}
                                        required
                                    >
                                        <option value="-1">grade number:</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                    </select>
                                    <select
                                        className="gradeSRef"
                                        onChange={this.handleInput}
                                        name="gradeLetterSymbol"
                                        required
                                    >
                                        <option value="-1">grade symbol:</option>
                                        <option value="a">a</option>
                                        <option value="b">b</option>
                                        <option value="c">c</option>
                                    </select>
                                </div>
                            </div>
                            <div className="addStudentButtons">
                                <button ref={c => this.submitButtonRef = c} onClick={this.addStudentToData}>Submit</button>
                                <button>Check</button>
                            </div>
                        </form>
                    </div>

                    {/* Data */}
                    <div className="studentsData">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Birth Date</th>
                                    <th>Gender</th>
                                    <th>Grade</th>
                                    <th>Clear</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.surname}</td>
                                            <td>
                                                {student.birth_Day}/{student.birth_Month}/
                                                {student.birth_Year}
                                            </td>
                                            <td>{student.gender}</td>
                                            <td>
                                                {student.grade_Number}{" "}
                                                <sup>{student.grade_Symbol}</sup>
                                            </td>
                                            <td>
                                                <span onClick={this.handleDelete}>Delete</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}