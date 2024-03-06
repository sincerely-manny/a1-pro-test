import 'server-only';

import Link from 'next/link';
import { getAllCategories } from '@/data/games';

export default async function CategoriesList() {
    const { categories, providers } = await getAllCategories();
    return (
        <div className="flex gap-20">
            <div>
                <h2 className="mb-2 text-xl font-medium">Categories</h2>
                <ul className="grid grid-flow-col grid-rows-[repeat(24,_1fr)] gap-x-4">
                    {categories.map((c) => (
                        <li key={c}>
                            <Link className="capitalize underline" href={`/games/${c}`}>
                                {c.replaceAll('-', ' ')}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="mb-2 text-xl font-medium">Providers</h2>
                <ul>
                    {providers.map((p) => (
                        <li key={p}>
                            <Link className="capitalize underline" href={`/games/${p}`}>
                                {p.replaceAll('-', ' ')}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
