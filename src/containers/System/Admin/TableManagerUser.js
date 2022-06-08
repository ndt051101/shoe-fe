import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_ROLE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./TableManagerUser.scss";

class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }
    async componentDidMount() {
        await this.props.fetchAllUsersStart();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users,
            });
        }
    };

    handleDeleteUser = (user) => {
        this.props.deleteAUser(user._id);
    };

    editUser = (user) => {
        this.props.editUser(user);
    };

    render() {
        const arrUsers = this.state.usersRedux;

        return (
            <>
                <table id="TableManagerUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 ? (
                            arrUsers.map((item, index) => {
                                if (item.role === USER_ROLE.ADMIN) {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        this.editUser(item)
                                                    }
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                    className="btn-delete"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Không có
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        users: state.admin.users,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
