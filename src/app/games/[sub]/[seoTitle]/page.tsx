import { getAllGames } from '@/data/games';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'server-only';

export async function generateStaticParams() {
    const games = await getAllGames();

    const byProvider = games.map(({ seo_title, provider }) => ({ sub: provider, seoTitle: seo_title }));
    const byCategory: typeof byProvider = [];
    games.forEach(({ seo_title, categories }) => {
        categories.forEach((category) => {
            byCategory.push({ sub: category, seoTitle: seo_title });
        });
    });
    return [...byProvider, ...byCategory];
}

export default async function Game({ params: { sub, seoTitle } }: { params: { sub: string; seoTitle: string } }) {
    const games = await getAllGames();

    const game = games.find(
        ({ seo_title, provider, categories }) =>
            seoTitle === seo_title && (sub === provider || categories.includes(sub)),
    );
    if (!game) {
        return notFound();
    }
    const { identifier, categories, provider, title } = game;
    const img = `https://d2norla3tyc4cn.cloudfront.net/i/s3/${identifier}.webp`;

    return (
        <>
            <h2 className="mb-5  text-xl font-light">
                <span className="mr-1 text-6xl font-bold">{title} </span> by{' '}
                <Link href={`/games/${provider}`} className="capitalize underline">
                    {provider.replaceAll('-', ' ')}
                </Link>
            </h2>
            <div className="flex items-start gap-20">
                <Image src={img} alt={title} width={400} height={400} className="rounded-lg shadow-xl" unoptimized />
                <div>
                    <h3 className="mb-3 text-3xl font-semibold">Categories</h3>
                    <ul>
                        {categories.map((category) => (
                            <li key={category} className="capitalize">
                                <Link href={`/games/${category}`} className="underline">
                                    {category.replaceAll('-', ' ')}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
