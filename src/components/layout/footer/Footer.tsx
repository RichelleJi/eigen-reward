'use client';

import { NavbarLink } from '@/components/layout/header/Navbar';
import { ArrowTopRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import FooterIcon from './FooterIcon';

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end">
      <div className="flex flex-col justify-between gap-16 bg-boat-footer-dark-gray py-12">
        <div className="container mx-auto flex w-full flex-col justify-between gap-16 px-8 md:flex-row">
          <div className="flex flex-col justify-between">
            <div className="flex h-8 items-center justify-start gap-4">
              <NextLink
                href="/"
                passHref={true}
                className="relative h-8 w-8"
                aria-label="Home page"
              >
                <FooterIcon />
              </NextLink>
              <NextLink
                href="/"
                passHref={true}
                className="text-center font-medium font-robotoMono text-white text-xl no-underline"
              >
                Eigen Reward
              </NextLink>
              <NavbarLink href="https://github.com/richelleji" target="_blank">
                <GitHubLogoIcon
                  width="24"
                  height="24"
                  aria-label="build-onchain-apps Github respository"
                />
              </NavbarLink>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <p className="font-normal text-base text-boat-footer-light-gray leading-7">
                This project is licensed under the MIT License - see the{' '}
                <NextLink
                  href="https://github.com/richelleji/blob/main/LICENSE.md"
                  className="underline"
                  target="_blank"
                >
                  LICENSE.md
                </NextLink>{' '}
                file for details
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
