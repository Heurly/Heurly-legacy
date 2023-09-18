"use client"
import React, {useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {API_URL} from "@/config/const";
import { useRouter } from 'next/navigation'

const GOOGLE_LOGIN_ENDPOINT = `${API_URL}/login`;

const GoogleLoginButton: React.FunctionComponent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    async function onAuthSuccess(accessToken: string) {
        fetch((GOOGLE_LOGIN_ENDPOINT), {
                method: 'POST',
                body: JSON.stringify(accessToken)
            })
            .then(response => {
                if (response.ok) {
                    router.push('/');
                }
                setLoading(false);
            })
           .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => Promise.resolve(onAuthSuccess(codeResponse.access_token)),
        onError: (error) => console.log("Google OAuth2.0 Error: " + error)
    });

    return (
        <div className="relative">
            {loading ?
                <button className="text-white flex items-center justify-center font-bold">
                    <img
                        src="/images/loader.gif"
                        alt="google loader"
                        width={30}
                        height={30}
                    />
                    <h2 className="pl-4">
                        Se connecter avec votre compte ESIEE
                    </h2>
                </button>
            :
                <button
                    onClick={() => {
                        setLoading(true);
                        login();
                    }}
                    className="text-white flex items-center justify-center font-bold">
                    <img
                        src="/images/mdi_google.svg"
                        alt="connect with Google"
                        width={30}
                        height={30}
                    />
                    <h2 className="pl-4">
                        Se connecter avec votre compte ESIEE
                    </h2>
                </button>
            }
        </div>
    );
}

export default GoogleLoginButton;