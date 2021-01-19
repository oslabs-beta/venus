import { Switch } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { ChartContainer} from '../containers/ChartContainer';
import { Chart} from './Chart';
// const [selected, setSelected] = useState<boolean>(false)


export function ChartRender (){
    const getValue = (e:any, val:boolean) => {
        console.log(val)
    }
    const [toggle, setToggle] = useState<boolean>(false)
    return(
        <div>
<Switch
  color="primary"
  size="small"
  onChange={() => {console.log(toggle); setToggle(!toggle)}}
/>
<div className={toggle ? 'show' :'hide'}>
        { toggle ? <Chart /> : null}
      </div>
</div>)
}