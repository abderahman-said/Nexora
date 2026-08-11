'use client';

import React from 'react';
import SmoothScroll from '@/components/animations/SmoothScroll';

export default function ClientAnimations() {
    return (
        <>
            <SmoothScroll />
            {/* TEMPORARILY DISABLED - causing scroll lag on inner pages */}
            {/* <CursorBubble /> */}
            {/* <TransitionScribble /> */}
        </>
    );
}