import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { auth } from '../libs/firebase/config';
import { login as login, setId, setUsername } from '../libs/redux/features/user/userSlice';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../libs/gql/queries';
import { HEADERS, USER_HEADER } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [getUser] = useLazyQuery(GET_USER);

  const loginUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const userId = result.user.uid;
        const users = await getUser();
        console.log('user', users);
        const user = await users.data?.users?.find((item: any) => item.name === userId);
        const username = await user?.username;
        const id = await user?.id;
        if (user && username && id) {
          dispatch(login(userId));
          dispatch(setUsername(username));
          dispatch(setId(id));
        }
        if (process.title === 'browser') {
          router.push('/');
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
          router.push('/');
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
