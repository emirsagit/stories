import Link from "next/link";
import { Logo } from "src/components";

export default function Nav() {
  return (
    <header>
      <nav className="flex flex-row justify-between container">
        <Logo />
        <ul className="fixed bottom-0 right-0 left-0 flex justify-between gap-2 py-1 px-2 bg-white w-full text-gray-900">
          <li>Anasayfa</li>
          <li>Hikayeler</li>
          <li>Oluştur</li>
          <li>Hakkımızda</li>
        </ul>
        <Link href="/">
          <a>Giriş / Kayıt</a>
        </Link>
      </nav>
    </header>
  );
}
