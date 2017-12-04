import React from 'react';
import { Link } from 'react-router';
import s from './styles.css';
import moment from 'moment';

class ForumContent extends React.Component {
  showAllPosts = () => {
    return this.props.posts.map(post => {
      return (
        <div>
          <div>
            <Link to={`/forum/${post.id}`}>
              <h3>{post.post_subject}</h3>
            </Link>

            {post.quiz && <div className={s['quiz-tag']}>{post.quiz}</div>}
            {!post.quiz && (
              <div className={s['quiz-tag']} style={{ background: 'tomato' }}>
                general
              </div>
            )}
          </div>
          <svg height="2" width="100%">
            <line
              x1="100%"
              x2="0%"
              style={{ stroke: '#cfd8dc', strokeWidth: 2 }}
            />
          </svg>
        </div>
      );
    });
  };
  render() {
    return <div>{this.showAllPosts()}</div>;
  }
}

export default ForumContent;
