import React, {useState} from "react";
import Button from "@/components/Button";
import {useGoogleLogin} from "@react-oauth/google";
import {GoogleProfile} from "@/utils/Google";

const GOOGLE_USERINFO_ENDPOINT = (access_token: string) => `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;

async function onAuthSuccess(accessToken: string) {
    return await fetch(GOOGLE_USERINFO_ENDPOINT(accessToken), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
        },
    })
        .then(res => res.json()
            .then((data: GoogleProfile) => {
                console.log(data);
            }))
        .catch((err) => console.log(err));
}

const GoogleLoginButton: React.FunctionComponent = () => {
    const [profile, setProfile] = useState<GoogleProfile | undefined>(undefined);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => Promise.resolve(onAuthSuccess(codeResponse.access_token)),
        onError: (error) => console.log("Google OAuth2.0 Error: " + error)
    });

    return (
        <>
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
        </>
    );
}

export default GoogleLoginButton;