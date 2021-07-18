import React, { Suspense,lazy} from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
//import LandingPage from "./views/LandingPage/LandingPage.js";
//import LoginPage from "./views/LoginPage/LoginPage.js";
//import RegisterPage from "./views/RegisterPage/RegisterPage.js";
//import NavBar from "./views/NavBar/NavBar";
import Navbar from './components/views/Navbar/Navbar'
import Footer from "./components/views/Footer/Footer"
import LoadingSpinner from './components/Utill/LoadingSpinner';
import SideRecommend from './components/SideRecommend/SideRecommend';
// import LandingPage from './_pages/LandingPage';
// import DetailPostPage from './_pages/DetailPostPage';
// import LoginPage from './_pages/LoginPage';
// import RegisterPage from './_pages/RegisterPage';
//import LandingContainer from './views/LandingPage/LandingContainer';

//import UploadContainer from '../components/views/UploadPage/UploadContainer';
//import DetailPostPage from '../components/views/DetailPostPage/DetailPostPage';
//import CartPage from '../components/views/CartPage/CartPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

// const LoginPage = lazy (()=> import('./views/LoginPage/LoginPage'));
// const RegisterPage = lazy (()=> import('./views/RegisterPage/RegisterPage'));
// const LandingPage = lazy (()=> import('./views/LandingPage/LandingPage'));
// const UploadContainer = lazy (()=> import('./views/UploadPage/UploadContainer'));
// const DetailPostPage = lazy (()=> import('./views/DetailPostPage/DetailPostPage'));
// const CartPage = lazy (()=> import('./views/CartPage/CartPage'));
// const TestPage = lazy (()=>import('./views/TestPage/Container'));
// const LandingContainer = lazy(()=>import('./views/LandingPage/LandingContainer'));

const LoginPage = lazy (()=> import('./_pages/LoginPage'));
const RegisterPage = lazy (()=> import('./_pages/RegisterPage'));
const LandingPage = lazy (()=> import('./_pages/LandingPage'));
const DetailPostPage = lazy (()=> import('./_pages/DetailPostPage'));
const CartPage = lazy(()=>import('./_pages/CartPage'));
function App() {

  const loadingStyle = {
    display:'flex',
    width:'100%',
    height:'100vh',
    justifyContent:'center',
    alignItems:'center'
}
  return (
    <>
    <Navbar />
    <Suspense fallback={(<LoadingSpinner {...loadingStyle}/>)}>
      
      <div style={{ paddingTop: '0px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch> 
         {/* <Route exact path="/" component={Auth(LandingPage, null)} />
         <Route  exact path="/posts/:id" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadContainer, true)} />
          <Route  path="/post/:postId" component={Auth(DetailPostPage,null)} />
          <Route exact path="/cart" component={Auth(CartPage,true)} />
          <Route exact path="/test" component ={Auth(TestPage,null)} />
          <Route exact path="/test1" component ={Auth(LandingContainer,null)} /> */}
          <Route exact path='/side' component={SideRecommend} />
          <Route exact path="/" component={Auth(LandingPage,null)} />
          <Route exact path="/category/:id" component={Auth(LandingPage,null)}/>
          <Route path="/detail/:postId" component={Auth(DetailPostPage,null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/cart" component={Auth(CartPage,true)} />
        </Switch>
      </div>
      
    </Suspense>
    <Footer />
    </>
  );
}

export default App;
