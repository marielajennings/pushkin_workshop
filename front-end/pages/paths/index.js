import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import s from './styles.css';

class PathsPage extends React.Component {
  render() {
    return (
      <div className={s.white}>
        <Row className="display">
          <Col sm={12} lg={12} className={s.textCenter}>
            <p className={s.heading} style={{ marginTop: '30px' }} >CHOOSE YOUR PATH.</p>
            <p className={s.subText}>
              <b>I want to be a...</b>
            </p>
          </Col>
        </Row>
        <Row className="display">
          <Col sm={12} lg={6} className={s.gif + ' ' + s.border}>
            <Link href="/projects">
              <Image
                src={require('../../img/r3.jpg')}
                style={{ marginTop: '150px' }}
                responsive
                className={s.gif}
              />
            </Link>
            <p className={s.subText}>
              <b>Researcher</b>
            </p>
            <p className={s.subText} style={{ marginBottom: '50px' }}>
              Placeholder Description
            </p>
          </Col>
          <Col sm={12} lg={6} className={s.gif + ' ' + s.margin}>
            <Link to="/quizzes">
              <Image
                src={require('../../img/p1.jpg')}
                style={{ marginTop: '180px' }}
                responsive
                className={s.gif}
              />
            </Link>
            <p className={s.subText} style={{ marginBottom: '20px' }} >
              <b>Participant</b>
            </p>
            <p className={s.subText} style={{ marginBottom: '5px' }}>
              Placeholder Description
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PathsPage;
