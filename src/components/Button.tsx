import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
}

const sizeStyles = {
  sm: 'py-2 px-3 text-sm',
  lg: 'py-3 px-6 text-base',
}

type ButtonPropsBase = {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
}

type ButtonProps = ButtonPropsBase &
  (
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
    | (React.ComponentPropsWithoutRef<typeof Link> & { target?: string })
  )

export function Button({
  variant = 'primary',
  size = 'sm',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (typeof props.href !== 'undefined' && props.href) {
    if ('target' in props && props.target === '_blank') {
      const { target, href, ...linkProps } = props as {
        href: string
        target: string
      }
      return (
        <a
          href={href}
          target={target}
          rel="noopener noreferrer"
          className={className}
          {...linkProps}
        />
      )
    }
    return <Link className={className} {...props} />
  }

  // href가 없으면 button props만 사용
  const buttonProps = props as React.ComponentPropsWithoutRef<'button'>
  return <button className={className} {...buttonProps} />
}
