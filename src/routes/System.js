import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageAdmin from "../containers/System/Admin/ManageAdmin";
import ManageCustomer from "../containers/System/Admin/ManageCustomer";
import ManageCategory from "../containers/System/Category/ManageCategory";
import ManageProduct from "../containers/System/Product/ManageProduct";
import OrderProcessing from "../containers/System/Order/OrderProcessing";
import OrderDelivering from "../containers/System/Order/OrderDelivering";
import OrderDelivered from "../containers/System/Order/OrderDelivered";
import Header from "../containers/Header/Header";
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/system/manage-admin"
                                component={ManageAdmin}
                            />
                            <Route
                                path="/system/manage-customer"
                                component={ManageCustomer}
                            />
                            <Route
                                path="/system/manage-category"
                                component={ManageCategory}
                            />
                            <Route
                                path="/system/manage-product"
                                component={ManageProduct}
                            />
                            <Route
                                path="/system/manage-order-processing"
                                component={OrderProcessing}
                            />
                            <Route
                                path="/system/manage-order-delivering"
                                component={OrderDelivering}
                            />
                            <Route
                                path="/system/manage-order-delivered"
                                component={OrderDelivered}
                            />

                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
