import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignOut from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./assets/components/Header"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignOut/>}/>
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}
