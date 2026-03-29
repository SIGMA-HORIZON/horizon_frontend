import Link from "next/link";
import { waLink } from "../data/utils";
const Header = () => (
  <header className="bg-blue-600 text-white p-6 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl  text-2xl font-bold text-amber-400 font-bold">SIGMA Horizon</h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:underline">Accueil</Link>

        <div> header</div>


      </nav>
    </div>
  </header>
);

export default Header;
