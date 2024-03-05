import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import '@/styles/globals.css';

import { Sofia_Sans } from 'next/font/google';

const sofiaSans = Sofia_Sans({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'A1 test',
    // icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={`min-h-screen bg-white font-sans text-black ${sofiaSans.variable}`}>
                <Header />
                <main className="container mx-auto my-10 px-10">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
