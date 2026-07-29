'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { CountryFlagIconProps } from '../types';

export default function CountryFlagIcon({ country, className = 'w-5 h-3.5' }: CountryFlagIconProps) {
    const [hasError, setHasError] = useState(false);
    const isoCode = country?.iso?.toLowerCase();

    if (isoCode && !hasError) {
        return (
            <Image
                src={`https://flagcdn.com/w40/${isoCode}.png`}
                alt={country.name}
                onError={() => setHasError(true)}
                width={20}
                height={14}
                className={`${className} object-cover rounded-[2px] shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700/60`}
                loading="lazy"
            />
        );
    }

    return (
        <span className="text-base leading-none shrink-0 inline-block">
            {country?.flag || '🏳️'}
        </span>
    );
}