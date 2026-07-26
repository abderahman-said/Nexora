import { forwardRef } from 'react';
import Link from 'next/link';

/**
 * 💡 Polymorphic Component Pattern: Button
 * Can render as a <button>, an <a> link, or Next.js <Link> dynamically via the `as` prop.
 * Example usages:
 * <Button variant="primary" onClick={handleClick}>Click Me</Button>
 * <Button as={Link} href="/about" variant="gradient">Learn More</Button>
 * <Button as="a" href="https://github.com" target="_blank" variant="outline">GitHub</Button>
 */

const VARIANTS = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm border border-transparent',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-sm border border-transparent',
  outline: 'bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100/50 dark:hover:bg-slate-800/50',
  ghost: 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-transparent',
  gradient: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-md border border-transparent',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-full gap-1.5',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-full gap-2',
  lg: 'px-6 py-3 text-base font-bold rounded-full gap-2.5',
};

const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    disabled = false,
    ...props
  },
  ref
) {
  // If `as` is passed as Link from 'next/link' or 'a' tag, Component handles routing
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  const baseStyles =
    'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  return (
    <Component
      ref={ref}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={Component === 'button' ? disabled : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
