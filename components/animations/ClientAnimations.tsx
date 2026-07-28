'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('@/components/animations/SmoothScroll'), { ssr: false });
const CursorBubble = dynamic(() => import('@/components/ui/CursorBubble'), { ssr: false });
const ScrollAnimations = dynamic(() => import('@/components/animations/ScrollAnimations'), { ssr: false });
const TransitionScribble = dynamic(() => import('@/components/animations/TransitionScribble'), { ssr: false });

export default function ClientAnimations() {
    return (
        <>
            <SmoothScroll />
            <CursorBubble />
            <ScrollAnimations />
            <TransitionScribble />
        </>
    );
}
