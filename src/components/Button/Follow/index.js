import React from "react";
import styles from "./follow.module.css";
import Button from "..";
import useFollow from "../../../hooks/useFollow";

export default function Follow({ contentUser }) {
  const { authUserFollows, contentUserFollows, saveToFollow, removeFollow, isContentUserFollowed } = useFollow(contentUser);

  const ButtonComponent = () => {
    if (isContentUserFollowed) {
      return (
        <Button type="primary" size={12} handleClick={() => removeFollow()}>TAKİPTE</Button>
      );
    } else {
      return (
        <Button type="primary-outline" size={12} handleClick={() => handleFollow()}>TAKİP</Button>
      );
    }
  }

  const handleFollow = async () => {
    await saveToFollow(contentUser);
  }

  return <ButtonComponent />
}
