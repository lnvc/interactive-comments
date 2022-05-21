import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import styles from '../styles/Home.module.css';

import { logout } from '../libs/redux/features/user/userSlice';
import { auth } from '../libs/firebase/config';
import { GET_COMMENTS } from '../libs/gql/queries';
import { gqlFetcher } from '../utils/functions';
import { client } from '../libs/gql/client';
import { useDispatch } from 'react-redux';

export const getStaticProps = async () => {
  const { error, data } = await client.query({
    query: gql`${GET_COMMENTS}`,
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
    revalidate: 30,
  };
};

const query = {
  query: GET_COMMENTS,
} as any;

const getData = async (...args: any) => {
  return await gqlFetcher(query);
};

interface IHome {
  comments: any
}

const Home = ({ comments }: IHome) => {
  const [commentsState, setCommentsState] = useState<any[] | null>(comments);
  const isLoggedIn = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  // const { data, error } = useSWR(query, getData, {
  //   errorRetryCount: 2
  // });

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        window.location.pathname = '/';
      })
      .catch(err => {
        console.error(err);
      });
  };

  // on-demand revalidation
  const revalidate = async () => await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
  useEffect(() => {
    // call this from cf for security
    // revalidate();

    console.log('isLoggedIn', isLoggedIn);
  }, []);

  // swr
  // useEffect(() => {
  //   if (data) {
  //     setCommentsState(data.comments);
  //   }
  // }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Interactive Comments</title>
        <meta name="description" content="NextJS app by Laira Cham" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        isLoggedIn
        ? <button onClick={logoutUser}>Logout</button>
        : <Link href='/login'><a>Login</a></Link>
      }
      <main className={styles.main}>
        {
          commentsState && commentsState.map((comment: any) => (
            <div key={comment.id}>{ comment.content }</div>
          ))
        }
      </main>
    </div>
  );
};

export default Home;
