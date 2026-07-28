import React from "react";

export function FooterBottomBar() {
    return (
        <div className="pt-10 mt-10 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
            <p>© All Rights Reserved {new Date().getFullYear()} Nexora Solutions</p>
          
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">Code. Innovate. Elevate.</p>
        </div>
    );
}
