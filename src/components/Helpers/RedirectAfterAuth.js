import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function RedirectAfterAuth({ user }) {
  console.log(user);  
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  return <>fadfads</>;
}
