import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import "./ManageProduct.scss";
import "react-markdown-editor-lite/lib/index.css";

import ModalProduct from "./Modal/ModalProduct";
import ModalEditProduct from "./Modal/ModalEditProduct";
import { searchProduct } from "../../../services/userService";




let timeOut

const deBounce = (func, delay) => {
    return (...args) => {
        if(timeOut) clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            arrProduct: [],
            isOpenEditModal: false,
            productEdit: {},
            search: ''
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

    handleSearch = async (value) => {
        try {
            const res = await searchProduct(value)

            console.log(res)

            if(res?.success) {
                console.log(res.data)
                this.setState({
                    ...this.state,
                    arrProduct: [...res.data]
                })
            }
        }
        catch(error) {
            console.log(error.response)
        }
    }

    handleOnchangeSearch = (event) => {
        const value = event.target.value
        this.setState(
            {
                search: value
            }
        );
        this.deBounceSearch(value.trim())
    };

    deBounceSearch = deBounce(this.handleSearch, 500)

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
        const { isOpenModal, arrProduct, isOpenEditModal, productEdit, search } =
            this.state;
        return (
            <div className="manage-product-container">
                <div className="ms-title">Quản lí sản phẩm</div>

                <div className="input-group" style={{ flex: 1, alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <button
                            className="btn-success btn-lg my-3"
                            onClick={this.toggleModal}
                        >
                            THÊM SẢN PHẨM
                        </button>
                    </div>
                    <div className="form-outline">
                        <input 
                            type="search" 
                            className="form-control" 
                            placeholder="Search by code"
                            value={search}
                            onChange={(event) =>
                                this.handleOnchangeSearch(event)
                            }
                        />
                    </div>
                </div>

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
