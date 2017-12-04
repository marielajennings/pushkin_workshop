import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import s from './styles.css';
import NativeListener from 'react-native-listener';

const SimpleForm = props => {
  const {
    handleSubmit,
    user,
    close,
    data,
    formData,
    fromForum,
    handleLocalPostChange,
    quiz
  } = props;
  const handleButtonClick = event => {
    if (Number(event.key) < 10) {
      event.stopPropagation();
    }
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(
          {
            auth0_id: user.auth0_id,
            post_subject: formData.simple.values.post_subject,
            post_content: formData.simple.values.post_content,
            created_at: new Date(),
            stim: data || null,
            quiz: quiz || null
          },
          () => {
            close();
            if (fromForum) {
              handleLocalPostChange();
            }
          }
        );
      }}
      className={s['post-form']}
    >
      {!fromForum && (
        <div>
          <label>
            Post a question about {quiz} Q{data.question.trial_index}
          </label>
        </div>
      )}
      <div>
        <label>Subject</label>
        <div>
          <NativeListener onKeyDown={handleButtonClick}>
            <Field
              name="post_subject"
              component="input"
              type="text"
              placeholder="enter a subject"
            />
          </NativeListener>
        </div>
      </div>
      <div>
        <label>Content</label>
        <div>
          <NativeListener onKeyDown={handleButtonClick}>
            <Field name="post_content" component="textarea" />
          </NativeListener>
        </div>
      </div>
      <div className={s['button-container']}>
        <Button className="btn btn-success" type="submit">
          Submit
        </Button>
        <Button className="btn btn-danger" onClick={close}>
          Close
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(SimpleForm);
