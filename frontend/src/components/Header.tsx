import { Admin } from './ui/Admin';

export const Header = () => {
  return (
    <header className="h-[85px] flex justify-between px-6 items-center bg-white-100 rounded-[20px]">
      <h1 className="font-semibold text-[30px]">Dashboard</h1>
      <Admin />
    </header>
  );
};
