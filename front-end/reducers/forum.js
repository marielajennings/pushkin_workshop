import {
  CREATE_POST,
  FETCH_ALL_POSTS,
  FETCH_ONE_POST,
  FETCHING
} from '../actions/forum';

export default function forum(state = {}, action) {
  switch (action.type) {
    case CREATE_POST: {
      return {
        ...state,
        post: action.post
      };
    }
    case FETCH_ALL_POSTS: {
      return {
        ...state,
        fetching: false,
        allPosts: action.data
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...state,
        fetching: false,
        post: action.post
      };
    }
    case FETCHING: {
      return {
        ...state,
        fetching: true
      };
    }
    default:
      return state;
  }
}
