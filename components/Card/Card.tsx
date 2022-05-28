import React from 'react';
import Image from 'next/image';

import styles from './Card.module.scss';

import { Comment } from '../../utils/interfaces';
import { useIsElementActive } from '../../libs/hooks/UseIsElementActive';
import { useSelector } from 'react-redux';

interface ICard {
  comment: Comment
}

const Card = ({ comment }: ICard) => {
  const userId = useSelector((state: any) => state.user.uid as string);
  const id = useSelector((state: any) => state.user.id as number);
  const isReplyActive = useIsElementActive(comment.id, 'reply');
  const isEditActive = useIsElementActive(comment.id, 'edit');
  const isDeleteActive = useIsElementActive(comment.id, 'delete');

  return (
    <div className={comment.reply_to ? styles.rootReply : styles.root}>
      {comment.reply_to && <div className={styles.line}></div>}
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* user info */}
            <div className={styles.userInfo}>
              <Image src="/avatars/image-amyrobson.png" height={30} width={30} />
              <span className={styles.username}>{comment.user.username}</span>
              {id && id === comment.user.id && <span className={styles.you}>you</span>}
              <span>1 month ago</span>
            </div>

            {/* comment */}
            <p className={styles.comment}>
              {comment.content}
            </p>

            {/* score */}
            <div className={styles.scoreContainer}>
              <div className={styles.icon}>
                <img src="/icon-plus.svg" />
              </div>
              <span className={styles.score}>
                { comment.upvotes - comment.downvotes }
              </span>
              <div className={styles.icon}>
                <img src="/icon-minus.svg" />
              </div>
            </div>

            {/* reply, edit, and delete buttons */}
            <div className={styles.buttons}>
            {
              userId ? (
                  userId !== comment.user.name ? (
                    <div
                      className={styles.replyOrEdit}
                      id={`reply ${comment.id.toString()}`}
                    >
                      <img src={isReplyActive ? "/icon-reply-active.svg" : "/icon-reply.svg"} />
                      <span>Reply</span>
                    </div>
                ) : (
                  <div className={styles.edit}>
                    <div
                      className={styles.delete}
                      id={`delete ${comment.id.toString()}`}
                    >
                      <img src={isDeleteActive ? "/icon-delete-active.svg" : "/icon-delete.svg"} />
                      <span>Delete</span>
                    </div>
                    <div
                      className={styles.replyOrEdit}
                      id={`edit ${comment.id.toString()}`}
                    >
                      <img src={isEditActive ? "/icon-edit-active.svg" : "/icon-edit.svg"} />
                      <span>Edit</span>
                    </div>
                  </div>
                )
              ) : null
            }
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;
