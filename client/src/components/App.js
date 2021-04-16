import React, { Suspense,lazy} from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
//import LandingPage from "./views/LandingPage/LandingPage.js";
//import LoginPage from "./views/LoginPage/LoginPage.js";
//import RegisterPage from "./views/RegisterPage/RegisterPage.js";
//import NavBar from "./views/NavBar/NavBar";
import Navbar from './Navbar/Navbar'
import Footer from "./views/Footer/Footer"

//import UploadContainer from '../components/views/UploadPage/UploadContainer';
//import DetailPostPage from '../components/views/DetailPostPage/DetailPostPage';
//import CartPage from '../components/views/CartPage/CartPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const LoginPage = lazy (()=> import('./views/LoginPage/LoginPage'));
const RegisterPage = lazy (()=> import('./views/RegisterPage/RegisterPage'));
const LandingPage = lazy (()=> import('./views/LandingPage/LandingPage'));
const UploadContainer = lazy (()=> import('./views/UploadPage/UploadContainer'));
const DetailPostPage = lazy (()=> import('./views/DetailPostPage/DetailPostPage'));
const CartPage = lazy (()=> import('./views/CartPage/CartPage'));

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadContainer, true)} />
          <Route exact path="/post/:postId" component={Auth(DetailPostPage,null)} />
          <Route exact path="/cart" component={Auth(CartPage,true)} />
          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
