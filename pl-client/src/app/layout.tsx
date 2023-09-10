import "./globals.scss"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Public Library",
    description: "Decentralized Libraries for PDFs/Text Files",
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
