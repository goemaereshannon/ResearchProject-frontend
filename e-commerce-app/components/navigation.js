import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      <h1>Navigation</h1>
      <nav>
          <ul>
              <li>
                  <Link href="/">
                      Discover
                  </Link>
              </li>
              <li>
                  <Link href="/products/search">
                      <a>Search</a>
                  </Link>
              </li>
              <li>
                  <Link href="/orders/cart">
                      <a>Cart</a>
                  </Link>
              </li>
              <li>
                  <Link href="/profile/favorites">
                      <a>Favorites</a>
                  </Link>
              </li>
              <li>
                  <Link href="/profile/profile">
                      <a>Profile</a>
                  </Link>
              </li>
          </ul>
      </nav>
    </>
  );
}
