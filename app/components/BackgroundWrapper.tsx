"use client";

import dynamic from "next/dynamic";

const Global3DBackground = dynamic(() => import("./Global3DBackground"), {
    ssr: false
});

export default function BackgroundWrapper() {
    return <Global3DBackground />;
}
