// /**
//  * @name TabContainer
//  * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
//  */

 import React, { useContext, useState, useEffect, ContextType } from 'react';
 import { Tab } from '../components/Tab'
 import { appendErrors, useForm } from "react-hook-form"
 import { Router, Route, Link, Switch } from 'react-router-dom';
//  import Typography from '@material-ui/core/Typography';
//  import Button from '@material-ui/core/Button';
// //  import axios from 'axios'
 import { myContext } from '../contexts/globalContext'

// you could model this to get multiple input fields depending how many form fields you want
// later we can use a context in place of this

 export default function TabContainer(): JSX.Element{

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
	// let test = urls
	// useEffect(() => {
	// 	setUrls(['mike', 'evan'])
	// 	setWill('will')
	// }, []);

	const handlePress = () => {
		setUrls(['new', 'state'])

	}

// // required : true means this field has to be filled
  return(

    <div id="tabContainer">
      Add Service Here
      {/* <Tab /> */}
      <div className="navBarForm">
        <form onSubmit={onSubmit}>
               <input ref={register({required: true})} id="input" name="input" placeholder="URL here" type="text" />
              <h1>
                {/* {urls}           */}
              </h1>
            
          <button type="submit">Submit</button>
        </form>
      </div>

      </div>
  ) 
}

// import { UrlContext } from '../contexts/globalContext'

// const AddUrl: React.FC = () => {
//   const { saveUrl } = React.useContext(UrlContext) as ContextType;
//   const [formData, setFormData] = React.useState<IUrl | {}>();

//   const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.id]: e.currentTarget.value
//     });
//   };

//   const handleSaveUrl = (e: React.FormEvent, formData: IUrl | any) => {
//     e.preventDefault();
//     saveUrl(formData);
//   };

//   return (
//     <div id="tabContainer">
//       Tab Container
//       <Tab />
//       <div className="navBarForm">
//         <form onSubmit={onSubmit}>
//           <label>Enter The Venus Fly Trap</label>
//             <div>
//               <input ref={register({required: true})} id="input" name="input" placeholder="URL here" type="text" />
//             </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       <button disabled={formData === undefined ? true : false}>Add Todo</button>
//     </form>
//     </div>
//   );
// };

