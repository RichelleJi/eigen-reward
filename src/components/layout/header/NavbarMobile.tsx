import {
  ChevronDownIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { useCallback, useState } from 'react';
import { NavbarLink, NavbarTitle } from './Navbar';

export default function NavbarMobile() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenuOpen = useCallback(
    () => setMobileMenuOpen((open) => !open),
    [],
  );

  if (isMobileMenuOpen) {
    return (
      <nav className="mx-2 flex flex-col gap-4 rounded-[25px] bg-black bg-opacity-50 p-2 backdrop-blur-2xl sm:max-h-300">
        <div
          className={[
            'flex flex-1 flex-grow items-center justify-between',
            'rounded-[50px] border border-stone-300 bg-opacity-10 p-4 backdrop-blur-2xl',
          ].join('')}
        >
          <div className="flex h-38 grow items-center justify-between gap-4">
            <NavbarTitle />
            <button
              type="button"
              aria-label="Menu"
              data-state="open"
              onClick={toggleMobileMenuOpen}
            >
              <Cross1Icon width="24" height="24" />
            </button>
          </div>
        </div>
        <div>
          <ul className="mx-2 flex flex-col gap-4">
            <li className="flex">
              <NavbarLink href="/#get-started">Get Started</NavbarLink>
            </li>
            <li className="flex">
              <Root className="relative flex flex-grow flex-col">
                <List className={clsx('flex flex-row space-x-2')}>
                  <Item>
                    <Trigger className="group flex items-center justify-start gap-1">
                      <ChevronDownIcon
                        className="transform transition duration-200 ease-in-out group-data-[state=open]:rotate-180"
                        width="16"
                        height="16"
                      />
                    </Trigger>
                    <Content
                      className={clsx(
                        'inline-flex h-38 flex-grow flex-col items-start justify-start gap-6',
                        'mt-4 rounded-lg p-6 shadow backdrop-blur-2xl',
                      )}
                    />
                  </Item>
                </List>
                <Viewport className={clsx('flex flex-col justify-center')} />
              </Root>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={[
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
        'mx-4',
      ].join('')}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <button
          type="button"
          aria-label="Menu"
          data-state="closed"
          onClick={toggleMobileMenuOpen}
        >
          <HamburgerMenuIcon width="24" height="24" />
        </button>
      </div>
    </nav>
  );
}
