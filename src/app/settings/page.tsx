import React from "react";
import {GoogleProfile} from "@/utils/Google";

interface Props {
    profile: GoogleProfile | undefined;
}

const SettingsPage: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <img src={props.profile?.picture} alt="profile picture"></img>
            <div>{props.profile?.name}</div>
        </>
    );
}

export default SettingsPage;