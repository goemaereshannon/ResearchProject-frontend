import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      <h1>Navigation</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <img src="/svgs/home.svg" alt="Discover icon" className="navigationIcon" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/products/search">
              <a>
                <img src="/svgs/search.svg" alt="Search icon" className="navigationIcon" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/orders/cart">
              <a>
                <img src="/svgs/shopping-bag.svg" alt="Cart icon" className="navigationIcon" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile/favorites">
              <a>
                <img src="/svgs/like.svg" alt="Favorites icon" className="navigationIcon" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile/profile">
              <a>
                <img src="/svgs/man-avatar.svg" alt="Profile icon" className="navigationIcon" />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
