import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// import styles from '../styles/Profile.module.scss';

import { GET_COMMENTS } from '../libs/gql/queries';
import { UPDATE_USER } from '../libs/gql/mutations';
import { gqlFetcher } from '../utils/functions';
import { client } from '../libs/gql/client';
import { HEADERS, USER_HEADER } from '../utils/constants';
import { setUsername as setUsernameRedux } from '../libs/redux/features/user/userSlice';


export const getStaticProps = async () => {
  const { error, data } = await client.query({
    query: gql`${GET_COMMENTS}`,
    fetchPolicy: 'network-only',
  });

  if (error) {
    return {
      props: {
        comments: null,
      },
    };
  }

  return {
    props: {
      comments: data.comments,
    },
  };
};

const query = {
  query: GET_COMMENTS,
} as any;

const getData = async (...args: any) => {
  return await gqlFetcher(query);
};

interface IProfile {
  comments: any
}

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: any) => state.user.uid);
  const id = useSelector((state: any) => state.user.id);
  const [updateUsername, { data, loading, error }] = useMutation(UPDATE_USER);


  const handleChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (username.length && loggedInUser) {
      updateUsername({
        variables: {
          username
        },
        context: {
          headers: {
            ...HEADERS,
            ...USER_HEADER,
            "x-hasura-user-id": id.toString(),
          },
        },
      });
    }
  };

  useEffect(() => {
    if (error) {
      setMessage('error. please try again.');
    }
    if (loading) {
      setMessage('loading...');
    }
    if (data) {
      dispatch(setUsernameRedux(data?.update_users?.returning[0]?.username));
      router.push('/');
    }
  }, [data, loading, error]);

  return (
    <div>
      {message}
      <label htmlFor="username">change username</label>
      <input name="username" type="text" onChange={handleChange} />
      <input onClick={handleSubmit} type="submit" value="submit" />
    </div>
  );
};

export default Profile;
