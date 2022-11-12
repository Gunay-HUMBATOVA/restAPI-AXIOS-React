import { Link } from 'react-router-dom';
import './index.css'

export default function SignUp() {
  return (
    <div className="signUpContainer">
      <h2>SignUp</h2>
      <p>Make your own profile, and use this site more flexible.</p>
      <div className="loginWithFacebook">
        <Link to={"/facecook"}>
          <img src={require("../../images/fbIcon.png")} alt="facecook" />
          <strong> Log in with Facebook</strong>
        </Link>
      </div>
      <div className="or">
        <h4>or</h4>
      </div>
      <form>
        <input type="text" placeholder="Email or Mobile Number" /> <br />
        <input type="text" placeholder="Username" /> <br />
        <input type="text" placeholder="Password" /> <br />
        <h5>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.</h5>
        <button>Sign Up</button>
      </form>

      <div className="backLogin">
        <span>Have an account? </span>
        <Link to={"/"}>Login</Link>
      </div>

    </div>
  );
}