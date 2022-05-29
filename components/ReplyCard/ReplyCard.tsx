import React, { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@apollo/client';

import styles from './ReplyCard.module.scss';

import { INSERT_COMMENT, INSERT_REPLY } from '../../libs/gql/mutations';
import { HEADERS, USER_HEADER } from '../../utils/constants';
import { useSelector } from 'react-redux';

interface IReplyCard {
  isReply?: boolean,
  handleFinishReply?: () => void,
  parentReplyId?: number,
  directReplyUsername?: string,
}

const ReplyCard = ({
  isReply,
  handleFinishReply,
  parentReplyId,
  directReplyUsername,
}: IReplyCard) => {
  const [content, setContent] = useState<string>(isReply && directReplyUsername ? `@${directReplyUsername} ` : '');
  const [insertComment, { loading, error }] = useMutation(INSERT_COMMENT);
  const [insertReply] = useMutation(INSERT_REPLY);
  const id = useSelector((state: any) => state.user.id);

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setContent('');
    insertComment({
      variables: {
        content
      },
      context: {
        headers: {
          ...HEADERS,
          ...USER_HEADER,
          "x-hasura-user-id": id.toString(),
        },
      },
    })
  };

  const handleReply = () => {
    if (isReply && handleFinishReply && parentReplyId && directReplyUsername) {
      insertReply({
        variables: {
          reply_to_id: parentReplyId,
          content,
        },
        context: {
          headers: {
            ...HEADERS,
            ...USER_HEADER,
            "x-hasura-user-id": id.toString(),
          },
        },
      });
      handleFinishReply();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.image}>
          <Image src="/avatars/image-amyrobson.png" height={30} width={30} />
        </div>
        <textarea className={styles.text} value={content} onChange={handleChange} placeholder="Add a comment..." />
        <div className={styles.submit}>
          <input type="submit" onClick={isReply ? handleReply : handleSubmit} value={isReply ? "reply" : "send"} />
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
