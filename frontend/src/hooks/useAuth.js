import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }

    setLoading(false);
  }, [user]);

  return { loggedIn, loading };
};
