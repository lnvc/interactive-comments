import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';

import { auth } from '../libs/firebase/config';
import { login as login } from '../libs/redux/features/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const loginUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(login(token));
        if (process.title === 'browser') {
          window.location.pathname = '/';
        }
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        if (process.title === 'browser') {
          window.location.pathname = '/';
        }
      });
  };

  return (
    <div>
      Login
      <button onClick={loginUser}>Google Login</button>
    </div>
  );
};

export default Login;
