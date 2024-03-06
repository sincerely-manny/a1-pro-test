import 'server-only';

import Link from 'next/link';

export type Games = {
    identifier: string; // уникальный идентификатор игры
    seo_title: string; // уникальный SEO-ключ игры
    title: string; // Текстовое название игры
    provider: string; // ID провайдера игры
    categories: string[]; // Список ID категорий, в которые входит игра
}[];

export async function getAllGames() {
    'use server';

    const games = (await fetch('https://nextjs-test-pi-hazel-56.vercel.app/data/games.json').then((res) =>
        res.json(),
    )) as Games;
    return games;
}

export async function getAllCategories() {
    'use server';

    const games = await getAllGames();
    const categoriesSet = new Set<string>();
    const providersSet = new Set<string>();
    games.forEach(({ categories, provider }) => {
        categories.forEach((c) => {
            categoriesSet.add(c);
        });
        providersSet.add(provider);
    });
    const categoriesArr = Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
    const providersArr = Array.from(providersSet).sort((a, b) => a.localeCompare(b));

    return {
        categories: categoriesArr,
        providers: providersArr,
    };
}

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
