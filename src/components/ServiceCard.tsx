/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React, { useContext, useState } from 'react'
import { myContext } from "../contexts/globalContext"
import { Button } from '@material-ui/core';
import { ChartContainer } from '../containers/ChartContainer'
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {Switch } from 'antd'

function ServiceCard (): JSX.Element{
    const { urls } = useContext(myContext)
// console.log({urls}, 'urls')
const [toggle, setToggle] = useState<boolean>(false)

let urlList: any[] = [];

for (let i = 0; i < urls.length ; i++){
  urlList.push(
    <div key={i}>
    <Button fullWidth variant="outlined" color="primary" 
    onClick={() => {console.log(toggle); setToggle(!toggle)}}>
      {urls[i]}
      </Button>
      <Switch></Switch>
      <div className={toggle ? 'show' :'hide'}>
        { toggle ? <ChartContainer key={i} /> : null}
      </div>
      </div>)
}
    return (
      <div className="serviceCard">
          {/* <h1>{urls}</h1> */}
          {urlList}
      </div>
    )
  }

export { ServiceCard };