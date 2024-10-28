import clsx from 'clsx';
import { ReactNode } from 'react';

export default function Viel({
  enable,
  children,
}: Readonly<{
  enable: boolean;
  children: ReactNode;
}>) {
  return (
    <div
      className={clsx('mx-auto rounded overflow-hidden shadow-lg relative', {
        'opacity-50 pointer-events-none': enable,
      })}
    >
      {children}
    </div>
  );
}
