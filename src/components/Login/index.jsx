import axios from 'axios';
import { createRef, useState } from 'react'
import { Link } from "react-router-dom";
import './index.css'

export default function Login() {
    const [usersNamesFromData, setusersNamesFromData] = useState({});
    const [userInsertedNamePSW, setuserInsertedNamePSW] = useState({});
    const [userProfilePath, setuserProfilePath] = useState({
        "userProfileURL": ""
    });
    const [buttonD, setbuttonD] = useState(true);
    const [errorMessage, seterrorMessage] = useState("");

    const loginButton = createRef();


    axios.defaults.method = 'GET';
    axios.defaults.baseURL = "http://localhost:3000";
    // axios.defaults.params = { id: 123};
    axios.defaults.timeout = 3000;

    setTimeout(() => {        
        axios({
            url: '/profile'
        }).then(
            response => {
                // get id of users data(as an Array)
                const usersDataIdS = response.data.map(usersData => usersData.id);
    
                // setState and add user ids to state
                setusersNamesFromData({...usersNamesFromData, "usersDataIdS": usersDataIdS });
            },
            error => {
                console.error(error);
            }
        )
    }, 2000);


    function handleInputs(e) {
        // Add inserted values(with property names) to the STATE:
        setuserInsertedNamePSW({ ...userInsertedNamePSW, [e.target.name]: e.target.value });

        // check inputs' validity
        const checkInputsValidity = e.target.checkValidity();

        // compare if all requests are match, then set the button to enable to use
        Object.keys(userInsertedNamePSW).length === 2 && checkInputsValidity
            ? setbuttonD(false)
            : setbuttonD(true);
    }


    const handleLogin = () => {
        setbuttonD(false);

        usersNamesFromData.usersDataIdS.includes(userInsertedNamePSW.username) ? axios({
            url: `/profile/${userInsertedNamePSW.username}`,
        }).then(
            response => {
                userInsertedNamePSW.username === response.data.login.username && userInsertedNamePSW.password === response.data.login.password ?
                    setuserProfilePath({"userProfileURL": response.data.profile.html_url }) :
                    seterrorMessage("Sorry, your password was incorrect. Check your password and try again.");
            },
            error => {
                console.warn(error);
            }
        ) : seterrorMessage("user does not exist.")
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <h1>Log in</h1>

                {/* login contents */}
                <div className="loginInputs" onSubmit={handleLogin}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            onChange={handleInputs}
                            type="text"
                            name="username"
                            placeholder="phone number, username, or email"
                            minLength={3}
                            required
                        />{" "}
                        <br />
                        <input
                            onChange={handleInputs}
                            autoComplete="true" 
                            type="password"
                            name="password"
                            placeholder="password"
                            minLength={5}
                            required
                        />{" "}
                        <br />
                        <div className="checkboxWrapper">
                            <input type="checkbox" name="checkbox" />
                            <label htmlFor="checkbox">Save login info</label> <br />
                        </div>
                        <Link to={`${userProfilePath.userProfileURL}`}>
                            <button ref={loginButton} onClick={handleLogin} disabled={buttonD}>
                                Log in
                            </button>
                        </Link>
                        <div className="errorMessage">{errorMessage}</div>
                    </form>
                </div>

                <div className="or">
                    <h4>or</h4>
                </div>

                {/* other login type and reset password */}
                <div className="otherLoginMethods">
                    <div className="loginWithFacebook">
                        <Link to={"/facecook"}>
                            <img src={require("../../images/fbIcon.png")} alt="facecook" />
                            <strong> Log in with Facebook</strong>
                        </Link>
                    </div>

                    <div className="forgotPassword">
                        <Link to={"/accounts/password/reset"}> Forgot password?</Link>
                    </div>
                </div>

                {/* sign up */}
                <div className="signUp">
                    <span>Don't have account?</span>
                    <Link to={"/accounts/emailNumsignup"}> Sign up</Link>
                </div>
            </div>

        </div>
    );
}