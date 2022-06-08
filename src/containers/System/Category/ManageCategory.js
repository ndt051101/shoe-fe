import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageCategory.scss";
import ModalCategory from "./Modal/ModalCategory";
import ModalEditCategory from "./Modal/ModalEditCategory";

class ManageCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategogry: [],
            isOpenModal: false,
            isOpenEditModal: false,
            categoryEdit: {},
        };
    }

    componentDidMount() {
        this.props.fetchAllCategory();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.category !== this.props.category) {
            this.setState({
                arrCategogry: this.props.category,
            });
        }
    }

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

    editCategory = (category) => {
        this.setState({
            isOpenEditModal: true,
            categoryEdit: category,
        });
    };

    handleEditModal = (category) => {
        this.props.editACategory(category);
        this.setState({
            isOpenEditModal: false,
        });
    };

    handleDelete = (category) => {
        this.props.deleteACategory(category._id);
    };

    render() {
        const { arrCategogry, isOpenModal, categoryEdit, isOpenEditModal } =
            this.state;

        return (
            <div className="manage-category-container">
                <button
                    className="btn-success btn-lg my-3"
                    onClick={this.toggleModal}
                >
                    THÊM DANH MỤC
                </button>
                <div className="ms-title">Quản lí danh mục</div>
                <ModalCategory
                    isOpenModal={isOpenModal}
                    toggleModal={this.toggleModal}
                />
                {isOpenEditModal && (
                    <ModalEditCategory
                        isOpenEditModal={isOpenEditModal}
                        categoryEdit={categoryEdit}
                        toggleEditModal={this.toggleEditModal}
                        handleEditModal={this.handleEditModal}
                    />
                )}

                <div className="manage-project-body">
                    <div className="row">
                        <div className="col-12">
                            <table id="TableManagerUser">
                                <tbody>
                                    <tr>
                                        <th>Tên danh mục</th>
                                        <th>Actions</th>
                                    </tr>
                                    {arrCategogry && arrCategogry.length > 0 ? (
                                        arrCategogry.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                this.editCategory(
                                                                    item
                                                                )
                                                            }
                                                            className="btn-edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                this.handleDelete(
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
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                Không có
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
        category: state.admin.allCategory,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCategory: () => dispatch(actions.fetchAllCategory()),
        editACategory: (data) => {
            dispatch(actions.editACategory(data));
        },
        deleteACategory: (id) => dispatch(actions.deleteACategory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
