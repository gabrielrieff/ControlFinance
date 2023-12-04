import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface boxResumeProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
}

export const BoxResume = (props: boxResumeProps) => {
  return (
    <div
      className={twMerge(
        `rounded-[16px] min-w-[200px] md:min-w-[100px] max-h-[133px]
        p-4 flex flex-col justify-center items-start`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
