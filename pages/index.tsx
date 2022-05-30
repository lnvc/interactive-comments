import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { gql, useSubscription } from '@apollo/client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

import styles from '../styles/Home.module.scss';

import { logout } from '../libs/redux/features/user/userSlice';
import { auth } from '../libs/firebase/config';
import { GET_COMMENTS } from '../libs/gql/queries';
import { getCommentsAndReplies, gqlFetcher } from '../utils/functions';
import { client } from '../libs/gql/client';
import { useDispatch } from 'react-redux';
import Card from '../components/Card';
import Layout from '../components/Layout';
import ReplyCard from '../components/ReplyCard';
import { useRouter } from 'next/router';
import { COMMENTS_SUBSCRIPTION } from '../libs/gql/subscriptions';
import { HEADERS } from '../utils/constants';
import { Comment } from '../utils/interfaces';

export const getStaticProps = async () => {
  const { error: errorComments, data: dataComments } = await client.query({
    query: gql`${GET_COMMENTS}`,
    fetchPolicy: 'network-only',
  });

  const comments = await getCommentsAndReplies(dataComments);
  // console.log('sss', comments);

  if (errorComments) {
    return {
      props: {
        comments: null,
      },
    };
  }

  return {
    props: {
      comments,
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
  const loggedInUser = useSelector((state: any) => state.user.uid);
  const username = useSelector((state: any) => state.user.username);
  const dispatch = useDispatch();
  const router = useRouter();

  // swr
  // const { data, error } = useSWR(query, getData, {
  //   errorRetryCount: 2,
  //   refreshInterval: 10000,
  // });

  // subscription
  const { data, loading, error } = useSubscription(COMMENTS_SUBSCRIPTION);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        router.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  // swr or subscription
  useEffect(() => {
    if (data) {
      const fetchComments = async () => {
        const commentsAndReplies = await getCommentsAndReplies(data);
        setCommentsState([...commentsAndReplies]);
      };
      fetchComments();
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
        loggedInUser ? (
          <>
            <span>Hi <Link href="/profile"><a>{username}</a></Link></span>
            <button onClick={logoutUser}>Logout</button>
          </>
        )
        : <Link href='/login'><a>Login</a></Link>
      }
      <main className={styles.main}>
        {
          commentsState && commentsState.map((comment: Comment) => (
            <Card key={comment.id} comment={comment} />
          ))
        }
        <ReplyCard />
      </main>
    </Layout>
  );
};

export default Home;
