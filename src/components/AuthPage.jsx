import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
    return(
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md p-6 bg-card rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-center"> Sign in / Sign up</h2>
                <Auth
                  supabaseClient={supabase}
                  appearance={{theme: ThemeSupa}}
                  providers={["google"]} 
                  socialLayout="horizontal"
                />
            </div>
        </div>
    );
}