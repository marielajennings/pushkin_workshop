import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultsList from '../../components/ResultsList/';
import CommentForm from '../../components/CommentForm/';
import { submitComments, submitPart2 } from '../../actions/userinfo';

class ResultsContainer extends Component {
  render() {
    return (
      <div>
        {this.props.results && <ResultsList results={this.props.results} />}
        <CommentForm
          handleSubmit={comments => {
            this.props.dispatch(submitComments(comments));
          }}
          userInfo={this.props.userInfo}
          submitPart2={answers => {
            this.props.dispatch(submitPart2(answers));
          }}
        />
      </div>
    );
  }
}
export default connect(state => state.pushkin)(ResultsContainer);
