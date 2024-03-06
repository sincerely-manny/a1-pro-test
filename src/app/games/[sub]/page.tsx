import Link from 'next/link';
import Image from 'next/image';
import 'server-only';
import { getAllCategories, getAllGames } from '@/data/games';

export async function generateStaticParams() {
    const { categories, providers } = await getAllCategories();

    return [...categories, ...providers].map((c) => ({ sub: c }));
}

export default async function GamesByCat({ params: { sub } }: { params: { sub: string } }) {
    const allGames = await getAllGames();
    const games = allGames
        .filter(({ categories, provider }) => provider === sub || categories.includes(sub))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((c) => ({
            ...c,
            img: `https://d2norla3tyc4cn.cloudfront.net/i/s3/${c.identifier}.webp`,
        }));

    return (
        <>
            <h2 className="mb-10 text-4xl font-medium">
                Category: <span className="font-bold capitalize">{sub.replaceAll('-', ' ')}</span>
            </h2>
            <ul className="flex flex-wrap items-stretch justify-stretch gap-4">
                {games.map(({ title, seo_title, img }) => (
                    <li key={seo_title}>
                        <Link
                            className="flex w-40 flex-col items-center justify-center opacity-80 transition-opacity hover:opacity-100"
                            href={`/games/${sub}/${seo_title}`}
                            title={title}
                        >
                            <div className="size-40 overflow-hidden rounded-md">
                                <Image alt={title} src={img} width={180} height={180} className="object-cover" />
                            </div>
                            <span className="max-w-full truncate">{title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
