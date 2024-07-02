import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useSelector, useDispatch } from "react-redux";
import { getUser, saveUser } from "../redux/userReducer";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.user.data);
  let token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
  console.log("🚀 ~ Login ~ REDIRECT_URL:", REDIRECT_URL)

  const handleUser = async (respone) => {
    console.log("🚀 ~ handleUser ~ respone:", respone)
    if (respone?.data) {
      let responeData = respone.data;
      let user = {};
      user = {
        name: responeData.name,
        id: responeData.userID,
        picture: responeData.picture,
        accessToken: responeData.accessToken,
      };
      await dispatch(saveUser(user));
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    let loginCheck = async () => {
      try {
        const { payload } = await dispatch(getUser({accessToken: token}));
        if (payload?.data?.id) {
          navigate("/");
        }
      } catch (error) {
        console.log("🚀 ~ loginCheck ~ error:", error);
        navigate("/login");
      }
    };
    if (token) {
      loginCheck();
    }
  }, [token]);
  console.log("process.env.REACT_APP_FACEBOOKAPPID",process.env.REACT_APP_FACEBOOKAPPID)
  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FACEBOOKAPPID}
          fieldsProfile={
            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
          }
          scope="pages_show_list,business_management,pages_read_engagement,pages_read_user_content,read_insights"
          redirect_uri={REDIRECT_URL}
          onResolve={handleUser}
          onReject={(err) => {
            console.log("🚀 ~ Login ~ err:", err);
          }}
          version="v20.0"
        >
          <FacebookLoginButton className="login mt-4" />
        </LoginSocialFacebook>
      </div>
    </>
  );
}

export default Login;
