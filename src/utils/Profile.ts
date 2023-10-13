import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import {API_URL} from "@/config/const";

export interface Profile {
    modules: ModuleChoice[];
}

export async function getProfile(email: string) {
    const payload = {email: email};

    const data = await fetch(API_URL + "/profile",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    return await data.json() as ModuleChoice[];
}