/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import styles from "./Card.module.scss";

import { Comment } from "../../utils/interfaces";
import { useIsElementActive } from "../../libs/hooks/UseIsElementActive";
import { DELETE_COMMENT, UPDATE_COMMENT, VOTE } from "../../libs/gql/mutations";
import { HEADERS, USER_HEADER, VISITOR_HEADER } from "../../utils/constants";
import Modal from "../Modal";
import ReplyCard from "../ReplyCard";

interface ICard {
  comment: Comment;
}

const Card = ({ comment }: ICard) => {
  const [content, setContent] = useState<string>(comment.content);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const userId = useSelector((state: any) => state.user.uid as string);
  const id = useSelector((state: any) => state.user.id as number);
  const isReplyActive = useIsElementActive(comment.id, "reply");
  const isEditActive = useIsElementActive(comment.id, "edit");
  const isDeleteActive = useIsElementActive(comment.id, "delete");

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [vote] = useMutation(VOTE);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleDeleteModal = () => {
    setIsDelete(true);
  };

  const handleCancel = () => {
    setIsDelete(false);
  };

  const handleDelete = () => {
    deleteComment({
      variables: {
        id: comment.id,
      },
      context: {
        headers: {
          ...HEADERS,
          ...USER_HEADER,
          "x-hasura-user-id": id,
        },
      },
    });
    handleCancel();
  };

  const handleUpdate = () => {
    updateComment({
      variables: {
        id: comment.id,
        content,
      },
      context: {
        headers: {
          ...HEADERS,
          ...USER_HEADER,
          "x-hasura-user-id": id,
        },
      },
    });
    setIsEdit(false);
  };

  const handleVote = (type: "plus" | "minus") => {
    if (id !== comment.user.id) {
      vote({
        variables: {
          id: comment.id,
          upvotes: type === "plus" ? comment.upvotes + 1 : comment.upvotes,
          downvotes: type === "minus" ? comment.downvotes + 1 : comment.downvotes,
        },
        context: {
          headers: {
            ...HEADERS,
            ...VISITOR_HEADER,
            "x-hasura-user-id": id,
          },
        },
      });
    }
  };

  const handleMakeReply = () => {
    setIsReply(!isReply);
  };

  const handleFinishReply = () => {
    setIsReply(false);
  };

  return (
    <div className={comment.reply_to_id ? styles.rootReply : styles.root}>
      {isDelete && (
        <Modal
          title="Delete comment"
          message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          cancel="no, cancel"
          confirm="yes, delete"
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}
      {comment.reply_to_id && <div className={styles.line} />}
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
          {isEdit ? (
            <div className={styles.inputContainer}>
              <textarea className={styles.input} name="input" id="input" value={content} onChange={handleChange} />
              <div className={styles.updateContainer}>
                <input type="submit" value="update" onClick={handleUpdate} />
              </div>
            </div>
          ) : (
            <p className={styles.comment}>{comment.content}</p>
          )}

          {/* score */}
          <div className={styles.scoreContainer}>
            <div className={styles.icon} onClick={() => handleVote("plus")}>
              <img src="/icon-plus.svg" />
            </div>
            <span className={styles.score}>{comment.upvotes - comment.downvotes}</span>
            <div className={styles.icon} onClick={() => handleVote("minus")}>
              <img src="/icon-minus.svg" />
            </div>
          </div>

          {/* reply, edit, and delete buttons */}
          <div className={styles.buttons}>
            {userId ? (
              userId !== comment.user.name ? (
                <div className={styles.replyOrEdit} id={`reply ${comment.id.toString()}`} onClick={handleMakeReply}>
                  <img src={isReplyActive ? "/icon-reply-active.svg" : "/icon-reply.svg"} />
                  <span>Reply</span>
                </div>
              ) : (
                <div className={styles.edit}>
                  <div className={styles.delete} id={`delete ${comment.id.toString()}`} onClick={handleDeleteModal}>
                    <img src={isDeleteActive ? "/icon-delete-active.svg" : "/icon-delete.svg"} />
                    <span>Delete</span>
                  </div>
                  <div className={styles.replyOrEdit} id={`edit ${comment.id.toString()}`} onClick={handleEdit}>
                    <img src={isEditActive ? "/icon-edit-active.svg" : "/icon-edit.svg"} />
                    <span>Edit</span>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      {isReply && (
        <>
          {comment.reply_to_id && <div className={styles.line} />}
          <div className={styles.reply}>
            <ReplyCard
              isReply
              handleFinishReply={handleFinishReply}
              parentReplyId={comment.reply_to_id ? comment.reply_to_id : comment.id}
              directReplyUsername={comment.user.username}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
