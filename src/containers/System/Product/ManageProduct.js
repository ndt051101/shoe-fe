import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import "./ManageProduct.scss";
import "react-markdown-editor-lite/lib/index.css";

import ModalProduct from "./Modal/ModalProduct";
import ModalEditProduct from "./Modal/ModalEditProduct";

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            arrProduct: [],
            isOpenEditModal: false,
            productEdit: {},
        };
    }

    async componentDidMount() {
        await this.props.fetchAllProduct();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allProduct !== this.props.allProduct) {
            this.setState({
                arrProduct: this.props.allProduct,
            });
        }

        if (prevProps.allProduct !== this.props.allProduct) {
            this.setState({
                name: "",
                note: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                property: "",
                action: CRUD_ACTIONS.CREATE,
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

    editProduct = (product) => {
        console.log(product);
        this.setState({
            isOpenEditModal: true,
            productEdit: product,
        });
    };

    handleEditModal = (product) => {
        this.props.editAProduct(product);
        this.setState({
            isOpenEditModal: false,
        });
    };

    handleDelete = (product) => {
        this.props.deleteAProduct(product._id);
    };

    render() {
        const { isOpenModal, arrProduct, isOpenEditModal, productEdit } =
            this.state;
        return (
            <div className="manage-product-container">
                <button
                    className="btn-success btn-lg my-3"
                    onClick={this.toggleModal}
                >
                    THÊM SẢN PHẨM
                </button>
                <div className="ms-title">Quản lí sản phẩm</div>

                <ModalProduct
                    isOpenModal={isOpenModal}
                    toggleModal={this.toggleModal}
                />
                <ModalEditProduct
                    isOpenEditModal={isOpenEditModal}
                    productEdit={productEdit}
                    toggleEditModal={this.toggleEditModal}
                    handleEditModal={this.handleEditModal}
                />
                <div className="manage-product-body">
                    <div className="row">
                        <div className="col-12">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Danh mục sản phẩm</th>
                                        <th>Size</th>
                                        <th>Màu sắc</th>
                                        <th>Actions</th>
                                    </tr>
                                    {arrProduct && arrProduct.length > 0 ? (
                                        arrProduct.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {item.category.name}
                                                    </td>
                                                    <td>
                                                        {item.size.map(
                                                            (item, index) => {
                                                                return `${item}, `;
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.color.map(
                                                            (item, index) => {
                                                                return `${item}, `;
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                this.editProduct(
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
        allProduct: state.admin.allProduct,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProduct: () => {
            dispatch(actions.fetchAllProduct());
        },
        editAProduct: (data) => {
            dispatch(actions.editAProduct(data));
        },
        deleteAProduct: (id) => dispatch(actions.deleteAProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
