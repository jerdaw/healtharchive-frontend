// Link with a subtle glow that follows the cursor on hover
"use client";

import Link, { type LinkProps } from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode, useRef } from "react";

type HoverGlowLinkProps = {
    children: ReactNode;
    className?: string;
} & LinkProps &
    Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

export function HoverGlowLink({
    children,
    className,
    ...rest
}: HoverGlowLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        node.style.setProperty("--ha-glow-x", `${x}%`);
        node.style.setProperty("--ha-glow-y", `${y}%`);
    };

    return (
        <Link
            ref={ref}
            {...rest}
            className={`ha-btn-primary ha-btn-glow ${className ?? ""}`}
            onMouseMove={handleMove}
            onMouseEnter={handleMove}
        >
            {children}
        </Link>
    );
}
