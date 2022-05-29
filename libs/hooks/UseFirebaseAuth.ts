import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onAuth = async (user: any) => {
    if (!user) {
      setUser(null);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const userId = user.uid;
      setUser(userId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuth);
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
  };
};
