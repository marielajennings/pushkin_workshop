import React from 'react';
import { browserHistory } from 'react-router';
import Modal from '../PopupModal/model';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import SimpleForm from '../PostForm/form';
import s from './styles.css';
class QuizForum extends React.Component {
  constructor(props) {
    super(props);
    this.props.checkLogin();
    this.state = { isModalOpen: false, post: {} };
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  handleOnSubmit = (data, cb) => {
    this.props.makeForumPost(data, cb);
  };
  showLogInLink = () => {
    const { user, currentQuestion, isAuthenticated, fromForum } = this.props;
    if (!isAuthenticated()) {
      if (fromForum) {
        return (
          <h4 style={{ textAlign: 'center' }}>
            Please{' '}
            <a style={{ cursor: 'pointer' }} onClick={this.props.login}>
              Log In{' '}
            </a>
            to ask a question on the forum.
          </h4>
        );
      } else {
        if (currentQuestion.question.stimulus) {
          return (
            <h4 style={{ textAlign: 'center' }}>
              Please{' '}
              <a style={{ cursor: 'pointer' }} onClick={this.props.login}>
                Log In{' '}
              </a>
              to ask a question on the forum.
            </h4>
          );
        }
      }
    }
    return (
      <div>
        {!currentQuestion &&
          fromForum && (
            <Button
              className="btn btn-primary"
              onClick={() => this.openModal()}
            >
              Post a new question
            </Button>
          )}
        {currentQuestion &&
          currentQuestion.question.prompt && (
            <Button
              className="btn btn-primary"
              onClick={() => this.openModal()}
            >
              Ask a question
            </Button>
          )}
        <Modal isOpen={this.state.isModalOpen}>
          <div style={{ margin: 10 }}>
            <SimpleForm
              data={currentQuestion}
              formData={this.props.formData}
              user={user}
              handleSubmit={this.handleOnSubmit}
              close={this.closeModal}
              fromForum={fromForum}
              handleLocalPostChange={this.props.handleLocalPostChange}
              quiz={this.props.quiz}
            />
          </div>
        </Modal>
      </div>
    );
  };
  render() {
    return (
      <div
        className={this.props.fromForum ? s['post-button'] : 'styles_blurb_3jf'}
      >
        {this.showLogInLink()}
      </div>
    );
  }
}
export default QuizForum;
