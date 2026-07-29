import React from "react";
import { useTranslations } from 'next-intl';

export function FooterBottomBar() {
    const t = useTranslations();
    
    return (
        <div className="pt-10 mt-10 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
            <p>© {t('footer.rights')} {new Date().getFullYear()} Nexora Solutions</p>
          
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{t('footer.tagline')}</p>
        </div>
    );
}
