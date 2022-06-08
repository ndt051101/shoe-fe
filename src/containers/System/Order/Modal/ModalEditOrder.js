import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEditOrder.scss";
import { CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import _ from "lodash";

const mdParser = new MarkdownIt();

class ModalEditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            note: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    async componentDidMount() {
        const { orderEdit } = this.props;
        if (orderEdit && !_.isEmpty(orderEdit)) {
            this.setState({
                id: orderEdit.id,
                name: orderEdit.name,
                note: orderEdit.note,
                imageBase64: orderEdit.image,
                descriptionHTML: orderEdit.descriptionHTML,
                descriptionMarkdown: orderEdit.descriptionMarkdown,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnchangeImage = async (event) => {
        const data = event.target.files;
        console.log("Data: ", data);
        const file = data[0];
        console.log("File: ", file);
        if (file) {
            const base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
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

    handleSaveProject = async () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        this.props.handleEditModal(this.state);
    };

    render() {
        const { isOpenEditModal, toggleEditModal } = this.props;
        const { name, note, descriptionMarkdown } = this.state;

        return (
            <Modal
                isOpen={isOpenEditModal}
                size="xl"
                centered
                toggle={toggleEditModal}
            >
                <div className="modal-header ">
                    <span className="left">THÊM DỰ ÁN</span>
                    <span className="right" onClick={toggleEditModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-project row p-3">
                    <div className="col-4 form-group">
                        <label>Tên dự án</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Ảnh</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnchangeImage(event)
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Mô tả dự án</label>
                        <input
                            type="text"
                            className="form-control"
                            value={note}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "note")
                            }
                        />
                    </div>
                    <div className="col-12 form-group my-4">
                        <MdEditor
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12 my-4">
                        <button
                            className="btn-lg btn-primary"
                            onClick={() => this.handleSaveProject()}
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
    return { fetchAllProject: () => dispatch(actions.fetchAllProject()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditOrder);
