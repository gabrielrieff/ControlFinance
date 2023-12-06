import { TbFidgetSpinner } from 'react-icons/tb';

export default function Loading() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <TbFidgetSpinner size={50} className="animate-spin" />
    </main>
  );
}
