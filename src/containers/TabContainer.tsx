/**
 * @name TabContainer
 * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
 */

 import React, { useContext, useState } from 'react';
 import { Tab } from '../components/Tab'
 import { appendErrors, useForm } from "react-hook-form"
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
//  import axios from 'axios'
 import { myContext } from '../contexts/globalContext'

// you could model this to get multiple input fields depending how many form fields you want
// later we can use a context in place of this
 type FormInputs = {
  input: string
}

 export default function TabContainer(): JSX.Element{
  const { handleSubmit, register } = useForm<FormInputs>();
  // destructure urls out of our global context
  const { urls } = useContext(myContext);

  const [text, setText] = useState<string>()

  const onSubmit = handleSubmit((data) => {  
   // console.log(data.input)
    // setText(JSON.stringify(data.input))
// push the user input to our urls array
    urls.push(data.input)
  })

  // console.log(urls)
  
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
              <h1>
                {urls}            
              </h1>
            </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) 
}
