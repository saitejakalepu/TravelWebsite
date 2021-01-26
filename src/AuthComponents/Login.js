// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
// import { Link, useHistory } from "react-router-dom"
// import {signInWithGoogle} from '../firebase'
// import {signInWithFacebook} from '../firebase'
// import '../App.css'
// import Social from './Social'


// export default function Login() {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const { login } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const history = useHistory()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   try {
  //     setError("")
  //     setLoading(true)
  //     await login(emailRef.current.value, passwordRef.current.value)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to log in")
  //   }

  //   setLoading(false)
  // }


//   async function google_login(e) {
//     e.preventDefault()
    

//     try {
//       setError("")
//       setLoading(true)
//       await signInWithGoogle()
//       history.push("/")
//     } catch {
//       setError("Failed to log in")
//     }

//     setLoading(false)
//   }

//   async function facebook_login(e) {
//     e.preventDefault()
    

//     try {
//       setError("")
//       setLoading(true)
//       await signInWithFacebook()
//       history.push("/")
//     } catch {
//       setError("Failed to log in")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Log In</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Log In
//             </Button>
//           </Form>
//           {/* <ul></ul>
//           <Button  className="w-100" type="submit">
//               Log In with Google
//           </Button>
//           <ul></ul>
//           <Button onClick={ handleClickFB} className="w-100" type="submit">
//          log in with FB
             
//           </Button> */}
//           <ul></ul>
//           {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
//           {/* <button class="loginBtn loginBtn--facebook" onClick={ facebook_login}>
//           Log in with Facebook
//           </button>
//           <ul></ul>

//           <button class="loginBtn loginBtn--google" onClick={ google_login}>
//           Log in with Google 
//           </button> */}
//            <Social/>
          // <div className="w-100 text-center mt-3">
          //   <Link to="/forgot-password">Forgot Password?</Link>
          // </div>
          // <div className="w-100 text-center mt-2">
          // Need an account? <Link to="/signup">Sign Up</Link>
          // </div>
//         </Card.Body>
//       </Card>
     
//     </>
//   )
// }



import React, { Component } from 'react';
import { Link } from "react-router-dom"
import firebase from '../firebase';
import * as firebaseui from "firebaseui";
import { Card } from "react-bootstrap"


class login extends Component {
  componentDidMount() {
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: "/", //This URL is used to return to that page when we got success response for phone authentication.
      // signInOptions: 
      // [firebase.auth.EmailAuthProvider.PROVIDER_ID,firebase.auth.PhoneAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,] 
      signInOptions: [
        

        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // The default selected country.
          defaultCountry: 'IN'
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID, 
        }
      ]
    };
    if(firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }

  
  render() {
    return (
        <>
        <Card>
          <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <div id="firebaseui-auth-container"></div>
          <ul></ul>
          <ul></ul>
          <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          </Card.Body>
        </Card>
        </>
    )
  }
}

export default login;