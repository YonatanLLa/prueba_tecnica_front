import { useState, useEffect } from "react";
import { getUserData, getByIdUserData } from "../services/userService";
import { User, UserById } from "../interfaces/user";

export const useFetchUser = () => {
  const [user, setUser] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, loading, error };
};

export const useFetchUserById = (id: number) => {
  console.log(id, "id_hook");
  const [userById, setUserById] = useState<UserById | null>(null);
  const [loadingId, setLoadingId] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id, "id_hook.................");
        const data = await getByIdUserData(id);

        setUserById(data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setLoadingId(false);
      }
    };

    fetchData();
  }, [id]);

  return { userById, loadingId };
};
