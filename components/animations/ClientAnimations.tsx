'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('@/components/animations/SmoothScroll'), { 
    ssr: false,
    loading: () => null
});
const CursorBubble = dynamic(() => import('@/components/ui/CursorBubble'), { 
    ssr: false,
    loading: () => null
});
const ScrollAnimations = dynamic(() => import('@/components/animations/ScrollAnimations'), { 
    ssr: false,
    loading: () => null
});
const TransitionScribble = dynamic(() => import('@/components/animations/TransitionScribble'), { 
    ssr: false,
    loading: () => null
});

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