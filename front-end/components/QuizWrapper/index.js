import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ListenerQuiz from '../../experiments/listener-quiz';
import QuizForum from '../QuizForum/index';
import Modal from '../PopupModal/model';
import s from './styles.css';
import {
  isAuthenticated,
  login,
  checkLogin,
  getUserInfo,
  loginSuccess,
  generateAnonymousUser
} from '../../actions/userinfo';
import {
  sendTempResponse,
  sendTempStimulusResponse
} from '../../actions/tempResponse';
import { makePost } from '../../actions/forum';

class QuizWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentQuestion: null,
      count: 0,
      isModalOpen: false
    };
    this.quiz = this.getLocation();
  }
  componentDidMount() {
    this.showProfile();
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  componentWillUnmount() {
    this.props.dispatch(sendTempResponse([]));
    this.props.dispatch(sendTempStimulusResponse([]));
    localStorage.removeItem('tempUser');
  }
  showQuizPopUp = () => {
    if (!isAuthenticated()) {
      return (
        <Modal isOpen={this.state.count == this.props.config.popup}>
          <div className={s['modal-content']}>
            <h4 style={{ textAlign: 'center' }}>
              There are many benefits after logging in, please{' '}
              <a style={{ cursor: 'pointer' }} onClick={login}>
                Log In/Sign up
              </a>
            </h4>
            <div className={s['modal-close']}>
              <Button onClick={this.closeModal}>Close</Button>
            </div>
          </div>
        </Modal>
      );
    }
  };
  closeModal = () => {
    this.setState({ isModalOpen: false, count: 0 });
  };
  getLocation = () => {
    const { location } = this.props;
    return location.pathname.split('/').pop();
  };
  dispatchCheckLogin = () => {
    this.props.dispatch(checkLogin());
  };
  setCount = () => {
    if (!isAuthenticated()) {
      this.setState({ count: (this.state.count += 1) });
    }
  };
  showProfile = () => {
    if (isAuthenticated()) {
      this.props.dispatch(getUserInfo());
    } else {
      this.props.dispatch(generateAnonymousUser());
    }
  };
  //get a user for the listenerquiz
  mountCurrentQuestion = data => {
    this.setState({ currentQuestion: data });
  };
  makeForumPost = (post, cb) => {
    this.props.dispatch(makePost(post, cb));
  };
  dispatchTempResponse = (response, item) => {
    if (!isAuthenticated()) {
      if (item) {
        this.props.dispatch(sendTempStimulusResponse(response));
      } else {
        this.props.dispatch(sendTempResponse(response));
      }
    }
  };
  render() {
    const { config } = this.props;
    return (
      <div>
        {this.props.userInfo.profile && (
          <ListenerQuiz
            user={this.props.userInfo.profile}
            mountCurrentQuestion={this.mountCurrentQuestion}
            setCount={this.setCount}
            dispatchTempResponse={this.dispatchTempResponse}
          />
        )}
        {config.auth && <div>{this.showQuizPopUp()}</div>}
        {config.forum &&
          this.state.currentQuestion && (
            <QuizForum
              currentQuestion={this.state.currentQuestion}
              user={this.props.userInfo.profile}
              checkLogin={this.dispatchCheckLogin}
              login={login}
              makeForumPost={this.makeForumPost}
              isAuthenticated={isAuthenticated}
              formData={this.props.form}
              quiz={this.quiz}
            />
          )}
        {!this.props.userInfo.profile && (
          <p className={s.loading}>
            <b>Loading...</b>
          </p>
        )}
      </div>
    );
  }
}
export default connect(state => state)(QuizWrapper);
