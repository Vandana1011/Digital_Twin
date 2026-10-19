import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white font-medium shadow-glow-purple hover:shadow-glow-purple-lg focus-visible:ring-purple-400',
    secondary: 'bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 hover:text-white border border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] focus-visible:ring-purple-400',
    outline: 'border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white hover:bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.15)] focus-visible:ring-purple-400',
    purple: 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-glow-purple focus-visible:ring-purple-400',
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-semibold shadow-glow-cyan focus-visible:ring-cyan-400',
    teal: 'bg-teal-500 hover:bg-teal-400 text-navy-950 font-semibold shadow-glow-teal focus-visible:ring-teal-400',
    rose: 'bg-rose-500 hover:bg-rose-400 text-white font-semibold shadow-glow-rose focus-visible:ring-rose-400',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5 focus-visible:ring-purple-400',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className='w-4 h-4 animate-spin text-current' />
      ) : (
        Icon && iconPosition === 'left' && <Icon className='w-4 h-4 shrink-0' />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className='w-4 h-4 shrink-0' />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-label={ariaLabel} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} aria-label={ariaLabel} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
