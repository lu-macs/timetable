import { ModeToggle } from './components/mode-toggle';
import { Table } from './components/table';
import { Text } from './components/text';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 flex items-center gap-4">
        <a
          href="/"
          className="font-bold text-2xl hover:text-muted-foreground right-click-branding"
          aria-label="Home button"
        >
          <Text />
        </a>
        <div className="flex-grow"></div>
        <ModeToggle />
      </header>
      <main className="relative flex-grow">
        {/* cool colour bg thing */}
        <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-primary-muted opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(16% 45%, 48% 40%, 1% 26%, 85% 0%, 100% 46%, 30% 3%, 78% 75%, 85% 85%, 13% 100%, 100% 58%, 75% 52%, 45% 71%)',
              }}
            ></div>
          </div>
        </div>
        <Table />
        {/* cool colour bg thing */}
        <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-primary-muted opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(16% 45%, 48% 40%, 1% 26%, 85% 0%, 100% 46%, 30% 3%, 78% 75%, 85% 85%, 13% 100%, 100% 58%, 75% 52%, 45% 71%)',
              }}
            ></div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col md:flex-row justify-center lg:gap-4 items-center text-center p-4 md:gap-2">
        <span>
          © {new Date().getFullYear()} Lancaster University Magic and Circus
          Society
        </span>
        <a
          href="https://lumacs.co.uk/privacy/"
          className="underline hover:text-muted-foreground"
        >
          Privacy Policy
        </a>
        <a
          href="https://github.com/lu-macs/timetable"
          className="underline hover:text-muted-foreground"
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/lu_macs/"
          className="underline hover:text-muted-foreground"
        >
          Our Instagram
        </a>
      </footer>
    </div>
  );
};

export default App;
