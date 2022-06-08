import React, { Component } from "react";
import { connect } from "react-redux";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="text-center">Không có gì cả! </div>;
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
