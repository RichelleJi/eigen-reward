import { ChevronDownIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import NextLink from 'next/link';
import AccountConnect from './AccountConnect';

export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="px-0 text-center font-normal font-robotoMono text-base text-white no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink
        href="/"
        passHref={true}
        className="relative h-8 w-8"
        aria-label="Home page"
      >
        <div className="absolute size-8 rounded-full bg-white" />
      </NextLink>
      <NextLink
        href="/"
        passHref={true}
        className="text-center font-medium font-robotoMono text-white text-xl no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        Eigen Reward
      </NextLink>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">
            <li className="flex">
              <NavbarLink
                href="https://github.com/richelleji"
                target="_blank"
              >
                <GitHubLogoIcon
                  width="24"
                  height="24"
                  aria-label="build-onchain-apps Github respository"
                />
              </NavbarLink>
            </li>
            <li className="flex">
              <Root className="relative">
                <List className={clsx('flex flex-row space-x-2')}>
                  <Item>

                    <Content
                      className={clsx(
                        'inline-flex h-38 w-48 flex-col items-start justify-start gap-6',
                        'rounded-lg bg-neutral-900 p-6 shadow backdrop-blur-2xl',
                      )}
                    >
                    </Content>
                  </Item>
                </List>
                <Viewport
                  className={clsx(
                    'absolute flex justify-center',
                    'top-[100%] left-[-20%] w-[140%]',
                  )}
                />
              </Root>
            </li>
          </ul>
          <AccountConnect />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
