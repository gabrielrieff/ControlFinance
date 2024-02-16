'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { FormatDate } from '~/Helpers/FormatDate';
import { Card } from '~/components/shadcn/card';
import { enumUser } from '~/@types/enum/EnumAdmin';

import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/shadcn/select';
import { Label } from '~/components/shadcn/label';

import { BiSolidUser } from 'react-icons/bi';
import { FaGear } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';

export default function Usuarios() {
  const { users, deleteUser } = useContext(AuthContext);
  const [isForm, setIsForm] = useState(true);
  const [typeUser, setTypeUser] = useState('0');

  function handleForm() {
    setIsForm(!isForm);
  }

  if (users === undefined) return;

  return (
    <Card
      className="max-w-[1300px] min-w-[1100px] dsm:min-w-[300px] dmd:min-w-[500px] dlg:min-w-[650px] xl:min-w-[850px] 
    flex flex-col justify-center items-center gap-8 p-4 mt-20"
    >
      <section className="w-full">
        <Card>
          <div className="w-full flex justify-between items-center p-2">
            <span>Criar novo usuário</span>
            <IoIosArrowDown
              size={25}
              className={`cursor-pointer hover:text-orenge-500 transition-[.3s] ${
                isForm ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={handleForm}
            />
          </div>
          <form
            autoComplete="off"
            className={`bg-grey-300 p-2 pt-5  ${
              isForm ? 'flex' : 'hidden'
            } flex-col transition-[.3s]`}
          >
            <div className="flex gap-1 justify-between dmd:flex-col dmd:gap-3">
              <Label
                className="flex flex-col w-full gap-2"
                htmlFor="first-name"
              >
                <span>Nome</span>
                <Input id="first-name" type="text" />
              </Label>
              <Label className="flex flex-col w-full gap-2" htmlFor="last-name">
                <span>Sobrenome</span>
                <Input id="last-name" type="text" />
              </Label>
              <Label className="flex flex-col w-full gap-2" htmlFor="password">
                <span>Senha</span>
                <Input autoComplete="off" id="password" type="password" />
              </Label>
            </div>

            <div className="flex items-end gap-1 justify-between dmd:flex-col dmd:gap-3 mt-4">
              <Label htmlFor="Email" className="flex flex-col w-full gap-2">
                <span>E-mail</span>
                <Input id="Email" type="email" />
              </Label>

              <Label htmlFor="typeUser" className="flex flex-col w-full gap-2">
                <span>Tipo de usuário</span>
                <Select onValueChange={(e) => setTypeUser(e)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={'2'}>Master</SelectItem>
                      <SelectItem value={'1'}>Admin</SelectItem>
                      <SelectItem value={'0'}>Padrão</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <label className="w-full">
                <Button
                  variant={'default'}
                  className="bg-green-600 hover:bg-green-500 transition-[.3s]
                text-white dmd:w-full font-semibold rounded-none p-2 py-[9px]"
                >
                  Salvar
                </Button>
              </label>
            </div>
          </form>
        </Card>

        <table className="w-full lg:text-[12px] dmd:text-[10px] mt-5">
          <thead>
            <tr
              className="flex w-full justify-center dmd:justify-around bg-grey-300/90 
          rounded-[10px] mb-3 p-2"
            >
              <th className="w-1/5 center">Usuário</th>
              <th className="w-1/5 center">Tipo de usuario</th>
              <th className="w-2/5 center">ID</th>
              <th className="w-1/5 center">Data de criação</th>
              <th className="w-1/5 center">
                <FaGear size={30} />
              </th>
            </tr>
          </thead>
          <tbody className="gap-2 flex flex-col">
            {users.map((user) => (
              <tr
                className="bg-grey-300/30 rounded-[10px] p-2 flex w-full justify-between"
                key={user.id}
              >
                <td
                  className="flex items-center justify-center gap-3 dmd:gap-1 dmd:flex-col 
                                          w-1/5"
                >
                  {!user?.photo ? (
                    <div
                      className="bg-grey-400 h-[40px] w-[40px] flex items-center
           justify-center rounded-full"
                    >
                      <BiSolidUser size={30} />
                    </div>
                  ) : (
                    <Image
                      alt={`${user!.firstName} ${user!.lastName}`}
                      src={`http://localhost:3333/files/image/user/${
                        user!.photo
                      }`}
                      width={46}
                      height={46}
                      className="rounded-full h-[46px] object-cover"
                    />
                  )}
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </td>

                <td className="w-1/5 center">
                  {user.userType! === enumUser.Admin
                    ? 'Admin'
                    : user?.userType! === enumUser.Padrao
                    ? 'Padrão'
                    : user?.userType! === enumUser.Master
                    ? 'Master'
                    : ''}
                </td>

                <td className="w-2/5 center">{user.id}</td>

                <td className="w-1/5 center">{FormatDate(user.created_at!)}</td>

                <td className="w-1/5 center gap-3 dlg:gap-1 dmd:flex-col">
                  <Button
                    variant={'destructive'}
                    onClick={() => deleteUser(user.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant={'default'}
                    className="bg-orange-500 hover:bg-orange-500/60 transition-[.3s]"
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Card>
  );
}
