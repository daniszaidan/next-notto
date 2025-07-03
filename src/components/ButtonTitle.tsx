import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import type { ButtonTitle } from '@/utils/types';

const ButtonTitle = forwardRef<HTMLButtonElement, ButtonTitle>(
  (
    {
      title,
      icon,
      className,
      linkClassName,
      titleClassName,
      variant = 'primary',
      target = '_self',
      href,
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'primary';

    const buttonContent = (
      <button
        ref={ref}
        className={cn(
          'group transition-all duration-300 h-[45px] rounded-full flex items-center justify-between gap-10 relative overflow-hidden w-full cursor-pointer bg-[#9b79e8] backdrop-blur-[30px] pl-15 pr-[7.5px]',
          className
        )}
        aria-label={title}
        {...props}
      >
        <span
          className={cn(
            'transition-all duration-300 flex-none text-[17.5px] sm:text-[15px] font-semibold relative z-1 line-clamp-1',
            isPrimary && 'text-white',
            titleClassName
          )}
        >
          {title}
        </span>

        <div
          className={cn(
            'transition-all duration-300 flex items-center justify-center text-dark rounded-full overflow-hidden w-30 h-30 bg-white text-[#9b79e8] p-5 shrink-0'
          )}
        >
          {icon}
        </div>
      </button>
    );

    return href ? (
      <Link href={href} target={target} className={linkClassName}>
        {buttonContent}
      </Link>
    ) : (
      <div className={linkClassName}>{buttonContent}</div>
    );
  }
);

ButtonTitle.displayName = 'ButtonTitle';
export default ButtonTitle;
