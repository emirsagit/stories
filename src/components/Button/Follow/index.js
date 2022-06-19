import React from "react";
import styles from "./follow.module.css";
import Button from "..";
import useFollow from "../../../hooks/useFollow";

export default function Follow({ contentUser }) {
  const { handleFollow, isContentUserFollowed } = useFollow();

  const buttonType = isContentUserFollowed(contentUser.uid) ? "primary" : "primary-outline";
  const buttonName = isContentUserFollowed(contentUser.uid) ? "TAKİPTE" : "TAKİP ET";

  return <Button type={buttonType} size={12} handleClick={() => handleFollow(contentUser)}>{buttonName}</Button>;
}
