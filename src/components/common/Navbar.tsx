"use client"
import Logo from "@/components/logo";
import SearchBar from "@/components/search-bar";
import Link from "next/link";
import Button from "@/components/Button";
import React, {useMemo} from "react";
import {API_URL} from "@/config/const";

const Navbar: React.FunctionComponent = () => {
    const logout = useMemo(
        async () => await fetch(`${API_URL}/logout`)
            .then(res => Promise.resolve(res)), []);

    return (<>
        <nav className="flex md:flex-col p-5 md:h-full md:w-1/5 w-full m-0 bg-neutral-950 border-r border-neutral-600 text-white fixed top-0 gap-y-5">
            <Logo className="text-3xl flex items-center justify-center"/>
            <SearchBar placeholder="Rechercher une ressource" />
            <Link href="/hub">
                <Button className="w-full">Hub</Button>
            </Link>
            <Link href="/edt">
                <Button className="w-full">Emploi du temps</Button>
            </Link>
            <Button onClick={() => logout} className="w-full">Déconnexion</Button>
        </nav>
    </>);
}

export default Navbar;