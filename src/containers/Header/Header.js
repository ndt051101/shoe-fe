import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import logo from "../../assets/images/logo1.jpg";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    componentDidMount() {
        const { userInfo } = this.props;
        let menu = [];
        if (userInfo) {
            const role = userInfo.role;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }
    render() {
        const { processLogout, userInfo, language } = this.props;
        return (
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="language">
                    <span className="welcome">
                        <FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.fullName
                            ? userInfo.fullName
                            : ""}{" "}
                        !
                    </span>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? "language-en active"
                                : "language-en"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => {
            localStorage.removeItem('token')
            dispatch(actions.processLogout())
        },
        changeLanguage: (data) => dispatch(actions.changeLanguage(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
