'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { FaGear } from 'react-icons/fa6';
import { Button } from '~/components/shared/Button';
import { Dialog } from '~/components/shared/Dialog';

export default function transactions() {
  const { listInvoice, deleteInvoice } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(!isOpen);
  }

  const toLeadDelet = async (id: string) => {
    deleteInvoice(id);
    handleOpenModal();
  };

  function convertDate(date: Date) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }
  return (
    <main
      className="flex flex-col justify-between items-center bg-white-100
   h-screen gap-3 rounded-[20px] p-4"
    >
      <table className="w-full lg:text-[12px] md:text-[10px]">
        <thead>
          <tr className="flex w-full justify-center bg-grey-300/90 rounded-[10px] mb-3 p-2">
            <th className="w-[15%] flex justify-center items-center">
              Categoria
            </th>
            <th className="w-[10%] flex justify-center items-center">Tipo</th>
            <th className="w-[10%] flex justify-center items-center">
              Descrição
            </th>
            <th className="w-[10%] flex justify-center items-center">Valor</th>
            <th className="w-[10%] flex justify-center items-center">
              Parcelas pagas
            </th>
            <th className="w-[10%] flex justify-center items-center md:hidden">
              Número de parcelas
            </th>
            <th className="w-[10%] flex justify-center items-center">
              Data de criação
            </th>
            <th className="w-[10%] flex justify-center items-center">
              Última parcela
            </th>
            <th className="w-[15%] flex justify-center items-center">
              <FaGear size={30} />
            </th>
          </tr>
        </thead>
        <tbody className="gap-2 flex flex-col">
          {listInvoice.map((item) => (
            <tr
              key={item.id}
              className="bg-grey-300 rounded-[10px] p-2 flex w-full justify-between"
            >
              <td className="flex items-center justify-center gap-3 md:gap-1 md:flex-col w-[15%]">
                <Image
                  alt={item.category.title}
                  src={`http://localhost:3333/files/image/category/${item.category.banner}`}
                  width={40}
                  height={40}
                  className="rounded-full lg:w-[30px] lg:h-[30px]"
                />
                <span>{item.category.title}</span>
              </td>
              {item.type == 0 ? (
                <td className="text-green-400 font-semibold w-[10%] flex justify-center items-center">
                  Receita
                </td>
              ) : (
                <td className="text-red-500 font-semibold w-[10%] flex justify-center items-center">
                  Despesa
                </td>
              )}
              <td className="w-[10%] flex justify-center items-center">
                {item.description}
              </td>
              <td className="w-[10%] flex justify-center items-center">
                R${' '}
                {item.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </td>
              {item.type == 0 ? (
                <td className="w-[10%] flex justify-center items-center">-</td>
              ) : (
                <td className="w-[10%] flex justify-center items-center">
                  {item.installments}
                </td>
              )}

              {item.type == 0 ? (
                <td className="w-[10%] flex justify-center items-center md:hidden">
                  -
                </td>
              ) : (
                <td className="w-[10%] flex justify-center items-center md:hidden">
                  {item.installments}x
                </td>
              )}
              <td className="w-[10%] flex justify-center items-center">
                {convertDate(item.created_at)}
              </td>
              <td className="w-[10%] flex justify-center items-center">
                {convertDate(item.dateEnd)}
              </td>
              <td className="w-[15%] flex justify-center items-center gap-3 lg:gap-1 md:flex-col">
                <Dialog.Root
                  className="w-[30%] h-[30%]"
                  isOpen={isOpen}
                  Open={
                    <Button
                      onClick={handleOpenModal}
                      className="bg-red-500 hover:bg-red-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                    >
                      Excluir
                    </Button>
                  }
                >
                  <Dialog.Title>Certeza que deseja excluir?</Dialog.Title>
                  <Dialog.Content>
                    <div>
                      <h3>Tipo entrada:</h3>
                      {item.type == 0 ? (
                        <span className=" font-semibold">Receita</span>
                      ) : (
                        <span className="font-semibold">Despesa</span>
                      )}
                      <h3>Valor:</h3>
                      <span>
                        R${' '}
                        {item.value.toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}
                      </span>
                    </div>
                    <div className="flex gap-5">
                      <Button
                        onClick={() => toLeadDelet(item.id)}
                        className="bg-green-200"
                      >
                        Confirmar
                      </Button>
                      <Button onClick={handleOpenModal} className="bg-red-200">
                        Cancelar
                      </Button>
                    </div>
                  </Dialog.Content>
                  <Dialog.Close isOpen={handleOpenModal}></Dialog.Close>
                </Dialog.Root>
                <Button className="bg-orenge-500 hover:bg-orenge-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 ">
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
