import Image from 'next/image';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { AiOutlineUser } from 'react-icons/ai';
import { Button } from '../shared/Button';
import { Dialog } from '../shared/Dialog';
import { Input } from '../shared/Input';

import './style.css';

interface CategoriProps {
  closeModal: () => void;
}

export const CategoriModal = ({ closeModal }: CategoriProps) => {
  const { categories, createCategori } = useContext(AuthContext);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const [imagemAvatar, setImagemAvatar] = useState<File | null>(null);
  const [avatar, setAvatar] = useState('');

  async function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImagemAvatar(image);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleCreateCategori(event: FormEvent) {
    event.preventDefault();

    const title = titleRef.current?.value!;

    if (title === '') return;

    try {
      const data = new FormData();

      data.append('title', title);

      if (imagemAvatar != null) {
        data.append('file', imagemAvatar);
      }

      await createCategori(data);

      if (titleRef.current) {
        titleRef.current.value = '';
        setImagemAvatar(null);
        setAvatar('');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Dialog.Title>Adicionar nova categoria</Dialog.Title>
      <Dialog.Content>
        <form onSubmit={handleCreateCategori}>
          <section className="flex justify-around items-end">
            <label htmlFor="input-file">
              <Input
                onChange={handleAvatar}
                accept="image/png, image/jpeg"
                id="input-file"
                type="file"
                className="hidden "
              />
              {!avatar ? (
                <div className="w-[100px] h-[100px] rounded-full bg-grey-300 flex items-center justify-center">
                  <AiOutlineUser size={50} />
                </div>
              ) : (
                <Image
                  alt="Preview"
                  src={avatar}
                  width={100}
                  height={100}
                  className="rounded-full h-[100px] object-cover"
                />
              )}
            </label>

            <label>
              <span>Título</span>
              <Input
                inputref={titleRef}
                type="text"
                className="border border-grey-500 rounded-none placeholder:text-black-100"
              />
            </label>

            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500 w-[30%] rounded-sm font-semibold text-white-100"
            >
              Salvar
            </Button>
          </section>
        </form>

        <h2 className="text-[20px] font-medium mt-6 mb-6">
          Lista de categorias existentes
        </h2>

        <table className="w-full">
          <thead className="flex w-full">
            <tr className="flex w-full bg-grey-300 text-center p-1">
              <th className="w-2/3 center">Id</th>
              <th className="w-1/3 center">Título</th>
              <th className="w-1/3 center">Banner</th>
            </tr>
          </thead>
          <tbody
            className="flex gap-2 flex-col items-center justify-between overflow-y-auto scroll
            w-full h-[350px]"
          >
            {categories.map((categori) => (
              <tr
                className="p-1 bg-grey-300 flex w-full mt-4"
                key={categori.id}
              >
                <td className="w-2/3 center">{categori.id}</td>
                <td className="w-1/3 center">{categori.title}</td>
                <td className="w-1/3 center">
                  <Image
                    alt={categori.title}
                    src={`http://localhost:3333/files/image/category/${categori.banner}`}
                    width={40}
                    height={40}
                    className="rounded-full lg:w-[30px] lg:h-[30px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dialog.Content>
      <Dialog.Close isOpen={closeModal}></Dialog.Close>
    </>
  );
};
