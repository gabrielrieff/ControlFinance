import Link from 'next/link';
import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';

import { BiSolidLock } from 'react-icons/bi';
import { MdEmail, MdOutlineSecurity } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';


export default function changePassword() {
  return (
    <main className="flex justify-center items-center">
      <div className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen">
        <h1 className="font-semibold text-[48px]">Nova senha</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              type="email"
              className="bg-slate-100 ps-11 h-[50px]"
            />
          </div>
        </label>

        <label className="w-full">
          <span>Senha:</span>
          <div className="relative">
            <BiSolidLock size={30} className="absolute bottom-[35px] left-2" />
            <Input
              type="password"
              className="bg-slate-100 ps-11 pe-11 h-[50px]"
            />
            <button>
              <AiFillEye
                size={30}
                className="absolute bottom-[35px] right-2 hover:text-grey-300 transition-[0.3s]"
              />
            </button>
          </div>
        </label>

        <label className="w-full">
          <span>Token:</span>
          <div className="relative">
            <MdOutlineSecurity
              size={30}
              className="absolute bottom-[10px] left-2"
            />
            <Input
              type="text"
              className="bg-slate-100 ps-11 pe-11 h-[50px]"
            />
          </div>
        </label>
        <Button
          type="button"
          variant={'default'}        >
          Salvar
        </Button>

        <Link href={'/'} className="text-blue-500 text underline sm:text-sm">
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}
