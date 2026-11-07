import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineShopping, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsChevronDown, BsSearch } from 'react-icons/bs';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { SHOP_NAV_LINKS } from '../lib/categories';

const SHOP_LINKS = SHOP_NAV_LINKS;

const SUPPORT_LINKS = [
  { href: '/#faq', label: 'FAQs' },
  { href: '/#contact', label: 'Contact' },
  { href: '/return-policy', label: 'Shipping & Returns' },
];

const NAV_GROUPS = [
  { id: 'shop', label: 'Shop', links: SHOP_LINKS },
  { id: 'support', label: 'Support', links: SUPPORT_LINKS },
];

const Navbar = () => {
  const router = useRouter();
  const { showCart, setShowCart, totalQuantities } = useStateContext() || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const mobilePanelRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const dropdownRefs = useRef({});
  const openedByHoverRef = useRef(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const currentCategory = router.pathname === '/'
    ? (typeof router.query.category === 'string' ? router.query.category : 'all')
    : null;

  const handleSearch = () => {
    closeMobileMenu();
    openedByHoverRef.current = false;
    setOpenDropdown(null);

    if (router.pathname === '/') {
      const input = document.getElementById('catalog-search');
      if (input) {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        input.focus({ preventScroll: true });
        return;
      }
    }

    router.push('/?focus=search#catalog');
  };

  const handleDropdownMouseLeave = (event, groupId) => {
    if (openDropdown !== groupId) return;
    const menu = event.currentTarget.querySelector('.nav-dropdown-menu');
    if (menu && menu.contains(document.activeElement)) return;
    openedByHoverRef.current = false;
    setOpenDropdown(null);
  };

  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    openedByHoverRef.current = false;
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const handlePointerDown = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        openedByHoverRef.current = false;
        setOpenDropdown(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openDropdown]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      openedByHoverRef.current = false;
      setOpenDropdown(null);
      dropdownRefs.current[openDropdown]
        ?.querySelector('.nav-dropdown-trigger')
        ?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openDropdown]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const panel = mobilePanelRef.current;
    if (!panel) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = Array.from(panel.querySelectorAll('a[href], button:not([disabled])'));
    focusable[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar-container" aria-label="Main Navigation">
      <Link href="/">
        <a className="logo" aria-label="SPARQ Home" onClick={closeMobileMenu}>
          <span className="brand-logo-text">SPARQ</span>
        </a>
      </Link>

      <ul className="nav-links">
        {NAV_GROUPS.map((group) => {
          const isOpen = openDropdown === group.id;

          return (
            <li
              key={group.id}
              className="nav-dropdown"
              ref={(node) => { dropdownRefs.current[group.id] = node; }}
              onMouseEnter={() => {
                openedByHoverRef.current = true;
                setOpenDropdown(group.id);
              }}
              onMouseLeave={(event) => handleDropdownMouseLeave(event, group.id)}
              onBlur={handleDropdownBlur}
            >
              <button
                type="button"
                className="nav-link nav-dropdown-trigger"
                aria-expanded={isOpen}
                aria-controls={`${group.id}-menu`}
                onClick={() => {
                  if (isOpen && openedByHoverRef.current) {
                    openedByHoverRef.current = false;
                    return;
                  }

                  openedByHoverRef.current = false;
                  setOpenDropdown(isOpen ? null : group.id);
                }}
              >
                <span>{group.label}</span>
                <BsChevronDown
                  className={`nav-dropdown-chevron ${isOpen ? 'open' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <ul
                id={`${group.id}-menu`}
                className={`nav-dropdown-menu ${isOpen ? 'open' : ''}`}
                aria-label={`${group.label} links`}
                aria-hidden={isOpen ? undefined : 'true'}
              >
                {group.links.map((link) => {
                  const isActive = group.id === 'shop' && currentCategory === link.category;

                  return (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <a
                          className={`nav-dropdown-link ${isActive ? 'active' : ''}`}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => {
                            openedByHoverRef.current = false;
                            setOpenDropdown(null);
                          }}
                        >
                          {link.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className="nav-link nav-search-btn"
            onClick={handleSearch}
            aria-label="Search products"
          >
            <BsSearch aria-hidden="true" />
            <span>Search</span>
          </button>
        </li>
      </ul>

      <div className="nav-actions">
        <button
          type="button"
          className="nav-cart-btn"
          onClick={() => {
            closeMobileMenu();
            openedByHoverRef.current = false;
            setOpenDropdown(null);
            if (setShowCart) setShowCart(true);
          }}
          aria-label={`Shopping bag containing ${totalQuantities || 0} items`}
        >
          <AiOutlineShopping className="cart-svg" aria-hidden="true" />
          <span className="cart-label">Bag</span>
          <span className="cart-count">({totalQuantities || 0})</span>
          {totalQuantities > 0 && (
            <span className="cart-badge" aria-hidden="true">{totalQuantities}</span>
          )}
        </button>

        <button
          type="button"
          className="nav-mobile-toggle"
          ref={mobileToggleRef}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          ref={mobilePanelRef}
        >
          <button
            type="button"
            className="mobile-nav-search"
            onClick={handleSearch}
          >
            <BsSearch aria-hidden="true" />
            <span>Search the catalogue</span>
          </button>

          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="mobile-nav-group">
              <span className="mobile-nav-group-label">{group.label}</span>
              <ul className="mobile-nav-list">
                {group.links.map((link) => (
                  <li key={link.href} className="mobile-nav-item">
                    <Link href={link.href}>
                      <a className="mobile-nav-link" onClick={closeMobileMenu}>
                        <span>{link.label}</span>
                        <span className="mobile-nav-arrow" aria-hidden="true">→</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
