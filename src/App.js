import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Students from './components/Students';
import Loading from './components/Loading';

const Login = lazy(()=> import('./components/Login'))
const UserOne = lazy(() => import("./components/UserOne"));
const ForgotPSW = lazy(() => import("./components/ForgotPSW"));
const SignUp = lazy(() => import("./components/SignUp"));

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/react7/profile" element={<UserOne />} />
          <Route path="/accounts/password/reset" element={<ForgotPSW />} />
          <Route path="/accounts/emailNumsignup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>

      <hr />
      <Students />
    </div>
  );
}
