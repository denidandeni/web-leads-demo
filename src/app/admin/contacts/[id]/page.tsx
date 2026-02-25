import ContactDetailClient from "./ContactDetailClient";

export function generateStaticParams() {
    return [
        { id: "C001" },
        { id: "C002" },
        { id: "C003" },
        { id: "C004" }
    ];
}

export default function ContactDetailPage() {
    return <ContactDetailClient />;
}
