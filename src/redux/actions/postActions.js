export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});


export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const editPost = (post) => ({
  type: EDIT_POST,
  payload: post,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await axios.get('/api/posts');
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/posts', post);
      dispatch(addPost(response.data));
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };
};

export const updatePost = (post) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/posts/${post._id}`, post);
      dispatch(editPost(response.data));
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };
};

export const removePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch(deletePost(postId));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };
};