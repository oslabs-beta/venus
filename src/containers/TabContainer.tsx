/**
 * @name TabContainer
 * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
 */

 import React, { useContext, useState } from 'react';
 import Tab from '../components/Tab'
 import { appendErrors, useForm } from "react-hook-form"
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import axios from 'axios'

 import { myContext } from '../contexts/globalContext'

// you could model this to get multiple input fields depending how many you want
// later we can use a context in place of this
 type FormInputs = {
  input: string
}

 export default function TabContainer(): JSX.Element{

  const { handleSubmit, register } = useForm<FormInputs>();
  
 const onSubmit = handleSubmit((data) => {  
    alert(JSON.stringify(data.input))
 })

//  const { text } = useContext(myContext);
//  const [text, setText] = useState<string>()

// required : true means this field has to be filled
          return(
            
        <div id="tabContainer">
          Tab Container
          <Tab />
      <div className="navBarForm">
        <form onSubmit={onSubmit}>
            <label>Enter The Venus Fly Trap</label>
          <div>
            <input ref={register({required: true})} id="input" name="input" placeholder="URL here" type="text" />
            {/* {
              ErrorEvent.input && <div className="error">Enter URL</div>
            } */}
          </div>
        <button type="submit">Submit</button>
        </form>
        </div>
        </div>

    ) 
  }
