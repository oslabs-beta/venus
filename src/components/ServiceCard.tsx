/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React, { useContext } from 'react'
import { myContext } from "../contexts/globalContext"
import { Button } from '@material-ui/core';


function ServiceCard (): JSX.Element{
    const { urls } = useContext(myContext)
console.log({urls}, 'urls')
let urlList: any[] = [];
let friends: string[] = urls
for (let i = 0; i < urls.length ; i++){
  urlList.push(<Button fullWidth variant="outlined" color="primary" key={i} >{friends[i]}</Button>)
}



    return (
      <div className="serviceCard">
          {/* <h1>{urls}</h1> */}
          {urlList}
      </div>
    )
  }

export { ServiceCard };