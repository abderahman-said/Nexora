import React, { forwardRef } from 'react';
import type { FormInputProps } from './types';

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
    function FormInput(
        {
            label,
            required = false,
            icon: Icon = null,
            isTextarea = false,
            rows = 4,
            error,
            containerClassName = '',
            inputClassName = '',
            className = '',
            id,
            ...props
        },
        ref
    ) {
        const InputComponent = isTextarea ? 'textarea' : 'input';

        return (
            <div className={`space-y-1.5 ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                        {label} {required && <span className="text-blue-600 dark:text-sky-400">*</span>}
                    </label>
                )}

                <div className="relative">
                    {Icon && !isTextarea && (
                        <Icon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                    )}

                    <InputComponent
                        ref={ref as any}
                        id={id}
                        rows={isTextarea ? rows : undefined}
                        className={`
            w-full text-xs sm:text-sm font-medium
            bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
            border ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-sky-400'}
            focus:outline-none transition-colors
            ${isTextarea ? 'p-4 rounded-2xl resize-none' : 'py-3 rounded-2xl'}
            ${Icon && !isTextarea ? 'pl-11 pr-4' : !isTextarea ? 'px-4' : ''}
            ${inputClassName}
            ${className}
          `}
                        {...props}
                    />
                </div>

                {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export default FormInput;
