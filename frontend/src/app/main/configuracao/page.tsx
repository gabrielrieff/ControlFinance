'use client';

import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';

import { AiOutlineUser } from 'react-icons/ai';

export default function Configuracao() {
  const { user, updateUser } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

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

  async function handleDataUser(event: FormEvent) {
    event.preventDefault();
    const date = new Date();
    try {
      const data = new FormData();

      data.append(
        'firstName',
        firstNameRef.current?.value! != ''
          ? firstNameRef.current?.value!
          : user?.firstName!
      );
      data.append(
        'lastName',
        lastNameRef.current?.value! != ''
          ? lastNameRef.current?.value!
          : user?.lastName!
      );
      data.append(
        'email',
        emailRef.current?.value! != '' ? emailRef.current?.value! : user?.email!
      );

      if (imagemAvatar != null) {
        data.append('file', imagemAvatar);
      }

      await updateUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main
      className="flex flex-col justify-start gap-[60px] items-center bg-white-100
      h-full rounded-[20px] p-4"
    >
      <section>
        <h1 className="text-center font-bold text-[20px]">Dados do usuário</h1>
        <form
          onSubmit={handleDataUser}
          autoComplete="off"
          className="flex items-center justify-center gap-10"
        >
          <div>
            {!user?.photo ? (
              <>
                <label htmlFor="input-file">
                  <Input
                    onChange={handleAvatar}
                    accept="image/png, image/jpeg"
                    id="input-file"
                    type="file"
                    className="hidden "
                  />
                  {!avatar ? (
                    <div className="w-[256px] h-[256px] rounded-full bg-grey-300 flex items-center justify-center">
                      <AiOutlineUser size={150} />
                    </div>
                  ) : (
                    <Image
                      alt="Preview"
                      src={avatar}
                      width={256}
                      height={256}
                      className="rounded-full h-[256px] object-cover"
                    />
                  )}
                </label>
                {/* <Button type="submit">Adicionar uma foto</Button> */}
              </>
            ) : (
              <>
                <label htmlFor="input-file">
                  <Input
                    onChange={handleAvatar}
                    accept="image/png, image/jpeg"
                    id="input-file"
                    type="file"
                    className="hidden "
                  />
                  <Image
                    alt={`${user!.firstName} ${user!.lastName}`}
                    src={
                      !avatar
                        ? `http://localhost:3333/files/image/user/${
                            user!.photo
                          }`
                        : avatar
                    }
                    width={256}
                    height={256}
                    className="rounded-full h-[256px] object-cover"
                  />
                </label>
                {/* <Button type="button">Alterar minha foto</Button> */}
              </>
            )}
          </div>
          <div className="gap-4 flex flex-col">
            <label>
              <span>Nome</span>
              <Input
                placeholder={user?.firstName}
                inputref={firstNameRef}
                type="text"
                className="border border-grey-500 bg-grey-300 placeholder:text-black-100"
              />
            </label>
            <label>
              <span>Sobrenome</span>
              <Input
                placeholder={user?.lastName}
                inputref={lastNameRef}
                type="text"
                className="border border-grey-500 bg-grey-300 placeholder:text-black-100"
              />
            </label>
            <label>
              <span>E-mail</span>
              <Input
                placeholder={user?.email}
                inputref={emailRef}
                type="email"
                className="border border-grey-500 bg-grey-300 placeholder:text-black-100"
              />
            </label>

            <Button
              className="bg-green-500 hover:bg-green-400 transition-[.3s]
             text-white-100 font-semibold"
            >
              Salvar os dados do usuário
            </Button>
          </div>
        </form>
      </section>
      <form autoComplete="off" className="flex flex-col gap-3">
        <h1 className="text-center font-bold text-[20px]">Trocar a senha</h1>
        <label>
          <span>Senha antiga</span>
          <Input
            type="password"
            className="border border-grey-500 bg-grey-300"
          />
        </label>
        <div className="flex gap-2">
          <label>
            <span>Nova senha</span>
            <Input
              type="password"
              className="border border-grey-500 bg-grey-300"
            />
          </label>

          <label>
            <span>Confirme a nova senha</span>
            <Input
              type="password"
              className="border border-grey-500 bg-grey-300"
            />
          </label>
        </div>

        <Button
          className="bg-green-500 hover:bg-green-400 transition-[.3s]
             text-white-100 font-semibold"
        >
          Salvar senha
        </Button>
      </form>
    </main>
  );
}
