import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalCategory.scss";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import { createNewCategory } from "../../../../services/userService";
import { toast } from "react-toastify";

class ModalCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
    }

    async componentDidMount() {}

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

    handleSaveCategory = async () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        const res = await createNewCategory(this.state);
        if (res && res.success === true) {
            setTimeout(() => {
                toast.success("CREATE CATEGORY SUCCESS!");
                this.props.fetchAllCategory();
                this.props.toggleModal();
            }, 1000);

            this.setState({
                name: "",
            });
        } else {
            toast.error("CREATE TECHNOLOGY FAILED!");
            console.log("Create New Technology: ", res);
        }
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { name } = this.state;

        return (
            <Modal isOpen={isOpenModal} size="l" centered toggle={toggleModal}>
                <div className="modal-header ">
                    <span className="left">THÊM DANH MỤC</span>
                    <span className="right" onClick={toggleModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-technology row p-3">
                    <div className="col-6 form-group">
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCategory);
