import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
export default function Icon({ type, className, ...rest }) {
  return (
    //除了，type,className需要单独解构，别的都一个打包传给svg 因为都是原样传递
    <svg
      {...rest}
      //   style={style}
      //   onClick={onClick}
      className={classNames('icon', className)}
      aria-hidden="true"
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = { type: PropTypes.string.isRequired }
