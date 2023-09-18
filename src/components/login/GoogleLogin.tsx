"use client"
import React from "react";
import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLogin: React.FunctionComponent = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? ''}>
                <GoogleLoginButton></GoogleLoginButton>
            </GoogleOAuthProvider>
        </>
    );
}

export default GoogleLogin;