"use client";

import { useEffect, useState } from "react";

// import SubscribeModal from "@/components/SubscribeModal";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            {/* <SubscribeModal products={products} /> */}
            <UploadModal />

        </>
    );
}

export default ModalProvider;