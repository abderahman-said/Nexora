import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export function FooterBottomBar() {
    const t = useTranslations();
    const locale = useLocale();
    
    return (
        <div className="pt-10 mt-10 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
            <p>© {t('footer.rights')} {new Date().getFullYear()} Nexora Solutions</p>
          
            <div className="flex items-center gap-4">
                <Link 
                    href={`/${locale}/privacy`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    Privacy Policy
                </Link>
                <Link 
                    href={`/${locale}/terms`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    Terms of Service
                </Link>
            </div>
          
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{t('footer.tagline')}</p>
        </div>
    );
}
