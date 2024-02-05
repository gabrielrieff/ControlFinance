import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { Button } from './shadcn/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader
} from './shadcn/dialog';
import { AuthContext } from '~/context/auth/authContext';
import { Input } from './shadcn/input';
import { AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';

export const Categories = () => {
  const { categories, createCategori, deleteCategori } =
    useContext(AuthContext);

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
      <DialogContent className="sm:max-w-[425px] max-w-5xl">
        <DialogHeader className="flex items-start">
          <form onSubmit={handleCreateCategori} className="w-full">
            <section className="flex justify-around items-end gap-3 w-full">
              <label htmlFor="input-file">
                <Input
                  onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  id="input-file"
                  type="file"
                  className="hidden "
                />
                {!avatar ? (
                  <div
                    className="w-[100px] h-[100px] rounded-full bg-gray-100
                flex items-center justify-center"
                  >
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

              <label className="w-1/2">
                <span className="flex">Título</span>
                <Input type="text" className="w-full" />
              </label>

              <Button type="submit" className="bg-green-900">
                Salvar
              </Button>
            </section>
          </form>

          <h2 className="text-[20px] font-medium !mt-10 mb-6">
            Lista de categorias
          </h2>

          <table className="w-full">
            <thead className="flex w-full">
              <tr className="flex w-full bg-grey-300 text-center p-1">
                <th className="w-3/4 center">Id</th>
                <th className="w-1/4 center">Título</th>
                <th className="w-1/4 center">Banner</th>
                <th className="w-1/4 center"></th>
              </tr>
            </thead>
            <tbody
              className="flex gap-2 flex-col items-center justify-start
            overflow-y-auto scroll w-full h-[350px]"
            >
              {categories.map((categori) => (
                <tr
                  className="p-1 bg-grey-300 flex w-full mt-4"
                  key={categori.id}
                >
                  <td className="w-3/4 center md:text-xs">{categori.id}</td>
                  <td className="w-1/4 center md:text-xs">{categori.title}</td>
                  <td className="w-1/4 center">
                    <Image
                      alt={categori.title}
                      src={`http://localhost:3333/files/image/category/${categori.banner}`}
                      width={40}
                      height={40}
                      className="rounded-full lg:w-[30px] lg:h-[30px]"
                    />
                  </td>
                  <td className="w-1/4 center">
                    <MdDelete
                      onClick={() => deleteCategori(categori.id)}
                      className="text-red-500 hover:text-red-500/70 
                  cursor-pointer transition-[.3s] text-3xl md:text-2xl"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogHeader>
      </DialogContent>
    </>
  );
};
