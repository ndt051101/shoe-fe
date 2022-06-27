import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageOrder.scss";
import { FormattedMessage } from "react-intl";
import ModalOrder from "./Modal/ModalOrder";
import ModalEditOrder from "./Modal/ModalEditOrder";
import {
    getOrderByStatus,
    orderDelivered,
    searchOrder
} from "../../../services/orderService";
import { toast } from "react-toastify";




let timeOut

const deBounce = (func, delay) => {
    return (...args) => {
        if(timeOut) clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

class OrderDelivered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            isOpenModal: false,
            isOpenEditModal: false,
            orderEdit: {},
            search: ''
        };
    }

    async componentDidMount() {
        try {
            const data = await getOrderByStatus(2);
            if (data) {
                this.setState({
                    ...this.state,
                    arrOrder: [...data],
                });
                console.log(data);
            }
        } catch (error) {}
    }

    handleSearch = async (value) => {
        try {
            const res = await searchOrder(value, 2)

            if(res?.success) {
                this.setState({
                    ...this.state,
                    arrOrder: [...res.data]
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

    render() {
        const { arrOrder, search } = this.state;
        return (
            <div className="manage-order-container">
                <div className="ms-title">Đơn hàng đã giao</div>

                <div className="input-group" style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
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
                                            console.log(item);
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
