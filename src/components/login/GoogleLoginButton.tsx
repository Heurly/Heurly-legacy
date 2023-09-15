import React, {useEffect, useState} from "react";
import Button from "@/components/Button";
import {useGoogleLogin} from "@react-oauth/google";
import {GoogleProfile} from "@/utils/Google";
import {API_URL, ROOT_URL} from "@/config/const";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";

const GOOGLE_USERINFO_ENDPOINT = (access_token: string) => `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
const GOOGLE_LOGIN_ENDPOINT = `${API_URL}/login/google`;

const GoogleLoginButton: React.FunctionComponent = () => {
    const [profile, setProfile] = useState<GoogleProfile | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    async function onAuthSuccess(accessToken: string) {
        setLoading(true);
        return await fetch(GOOGLE_USERINFO_ENDPOINT(accessToken), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
        })
            .then(res => res.json()
                .then(async (data: GoogleProfile) => {
                    const response = await fetch((GOOGLE_LOGIN_ENDPOINT), {
                        method: 'POST',
                        body: JSON.stringify(data)
                    });
                    if (response.ok) {
                        setProfile(await response.json());
                    }
                    setLoading(false);
                }))
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => Promise.resolve(onAuthSuccess(codeResponse.access_token)),
        onError: (error) => console.log("Google OAuth2.0 Error: " + error)
    });

    useEffect(() => {
        if (profile != undefined) {
            redirect(`${ROOT_URL}/edt`, RedirectType.push);
        }
    }, [profile]);

    return (
        <div className="relative">
            {loading && <div className="absolute left-1/2 top-1/2 animate-pulse">Loading...</div>}
            <Button onClick={login} className="text-white flex items-center justify-center font-bold">
                <img
                    src="/images/mdi_google.svg"
                    alt="connect with Google"
                    width={30}
                    height={30}
                />
                <h2 className="pl-4">
                    Se connecter avec votre compte ESIEE
                </h2>
            </Button>
        </div>
    );
}

export default GoogleLoginButton;