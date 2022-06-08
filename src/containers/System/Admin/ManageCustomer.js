import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { USER_ROLE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./ManageCustomer.scss";

class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCustomers: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.users !== this.props.users) {
            this.setState({
                arrCustomers: this.props.users,
            });
        }
    };

    handleDeleteUser = (user) => {
        this.props.deleteAUser(user._id);
    };

    render() {
        const { arrCustomers } = this.state;
        return (
            <div className="manager-customer-container">
                <div className="title">
                    <FormattedMessage id="admin.manager-customer.title" />
                </div>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-12">
                            <table id="TableManagerUser">
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <th>Full Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    {arrCustomers && arrCustomers.length > 0 ? (
                                        arrCustomers.map((item, index) => {
                                            if (item.role === USER_ROLE.USER) {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.email}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>
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
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                Không có{" "}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
