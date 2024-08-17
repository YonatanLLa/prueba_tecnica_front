import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useFetchUser, useFetchUserById } from "../hooks/useFetchUser";
import { User, UserById } from "../interfaces/user";

interface UserContextType {
  user: User[] | null;
  loading: boolean;
  error: string | null;
  fetchUserById: (id: number | null) => void;
  userById: UserById | null;
  updateUser: (updatedUser: User) => void;
  actualizaUser: (users: User[]) => void;

  deleteUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<{
    users: User[] | null;
    userById: UserById | null;
  }>({
    users: null,
    userById: null,
  });
  const [id, fetchUserById] = useState<number | null>(null);
  const { user: fetchedUser, loading, error } = useFetchUser();
  const { userById: fetchedUserById } = useFetchUserById(id ?? 0);

  useEffect(() => {
    if (fetchedUser) {
      setUserState((prev) => ({ ...prev, users: fetchedUser }));
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (fetchedUserById) {
      setUserState((prev) => ({ ...prev, userById: fetchedUserById }));
    }
  }, [fetchedUserById]);

  const updateUser = (updatedUser: User) => {
    setUserState((prevState) => {
      const updatedUsers = prevState.users
        ? prevState.users.map((u) =>
            u.id === updatedUser.id ? updatedUser : u
          )
        : null;

      return {
        users: updatedUsers,
        userById:
          prevState.userById?.id === updatedUser.id
            ? updatedUser
            : prevState.userById,
      };
    });
  };

  const actualizaUser = (users: User[]) => {
    setUserState((prevState) => ({
      ...prevState,
      users,
    }));
  };

  const deleteUser = (id: number) => {
    setUserState((prevState) => ({
      users: prevState.users
        ? prevState.users.filter((user) => user.id !== id)
        : null,
      userById: prevState.userById?.id === id ? null : prevState.userById,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user: userState.users,
        loading,
        error,
        fetchUserById,
        userById: userState.userById,
        updateUser,
        actualizaUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
