import { ImgHTMLAttributes, useState } from 'react';

export const Image = ({ alt, src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return <div className="bg-slate-200 text-slate-600 text-xs flex items-center justify-center" {...(props as never)}>{alt ?? 'image'}</div>;
  }

  return <img alt={alt} src={src} onError={() => setBroken(true)} {...props} />;
};
