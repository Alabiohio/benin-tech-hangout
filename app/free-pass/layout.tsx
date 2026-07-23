import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Pass Registration | Benin Tech Fest',
    description: 'Register for free access to Benin Tech Fest events',
};

export default function FreePassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
