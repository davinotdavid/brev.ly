import { Logo } from "./components/logo";
import { MyLinksCard } from "./components/my-links-card";
import { NewLinkCard } from "./components/new-link-card";

function App() {
  return (
    <main className="h-dvh bg-gray-200 pt-8 md:pt-[88px] pb-6 px-3">
      <a href="#" className="mb-6 block md:mb-8 md:max-w-[980px] md:mx-auto">
        <Logo />
      </a>
      <div className="flex flex-col gap-3 md:flex-row md:gap-5 md:max-w-[980px] md:mx-auto">
        <NewLinkCard />
        <MyLinksCard />
      </div>
    </main>
  );
}

export default App;
