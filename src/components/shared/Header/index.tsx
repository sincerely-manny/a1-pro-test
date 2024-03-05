'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    ['/', '/'],
    ['Задание 1', '/algo'],
    ['Задание 2', '/ui-select'],
    ['Задание 3', '/game'],
] as const;

export default function Header() {
    const pathname = usePathname();
    return (
        <header className="container mx-auto px-10">
            <nav>
                <ul className="flex h-40 w-full items-center justify-start gap-10">
                    {links.map(([title, href]) => (
                        <li key={href}>
                            {pathname === href ? (
                                <span className="rounded bg-black p-2 text-white" aria-current="page">
                                    {title}
                                </span>
                            ) : (
                                <Link href={href} className="bg-grey rounded p-2 underline">
                                    {title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
