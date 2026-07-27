import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

function LinkedInIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
    );
}

function XTwitterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function FacebookIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
        </svg>
    );
}

function GitHubIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
    );
}

export function FooterSocials() {
    return (
        <div className="flex items-center gap-2.5 pt-2 text-slate-300">
            <Link 
                href="https://linkedin.com" 
                target="_blank" 
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
                <LinkedInIcon className="h-4 w-4" />
            </Link>
            <Link 
                href="https://twitter.com" 
                target="_blank" 
                aria-label="X"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
                <XTwitterIcon className="h-4 w-4" />
            </Link>
            <Link 
                href="https://facebook.com" 
                target="_blank" 
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
                <FacebookIcon className="h-4 w-4" />
            </Link>
            <Link 
                href="https://github.com" 
                target="_blank" 
                aria-label="GitHub"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
                <GitHubIcon className="h-4 w-4" />
            </Link>
            <Link 
                href="https://wa.me/201117180818" 
                target="_blank" 
                aria-label="WhatsApp"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
                <MessageCircle className="h-4 w-4" />
            </Link>
        </div>
    );
}
