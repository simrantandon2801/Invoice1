import React from 'react'
import Header from './Header'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Landingpage from './Landingpage'
const Header1 = () => {
  return (
	  <GoogleOAuthProvider clientId="293510883524-mgl1904653q03crgqpliuqerq0u7mqr1.apps.googleusercontent.com" scope='profile email'>
		  <Header />
	  <Landingpage />
	  </GoogleOAuthProvider>
  )
}
export default Header1;