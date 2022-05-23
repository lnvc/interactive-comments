import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import styles from '../styles/Home.module.scss';

import { logout } from '../libs/redux/features/user/userSlice';
import { auth } from '../libs/firebase/config';
import { GET_COMMENTS } from '../libs/gql/queries';
import { gqlFetcher } from '../utils/functions';
import { client } from '../libs/gql/client';
import { useDispatch } from 'react-redux';
import Card from '../components/Card';
import Layout from '../components/Layout';

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

interface IHome {
  comments: any
}

const Home = ({ comments }: IHome) => {
  const [commentsState, setCommentsState] = useState<any[] | null>(comments);
  const isLoggedIn = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const { data, error } = useSWR(query, getData, {
    errorRetryCount: 2
  });

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

  // useEffect(() => {
  //   if (comments) {
  //     setCommentsState([...comments]);
  //   }
  // }, [comments]);

  // swr
  useEffect(() => {
    if (data) {
      setCommentsState([...data.comments]);
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>Interactive Comments</title>
        <meta name="description" content="NextJS app by Laira Cham" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      {
        isLoggedIn
        ? <button onClick={logoutUser}>Logout</button>
        : <Link href='/login'><a>Login</a></Link>
      }
      <main className={styles.main}>
        {
          commentsState && commentsState.map((comment: any) => (
            <Card key={comment.id} comment={comment} />
          ))
        }
      </main>
    </Layout>
  );
};

export default Home;
