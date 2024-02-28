"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import CreatePlayListModal from "@/components/CreatePlaylistModal";

const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal /> 
            <CreatePlayListModal />
        </>
    );
}

export default ModalProvider;