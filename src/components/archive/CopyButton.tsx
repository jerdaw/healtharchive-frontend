"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";

type CopyButtonProps = {
    text: string;
    label: string;
    className?: string;
    children?: ReactNode;
};

function CheckIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.43.006l-3.79-3.74a1 1 0 1 1 1.404-1.424l3.078 3.038 6.492-6.58a1 1 0 0 1 1.44-.014Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function CopyButton({
    text,
    label,
    className,
    children,
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const statusId = useId();

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            className={className}
            onClick={onCopy}
            title={label}
            aria-label={label}
            aria-describedby={statusId}
        >
            {children ? (copied ? <CheckIcon /> : children) : label}
            <span id={statusId} className="sr-only" aria-live="polite">
                {copied ? "Copied to clipboard." : ""}
            </span>
        </button>
    );
}
