/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React from 'react'

function ServiceCard (): JSX.Element{
    return (
      <div className="Card">
        <div className="Card--text">
          <h1 className={checkUrl}>{url.name}</h1>
          <span className={checkUrl}>{url.description}</span>
        </div>
    )
}

export { ServiceCard };