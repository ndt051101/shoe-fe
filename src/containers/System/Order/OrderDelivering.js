import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageOrder.scss";
import { FormattedMessage } from "react-intl";
import ModalOrder from "./Modal/ModalOrder";
import ModalEditOrder from "./Modal/ModalEditOrder";
import { getOrderByStatus, orderDelivered } from "../../../services/orderService";
import { toast } from "react-toastify";


class OrderDelivering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            isOpenModal: false,
            isOpenEditModal: false,
            orderEdit: {},
        };
    }

    async componentDidMount() {
        try {
            const data = await getOrderByStatus(1)
            if(data) {
                this.setState({
                    ...this.state,
                    arrOrder: [...data]
                })
                console.log(data)
            }
        }
        catch(error) {}
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            this.setState({
                arrOrder: this.props.project,
            });
        }
        if (prevProps.project !== this.props.project) {
            this.setState({
                name: "",
                note: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                action: CRUD_ACTIONS.CREATE,
            });
        }
    }

    handleDeliveredOrder = async (id) => {
        try {
            const data = await orderDelivered(id)

            if(data?.success === true) {
                const newArrOrder = this.state.arrOrder.filter(item => item._id !== id)

                this.setState({
                    ...this.state,
                    arrOrder: [...newArrOrder]
                })

                toast.success("SUCCESS!");
            }
        }
        catch(error) {
            toast.error("FAILED!");
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

    editProject = (project) => {
        this.setState({
            isOpenEditModal: true,
            orderEdit: project,
        });
    };

    handleEditModal = (project) => {
        this.props.editAProject(project);
        this.setState({
            isOpenEditModal: false,
        });
    };

    handleDelete = (project) => {
        this.props.deleteAProject(project._id);
    };

    render() {
        const { arrOrder, isOpenModal, isOpenEditModal, orderEdit } =
            this.state;
        return (
            <div className="manage-order-container">
                <div className="ms-title">Đơn hàng đang giao</div>
                <ModalOrder
                    isOpenModal={isOpenModal}
                    toggleModal={this.toggleModal}
                />
                {isOpenEditModal && (
                    <ModalEditOrder
                        isOpenEditModal={isOpenEditModal}
                        orderEdit={orderEdit}
                        toggleEditModal={this.toggleEditModal}
                        handleEditModal={this.handleEditModal}
                    />
                )}
                <div className="manage-order-body">
                    <div className="row">
                        <div className="col-12">
                            <table id="TableManagerUser">
                                <tbody>
                                    <tr>
                                        <th>Code</th>
                                        <th>Quantity</th>
                                        <th>Total price</th>
                                        <th>Actions</th>
                                    </tr>
                                    {arrOrder && arrOrder.length > 0 ? (
                                        arrOrder.map((item, index) => {
                                            console.log(item)
                                            return (
                                                <tr key={index}>
                                                    <td>{item.code}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                this.handleDeliveredOrder(item._id)
                                                            }
                                                            className="btn-edit"
                                                        >
                                                            <i className="fas fa-check"></i>
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
        project: state.admin.project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProject: () => dispatch(actions.fetchAllProject()),
        editAProject: (data) => {
            dispatch(actions.editAProject(data));
        },
        deleteAProject: (id) => dispatch(actions.deleteAProject(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDelivering);
