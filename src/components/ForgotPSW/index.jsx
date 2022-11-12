import { Link } from 'react-router-dom'
import './index.css'

export default function ForgotPSW() {
    return (
        <div className="forgotPSW">
            <div className="sendLoginLink">
                <div className="closeImg"></div>
                <h2>Trouble logging in?</h2>
                <p>Enter your email, phone, or username and we'll send your phone or email a link to get back into your account(reset password).</p>
                <form>
                    <input type="text" placeholder='Email, Phone, or Username' />
                    <button> Send login link</button>
                </form>

                <div className="or">
                    <h4>or</h4>
                </div>

                <div className="createAccount">
                    <Link to={"/accounts/emailNumsignup"}>Create new account</Link>
                </div>

                <div className="backLogin">
                    <Link to={"/"}>Back to login</Link>
                </div>
            </div>
        </div>
    )
}