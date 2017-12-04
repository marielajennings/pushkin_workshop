import React from 'react';
import ForumContent from '../../components/ForumContent/index';
import s from './styles.css';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../../actions/forum';
import ForumTrendingQuestions from '../../components/ForumTrendingQuestions/index';
import PostForm from '../../components/QuizForum/index';
import {
  isAuthenticated,
  login,
  checkLogin,
  getUserInfo,
  loginSuccess,
  loginLocation,
  generateAnonymousUser
} from '../../actions/userinfo';
import { makePost } from '../../actions/forum';

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false, posts: null };
  }
  componentDidMount() {
    fetchAllPosts().then(res => {
      this.setState({ posts: res });
    });
    this.props.dispatch(getUserInfo());
  }
  makeForumPost = (post, cb) => {
    this.props.dispatch(makePost(post, cb));
  };
  dispatchCheckLogin = () => {
    this.props.dispatch(checkLogin());
  };
  handleLocalPostChange = () => {
    fetchAllPosts().then(res => {
      this.setState({ posts: res });
    });
  };
  render() {
    const { forum, userInfo, formData } = this.props;

    return (
      <div className="styles_blurb_3jf">
        {this.props.children && <div>{this.props.children}</div>}
        {!this.props.children && (
          <div className={s['forum-wrapper']}>
            <div className={s['trending-questions']}>
              <ForumTrendingQuestions />
            </div>
            {this.state.posts && (
              <div className={s.content}>
                <PostForm
                  user={userInfo}
                  fromForum
                  isAuthenticated={isAuthenticated}
                  makeForumPost={this.makeForumPost}
                  formData={formData}
                  checkLogin={this.dispatchCheckLogin}
                  login={login}
                  handleLocalPostChange={this.handleLocalPostChange}
                />
                <ForumContent posts={this.state.posts} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    formData: state.form,
    userInfo: state.userInfo.profile
  };
};
export default connect(mapStateToProps)(Forum);
