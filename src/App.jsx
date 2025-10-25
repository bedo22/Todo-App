import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import TodoApp from "./components/TodoApp";
import AuthPage from "./components/AuthPage";

export default function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // check current session
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        //Listen for auth changes (login/logout)
        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted"){
            Notification.requestPermission().then((permission)=> {
                if (permission === "granted"){
                    console.log("Notification permission granted.");
                } else {
                    console.log("Notfication permission denied.");
                }
            });
        }
    }, []);
    return session ? <TodoApp session={session} /> : <AuthPage />;
}