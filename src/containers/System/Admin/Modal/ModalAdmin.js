import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalAdmin.scss";
import { CRUD_ACTIONS } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";

class ModalAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            role: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    handleOnchangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        const arrCheck = ["email", "password", "fullName"];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("Missing input: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    handleSubmit = () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            role: this.state.role,
        });

        setTimeout(() => {
            this.props.fetchAllUsersStart();
            this.props.toggleModal();
            toast.success("CREATE NEW A USER SUCCESS!");
        }, 1000);
        this.setState({
            email: "",
            password: "",
            fullName: "",
            role: "",
        });
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { email, password, fullName, role } = this.state;

        return (
            <Modal isOpen={isOpenModal} toggle={toggleModal} size="l" centered>
                <div className="modal-header ">
                    <span className="left">THÊM NGƯỜI DÙNG</span>
                    <span className="right" onClick={toggleModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-project row p-3">
                    <div className="col-12">
                        <label>
                            <FormattedMessage id="manager-user.email" />
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "email")
                            }
                            disabled={
                                this.state.action === CRUD_ACTIONS.EDIT
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label>
                            <FormattedMessage id="manager-user.password" />
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "password")
                            }
                            disabled={
                                this.state.action === CRUD_ACTIONS.EDIT
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label>
                            <FormattedMessage id="manager-user.first-name" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "fullName")
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label>
                            <FormattedMessage id="manager-user.role" />
                        </label>
                        <input
                            type="text "
                            className="form-control"
                            value={role}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "role")
                            }
                        />
                    </div>

                    <div className="col-12 my-3">
                        <button
                            className={
                                this.state.action === CRUD_ACTIONS.EDIT
                                    ? "btn-warning btn-lg"
                                    : "btn-primary btn-lg"
                            }
                            onClick={() => {
                                this.handleSubmit();
                            }}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manager-user.edit" />
                            ) : (
                                <FormattedMessage id="manager-user.submit" />
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,

        users: state.admin.users,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewUser: (data) => {
            dispatch(actions.createNewUser(data));
        },
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdmin);
