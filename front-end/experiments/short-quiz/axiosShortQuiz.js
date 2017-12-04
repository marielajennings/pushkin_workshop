import Axios from 'axios';

const axiosShortQuiz = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api/short-quiz'
      : '//localhost/api/short-quiz'
});

module.exports = axiosShortQuiz;
