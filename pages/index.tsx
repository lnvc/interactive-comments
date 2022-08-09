/* eslint-disable jsx-a11y/anchor-is-valid */
// import useSWR from 'swr';
import { gql, useSubscription } from "@apollo/client";
import { signOut } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import Layout from "../components/Layout";
import ReplyCard from "../components/ReplyCard";
import { auth } from "../libs/firebase/config";
import { client } from "../libs/gql/client";
import { GET_COMMENTS } from "../libs/gql/queries";
import { COMMENTS_SUBSCRIPTION } from "../libs/gql/subscriptions";
import { logout } from "../libs/redux/features/user/userSlice";
import styles from "../styles/Home.module.scss";
import { getCommentsAndReplies } from "../utils/functions";
// import { HEADERS } from '../utils/constants';
import { Comment } from "../utils/interfaces";

export const getStaticProps = async () => {
  const { error: errorComments, data: dataComments } = await client.query({
    query: gql`
      ${GET_COMMENTS}
    `,
    fetchPolicy: "network-only",
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

// const query = {
//   query: GET_COMMENTS,
// } as any;

// const getData = async (...args: any) => await gqlFetcher(query);

interface IHome {
  comments: any;
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
  const { data } = useSubscription(COMMENTS_SUBSCRIPTION);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        router.push("/");
      })
      .catch((err) => {
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

  // difference between vue and react state
  // const [reactState, setReactState] = useState<boolean>(true);
  // useEffect(() => {
  //   console.log('before calling setReactState: ', reactState);
  //   setReactState(false);
  //   console.log('after calling setReactState: ', reactState);
  // }, []);

  // useEffect with and without dependencies
  // useEffect(() => console.log('without dependency array'));
  // useEffect(() => console.log('with dependency array'), []);

  // circular dependencies
  // const [infinity, setInfinity] = useState<number>(0);
  // useEffect(() => {
  //   setInfinity(infinity + 1);
  //   console.log('infinity', infinity);
  // }, [infinity]);

  return (
    <Layout>
      <Head>
        <title>Interactive Comments</title>
        <meta name="description" content="NextJS app by Laira Cham" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      {loggedInUser ? (
        <>
          <span>
            Hi{" "}
            <Link href="/profile">
              <a>{username}</a>
            </Link>
          </span>
          <button type="button" onClick={logoutUser}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
      <main className={styles.main}>
        {commentsState?.map((comment: Comment) => (
          <Card key={comment.id} comment={comment} />
        ))}
        <ReplyCard />
      </main>
    </Layout>
  );
};

export default Home;
