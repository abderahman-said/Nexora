import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FileInput({
    label = 'Attach Project Brief or File',
    helperText = 'PDF, DOCX, PNG, JPG, or ZIP up to 10MB',
    accept = '.pdf,.docx,.doc,.png,.jpg,.jpeg,.zip',
    maxSizeMB = 10,
    value,
    onChange,
    error,
    className = '',
}) {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleFile = (file) => {
        if (!file) return;

        // Size validation
        if (file.size > maxSizeMB * 1024 * 1024) {
            setLocalError(`File size exceeds ${maxSizeMB}MB limit.`);
            return;
        }

        setLocalError('');
        if (onChange) {
            onChange(file);
        }
    };

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFile(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setLocalError('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        if (onChange) {
            onChange(null);
        }
    };

    const displayError = error || localError;

    return (
        <div className={`w-full space-y-2 ${className}`}>
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all duration-300
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50/50 dark:border-sky-400 dark:bg-sky-950/30'
                        : 'border-slate-200 bg-slate-50/70 hover:border-blue-400 dark:border-slate-800 dark:bg-[#0c101d] dark:hover:border-sky-500'
                    }
                    ${value ? 'border-solid border-blue-500/80 bg-blue-50/30 dark:border-sky-500/80 dark:bg-sky-950/20' : ''}
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                />

                {value ? (
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                    {value.name}
                                </p>
                                <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                                    {(value.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3" />
                                Ready
                            </span>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-red-100 text-slate-600 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950/80 dark:text-slate-300 dark:hover:text-red-400 flex items-center justify-center transition-colors"
                                title="Remove file"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 py-2">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 flex items-center justify-center shadow-sm">
                            <UploadCloud className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <span className="text-blue-600 dark:text-sky-400 font-bold">Click to upload</span> or drag and drop
                        </div>
                        {helperText && (
                            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-normal">
                                {helperText}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {displayError && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{displayError}</span>
                </div>
            )}
        </div>
    );
}
