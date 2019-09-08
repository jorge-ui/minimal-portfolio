import React, { useEffect } from 'react';
import './objective-center.styles.scss';
// Redux
import { connect } from 'react-redux';
import { setCenterXy } from '../../../../redux/center/center.actions';
import GoBack from '../go-back/go-back.component';

const ObjectiveCenter = ({ setCenterXy }) => {
  useEffect(() => {
    setCenterXy([null, '85%']);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <GoBack />;
};

export default connect(
  null,
  { setCenterXy }
)(ObjectiveCenter);
