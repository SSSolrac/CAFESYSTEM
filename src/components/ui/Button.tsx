import { ButtonHTMLAttributes } from 'react';

export const Button = ({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`rounded-md px-3 py-2 text-sm font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 disabled:opacity-60 ${className}`}
    {...props}
  />
);
