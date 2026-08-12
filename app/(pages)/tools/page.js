import ToolsDirectory from "@/app/components/ToolsDirectory";

export const metadata = {
    title: "Browse All AI Tools & Software | Which AI Directory",
    description: "Explore our massive database of 2,500+ AI tools. Filter by free, paid, category, and features. The ultimate resource for discovering new AI technology.",
    openGraph: {
        title: "Browse the AI Empire | 2,500+ Tools",
        description: "The complete directory of artificial intelligence software. Find the perfect tool for any task.",
        url: '/tools',
        images: ['/api/og?title=Tools%20Directory&subtitle=Explore%20Every%20Category&type=Directory'],
    },
};

export default function ToolsPage() {
    return <ToolsDirectory />;
}
