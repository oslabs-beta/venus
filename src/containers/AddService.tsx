// /**
//  * @name TabContainer
//  * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
//  */

import React, { useContext, useState, useEffect, ContextType } from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { myContext } from '../contexts/globalContext';
import { Button , Input } from 'antd';
const { Search } = Input
// you could model this to get multiple input fields depending how many form fields you want
// later we can use a context in place of this

function AddService(): JSX.Element{

const { handleSubmit, register } = useForm();
  // destructure urls out of our global context
 
  // const [value, setValue] = useState<string>()

const onSubmit = handleSubmit((data) => {  
    // console.log(data.input, "value", value, 'urls', urls)
    setUrls([...urls, data.input])
// push the user input to our urls array
  })
  const [will, setWill] = useState('')
	
	const { urls, setUrls } = useContext(myContext);
	

	const handlePress = () => {
		setUrls(['new', 'state'])
	}
  const large: any = "medium"; 
  return(
    <div id="tabContainer">
      <div className="navBarForm">
      <Search placeholder="Add API Endpoint" allowClear enterButton="Submit" size="large" />
      </div>
    </div>
  ) 
}

export { AddService };