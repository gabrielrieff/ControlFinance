import { Input } from '~/components/shared/Input';
import { MdEmail } from 'react-icons/md';
import { Button } from '~/components/shared/Button';
import Link from 'next/link';

export default function recoverPassword() {
  return (
    <main className="flex justify-center items-center">
      <div className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen">
        <h1 className="font-semibold text-[48px]">Recuperar senha</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              type="email"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              outline-green-500 bg-grey-400 ps-11 h-[50px]"
            />
          </div>
        </label>
        <Button
          type="button"
          className="bg-green-500 text-[26px] font-semibold w-[40%] text-white-100 hover:bg-green-400 hover:text-grey-700 transition-[.3s]"
        >
          Recuperar
        </Button>

        <Link href={'/'} className="text-blue-500 text underline sm:text-sm">
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}
