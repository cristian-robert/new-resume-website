export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <span>Cristian-Robert Iosef</span>
        <span>Built with Next.js</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
