import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    // 콜백함수에서 넘겨받은 리턴값이 실행함수 인자값과 동일한 경우 생략이 가능하다
    // login().then((item) => setUser(item)) => login().then(setUser)
    onUserStateChange((user) => {
      console.log("user2", user);
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
