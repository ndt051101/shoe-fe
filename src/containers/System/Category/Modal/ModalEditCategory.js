import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEditCategory.scss";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import _ from "lodash";
import { toast } from "react-toastify";

class ModalEditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
    }

    async componentDidMount() {
        const { categoryEdit } = this.props;
        if (categoryEdit && !_.isEmpty(categoryEdit)) {
            this.setState({
                _id: categoryEdit._id,
                name: categoryEdit.name,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    checkValidateInput = () => {
        let isValid = true;
        const arrCheck = ["name"];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Missing input: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    handleSaveCategory = () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        this.props.handleEditModal(this.state);
    };

    render() {
        const { isOpenEditModal, toggleEditModal } = this.props;
        const { name } = this.state;

        return (
            <Modal
                isOpen={isOpenEditModal}
                toggle={toggleEditModal}
                size="l"
                centered
            >
                <div className="modal-header ">
                    <span className="left">SỬA DANH MỤC</span>
                    <span className="right" onClick={toggleEditModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-technology row p-3">
                    <div className="col-12 form-group">
                        <label>Tên danh mục</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        />
                    </div>

                    <div className="col-12 my-1">
                        <button
                            className="btn-primary btn-lg"
                            onClick={() => this.handleSaveCategory()}
                        >
                            Save
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
    return {
        fetchAllCategory: () => dispatch(actions.fetchAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCategory);
