import React, {Suspense,lazy} from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import LoadingSpinner from './components/Utill/LoadingSpinner';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

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
