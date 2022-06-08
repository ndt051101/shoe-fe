import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import TableManagerUser from "./TableManagerUser";
import ModalAdmin from "./Modal/ModalAdmin";
import ModalEditAdmin from "./Modal/ModalEditAdmin";

import "./ManageAdmin.scss";

class ManageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
        };
    }
    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };
    toggleEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
        });
    };

    editUser = (user) => {
        console.log(user);
        this.setState({
            isOpenEditModal: true,
            userEdit: user,
        });
    };

    handleEditModal = (project) => {
        this.props.editAUser(project);
        this.setState({
            isOpenEditModal: false,
        });
    };

    render() {
        const { isOpenModal, isOpenEditModal, userEdit } = this.state;
        const { isLoading } = this.props;
        return (
            <div className="user-redux-container">
                <button
                    className="btn-success btn-lg my-3"
                    onClick={this.toggleModal}
                >
                    THÊM NGƯỜI DÙNG
                </button>
                <div className="title">
                    <FormattedMessage id="manager-user.add" />
                </div>
                <div className="title">
                    {isLoading === true ? "Loading..." : ""}
                </div>
                <ModalAdmin
                    isOpenModal={isOpenModal}
                    toggleModal={this.toggleModal}
                />
                {isOpenEditModal && (
                    <ModalEditAdmin
                        isOpenEditModal={isOpenEditModal}
                        userEdit={userEdit}
                        toggleEditModal={this.toggleEditModal}
                        handleEditModal={this.handleEditModal}
                    />
                )}
                <div className="user-redux-body">
                    <div className="row">
                        <div className="col-12">
                            <TableManagerUser editUser={this.editUser} />
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
        isLoading: state.admin.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editAUser: (data) => {
            dispatch(actions.editAUser(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
