"use client"
import Image from "next/image";
import Button from "@/components/Button";
import React from "react";
import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";

export default function GoogleLoginProvider(): React.ReactElement {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => console.log("Google OAuth2.0 Success"),
        onError: (error) => console.log(error)
    });

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID ?? ""} >
            <Button onClick={() => login} className="text-white flex items-center justify-center font-bold">
                <a>
                    <Image
                        src="/images/mdi_google.svg"
                        alt="connect with Google"
                        width={30}
                        height={30}
                    />
                    Se connecter avec votre compte ESIEE
                </a>
            </Button>
        </GoogleOAuthProvider>
    )
}