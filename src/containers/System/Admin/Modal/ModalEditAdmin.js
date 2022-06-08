import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEditAdmin.scss";
import { CRUD_ACTIONS } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { Modal } from "reactstrap";

class ModalEditAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            email: "",
            fullName: "",
            role: "",
        };
    }

    async componentDidMount() {
        const { userEdit } = this.props;
        console.log("user", userEdit);
        if (userEdit && !_.isEmpty(userEdit)) {
            this.setState({
                id: userEdit._id,
                email: userEdit.email,
                fullName: userEdit.fullName,
                role: userEdit.role,
            });
        }
    }

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
        const arrCheck = ["email", "fullName"];

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

        this.props.handleEditModal({
            _id: this.state.id,
            email: this.state.email,
            fullName: this.state.fullName,
            role: this.state.role,
        });
    };

    render() {
        const { isOpenEditModal, toggleEditModal } = this.props;
        const { email, fullName, role } = this.state;

        return (
            <Modal
                isOpen={isOpenEditModal}
                toggle={toggleEditModal}
                size="l"
                centered
            >
                <div className="modal-header ">
                    <span className="left">THÊM NGƯỜI DÙNG</span>
                    <span className="right" onClick={toggleEditModal}>
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
                            disabled
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
                            type="text"
                            className="form-control"
                            value={role}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "role")
                            }
                            disabled
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAdmin);
