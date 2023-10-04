import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  function handleRedirect(e: React.MouseEvent) {
    e.preventDefault();
    const href = (e.target as HTMLAnchorElement).getAttribute("data-href");
    if (!href) return;
    navigate(href);
  }
  return (
    <nav>
      <ul>
        <li>
          <a href="#" data-href="/" onClick={handleRedirect}>
            Exercice 1
          </a>
        </li>
        <li>
          <a href="#" data-href="/two" onClick={handleRedirect}>
            Exercice 2
          </a>
        </li>
        <li>
          <a href="#" data-href="/three" onClick={handleRedirect}>
            Exercice 3
          </a>
        </li>
      </ul>
    </nav>
  );
}
