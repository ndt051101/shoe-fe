import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalProduct.scss";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { createNewProduct } from "../../../../services/userService";
import FormData from "form-data";

class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: 0,
            description: "",
            size: "",
            image: "",
            color: "",
            categoryArr: [],
            category: "",
            defaultCategory: "",
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCategory();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allCategory !== this.props.allCategory) {
            this.setState({
                categoryArr: this.props.allCategory,
            });
        }
    }

    handleOnchangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState(
            {
                ...copyState,
            },
            () => {
                console.log("Check Data: ", this.state);
            }
        );
    };

    handleOnchangeImage = async (event) => {
        const dataEvent = event.target.files;
        const file = dataEvent[0];

        this.setState({
            image: file,
        });
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

    handleSaveProduct = async () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        const data = new FormData();

        const ArrSize = new Function("return [" + this.state.size + "];")();
        const ArrColor = this.state.color.split(",");

        data.append("name", this.state.name);
        data.append("price", this.state.price);
        data.append("description", this.state.description);
        data.append("image", this.state.image);

        ArrSize.map((item, index) => {
            return data.append("size", item);
        });
        ArrColor.map((item, index) => {
            return data.append("color", item);
        });
        data.append("category", this.state.category);

        const res = await createNewProduct(data);
        if (res && res.success === true) {
            setTimeout(() => {
                toast.success("CREATE PRODUCT SUCCESS!");
                this.props.fetchAllProduct();
                this.props.toggleModal();
            }, 1000);

            this.setState({
                name: "",
                price: "",
                description: "",
                descriptionHTML: "",
                image: "",
                size: "",
                color: "",
            });
        } else {
            toast.error("CREATE PRODUCT FAILED!");
            console.log("Create New Product: ", res);
        }
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { name, price, description, category, categoryArr, size, color } =
            this.state;

        return (
            <Modal isOpen={isOpenModal} toggle={toggleModal} size="xl" centered>
                <div className="modal-header ">
                    <span className="left">THÊM SẢN PHẨM</span>
                    <span className="right" onClick={toggleModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-project row p-3">
                    <div className="col-6 form-group">
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "name")
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Giá sản phẩm</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "price")
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Mô tả sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "description")
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ảnh</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnchangeImage(event)
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Kích thước sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            value={size}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "size")
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Màu sắc sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            value={color}
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "color")
                            }
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Danh mục sản phẩm</label>
                        <select
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnchangeInput(event, "category")
                            }
                            value={category}
                        >
                            {categoryArr &&
                                categoryArr.length > 0 &&
                                categoryArr.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="col-12 my-4">
                        <button
                            className="btn-lg btn-primary"
                            onClick={() => this.handleSaveProduct()}
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
        allCategory: state.admin.allCategory,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCategory: () => {
            dispatch(actions.fetchAllCategory());
        },
        fetchAllProduct: () => {
            dispatch(actions.fetchAllProduct());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
