import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";

import * as actions from "../../store/actions";
import { handleLogin } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            let data = await handleLogin(
                this.state.username,
                this.state.password
            );

            if (data && data.success === false) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.success === true) {
                localStorage.setItem("token", "bearer " + data.token)
                this.props.userLoginSuccess(data);
                console.log("Successfully!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleOnKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center login-text">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnChangeUsername(event)
                                }
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div>
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnChangePassword(event)
                                    }
                                    onKeyDown={(event) =>
                                        this.handleOnKeyDown(event)
                                    }
                                />
                                <span
                                    onClick={() =>
                                        this.handleShowHidePassword()
                                    }
                                >
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "far fa-eye-slash"
                                                : "far fa-eye"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="login-btn"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="login-span">
                                Forgot your password
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// const Login = (props) => {
//   const [userName, setUserName] = useState("");
//   const [passWord, setPassWord] = useState("");
//   const [isShowPassword, setIsShowPassword] = useState(false);

//   const handleOnChangeUsername = (event) => {
//     setUserName(event.target.value);
//   };

//   const handleOnChangePassword = (event) => {
//     setPassWord(event.target.value);
//   };

//   const handleLogin = () => {
//     console.log("Username: " + userName, "passWord: " + passWord);
//   };

//   const handleShowHidePassword = () => {
//     setIsShowPassword(!isShowPassword);
//   };

//   return (
//     <div className="login-background">
//       <div className="login-container">
//         <div className="login-content row">
//           <div className="col-12 text-center login-text">Login</div>
//           <div className="col-12 form-group login-input">
//             <label>Username</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter your username"
//               value={userName}
//               onChange={handleOnChangeUsername}
//             />
//           </div>
//           <div className="col-12 form-group login-input">
//             <label>Password</label>
//             <div>
//               <input
//                 type={isShowPassword ? "text" : "password"}
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={passWord}
//                 onChange={handleOnChangePassword}
//               />
//               <span onClick={handleShowHidePassword}>
//                 <i
//                   className={isShowPassword ? "far fa-eye-slash" : "far fa-eye"}
//                 ></i>
//               </span>
//             </div>
//           </div>
//           <div className="col-12">
//             <button className="login-btn" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//           <div className="col-12">
//             <span className="login-span">Forgot your password</span>
//           </div>
//           <div className="col-12 text-center mt-3">
//             <span className="login-orther-text">Or sign in with:</span>
//           </div>
//           <div className="col-12 login-social">
//             <i className="fab fa-facebook-f facebook"></i>
//             <i className="fab fa-twitter twitter"></i>
//             <i className="fab fa-google-plus-g google"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
