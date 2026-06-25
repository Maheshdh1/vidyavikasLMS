"use client";

import {
createContext,
useContext,
useEffect,
useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext =
createContext();

export function AuthProvider({
children,
}) {
const [user, setUser] =
useState(null);

const [profile, setProfile] =
useState(null);

const [loading, setLoading] =
useState(true);

async function loadProfile(
authUser
) {
if (!authUser) {
setProfile(null);
return;
}

const { data } =
  await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single();

setProfile(data);

}

useEffect(() => {
async function init() {
const {
data: { user },
} =
await supabase.auth.getUser();

  setUser(user);

  await loadProfile(user);

  setLoading(false);
}

init();

const {
  data: { subscription },
} =
  supabase.auth.onAuthStateChange(
    async (
      _event,
      session
    ) => {
      const currentUser =
        session?.user ?? null;

      setUser(currentUser);

      await loadProfile(
        currentUser
      );
    }
  );

return () =>
  subscription.unsubscribe();

}, []);

return (
<AuthContext.Provider
value={{
user,
profile,
loading,
}}
>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
return useContext(
AuthContext
);
}
