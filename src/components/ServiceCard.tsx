/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React, { useContext } from 'react'
import { myContext } from "../contexts/globalContext"

let test: any[] = [];
let friends: string[] =['proof', 'of', 'concept', 'render']
for (let i = 0; i < friends.length ; i++){
  test.push(<button>{friends[i]}</button>)
}

function ServiceCard (): JSX.Element{
  const { urls } = useContext(myContext)
    return (
      <div className="serviceCard">
          <h1>{urls}</h1>
          {test}
      </div>
    )
  }

export { ServiceCard };