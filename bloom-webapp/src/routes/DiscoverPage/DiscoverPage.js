import React, { PropTypes } from 'react'
import { connect } from 'dva'

import {AL} from '../../utils'

const DiscoverPage = ({
  // location,
  dispatch,
  discover,
}) => {

  return (
    <div className='content-inner'>
      发现页
    </div>
  );
}

DiscoverPage.propTypes = {

}

function mapStateToProps ({ discover }) {
  return { discover }
}

export default connect(mapStateToProps)(DiscoverPage);
