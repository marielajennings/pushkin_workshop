import local from './localAxios';
import { error } from './error';
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCHING = 'FETCHING';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';

function sendAllPosts(data) {
  return {
    type: FETCH_ALL_POSTS,
    data
  };
}
function sendOnePost(post) {
  return {
    type: FETCH_ONE_POST,
    post
  };
}
function createPost(post) {
  return {
    type: CREATE_POST,
    post
  };
}
function fetchAllPostsBegin() {
  return {
    type: FETCHING
  };
}
export function fetchAllPosts() {
  return new Promise((resolve, reject) => {
    return local
      .get('/forumPosts')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        throw err;
      });
  });
}
export function getUserPostIds(auth0Id) {
  return new Promise((resolve, reject) => {
    return local
      .get(`/userForumPosts/${auth0Id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        throw err;
      });
  });
}
export function getOnePost(id) {
  fetchAllPostsBegin();
  return new Promise((resolve, reject) => {
    return local
      .get(`/forumPosts/${id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return local
          .get(`/getAuth0User/${data.auth0_id}`)
          .then(user => {
            return {
              ...data,
              ...user.data
            };
          })
          .then(data => {
            if (data.forumComments.length) {
              return Promise.all(
                data.forumComments.map(comment => {
                  return local
                    .get(`/getAuth0User/${comment.auth0_id}`)
                    .then(user => {
                      return {
                        ...comment,
                        ...user.data
                      };
                    });
                })
              ).then(comments => {
                resolve({
                  ...data,
                  forumComments: comments
                });
              });
            } else {
              resolve(data);
            }
          });
      });
  }).catch(err => {
    throw err;
  });
}
export function makeComment(payload, cb) {
  return (dispatch, getState) => {
    local
      .post('/forumComments', payload, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
      .then(resp => {
        return local.get(`/getAuth0User/${resp.data.auth0_id}`).then(user => {
          cb({
            ...resp.data,
            ...user.data
          });
        });
      })
      .then(res => {
        swal({
          title: 'Comment posted',
          type: 'success',
          text: 'You could track this post on the dashboard'
        });
      })
      .catch(err => {
        return dispatch(error(err));
      });
  };
}
export function makePost(payload, cb) {
  return dispatch => {
    local
      .post('/forumPosts', payload, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
      .then(res => {
        return dispatch(createPost(res));
      })
      .then(() => {
        swal({
          title: 'Post created',
          type: 'success',
          text: 'You could track your post on the dashboard',
          onClose: cb()
        });
      })
      .catch(err => {
        return dispatch(error(err));
      });
  };
}
