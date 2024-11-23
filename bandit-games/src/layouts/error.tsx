export default function Error({
                                  children,
                              }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col min-h-screen w-full ">
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
        </div>
    );
}