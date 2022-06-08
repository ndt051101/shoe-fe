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


class OrderDelivered extends Component {
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
            const data = await getOrderByStatus(2)
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

    render() {
        const { arrOrder, isOpenModal, isOpenEditModal, orderEdit } =
            this.state;
        return (
            <div className="manage-order-container">
                <div className="ms-title">Đơn hàng đã giao</div>
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
                                    </tr>
                                    {arrOrder && arrOrder.length > 0 ? (
                                        arrOrder.map((item, index) => {
                                            console.log(item)
                                            return (
                                                <tr key={index}>
                                                    <td>{item.code}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDelivered);
