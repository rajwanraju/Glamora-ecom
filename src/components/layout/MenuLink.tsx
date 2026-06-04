'use client';

import cn from '@utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IMenuLinkPops {
  readonly className?: React.HTMLAttributes<HTMLAnchorElement>['className'];
  readonly label: string;
  readonly path: string;
}

export default function MenuLink({ className = '', label, path }: IMenuLinkPops) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'font-inter hover:!text-primary-hover text-[16px] leading-[18px] uppercase transition-colors',
        pathname === path ? '!text-primary font-bold' : 'font-normal !text-white',
        className
      )}
      href={path}
    >
      {label}
    </Link>
  );
}
