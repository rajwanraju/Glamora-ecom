import cn from '@utils/cn';
import Link from 'next/link';

export default function CaptchaCopyrights({
  className = '',
}: {
  readonly className?: React.HTMLAttributes<HTMLParagraphElement>['className'];
}) {
  return (
    <p
      className={cn(
        'font-inter text-gray text-center text-[10px] leading-[14px] font-normal lg:text-[12px]',
        className
      )}
    >
      This site is protected by reCAPTCHA and the Google
      <Link
        className='hover:!text-link-hover !text-link mx-2 font-medium underline underline-offset-4 transition-colors duration-200 ease-in hover:underline'
        href='https://policies.google.com/privacy'
        target='_blank'
      >
        Privacy Policy
      </Link>
      and
      <Link
        className='hover:!text-link-hover !text-link mx-2 font-medium underline underline-offset-4 transition-colors duration-200 ease-in hover:underline'
        href='https://policies.google.com/terms'
        target='_blank'
      >
        Terms of Service
      </Link>
      apply.
    </p>
  );
}
