import React, { PropTypes } from 'react'
import { connect } from 'dva'

import {AL} from '../../utils'

const MinePage = ({
  // location,
  dispatch,
  mine,
}) => {

  return (
      <div className='content-inner'>
        我的页
      </div>
  );
}

MinePage.propTypes = {

}

function mapStateToProps ({ mine }) {
  return { mine }
}

export default connect(mapStateToProps)(MinePage)
