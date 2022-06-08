import React from "react";
import { connect } from "react-redux";
import "./DefaultClass.scss";
import { FormattedMessage } from "react-intl";

const DefaultClass = (props) => {
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
