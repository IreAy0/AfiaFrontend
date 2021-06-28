import Link from 'next/link';

const AsLink = ({href, className, children, target}) => {
  return (
    <Link href={href}>
      <a className={className} target={target}>
        {children}
        
      </a>
    </Link>
  );
};

const AsBtn = ({className, children, onClick, type, }) => {
  return (
    <button className={className} onClick={onClick} type={type || 'button'}>
        {children}
        
    </button>
  );
};

export default function Button({variant, href, className, children, onClick, heightClass, target, type}) {
  let classes = ''; // default for green
  switch (variant) {
    case 'green':
      classes = 'bg-myGreen-100 text-white text-sm';
      break;
    case 'orange':
      classes = 'bg-orange-100 hover:bg-orange-300 text-white text-sm';
      break;
    default:
      break;
  }
  const fullClassName = `${heightClass || 'h-10'} inline-flex items-center py-1 px-4 focus:outline-none rounded-md ${classes} ${className || ''}`;
  return href ?
    <AsLink
      className={fullClassName}
      href={href}
      target={target}
     >
      {children}
    </AsLink> :
    <AsBtn
      onClick={onClick}
      className={fullClassName}
      type={type}
      >
      {children}
    </AsBtn>;
}
