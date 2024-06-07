import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { SignupProps } from "@/pages/Signup";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { useState } from "react";

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const userLogin = (data: SignupProps) => {
    login(data).then(
      (res) => {
        console.log("로그인 토큰", res);
        storeLogin(res.accessToken);
        showAlert("로그인 완료");
        navigate("/");
      },
      (error) => {
        showAlert("로그인 실패하였ㅅ습니다.");
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      //성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화 되었습니다.");
      navigate("/login");
    });
  };

  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };
  return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
};
