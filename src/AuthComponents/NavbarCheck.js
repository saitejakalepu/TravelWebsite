import React from "react"
import LogoutBar from "../components/LogoutBar"
import Navbar from '../components/Navbar'
import { useAuth } from "../contexts/AuthContext"

export default function NavbarCheck()
 {
  const { currentUser } = useAuth()

  return currentUser ? <LogoutBar/> : <Navbar/>
 
}
