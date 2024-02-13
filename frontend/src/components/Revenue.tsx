import { Button } from './shadcn/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './shadcn/dialog';

import { Label } from './shadcn/label';
import { Textarea } from './shadcn/textarea';
import { SelectCategories } from './shared/Select-categorias';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { dateInstallments } from '~/Helpers/dateInstallments';
import { InputMoney } from './shared/InputMoney';

interface revenueProps {}

export const Revenue = ({}: revenueProps) => {
  const { AddInvoice } = useContext(AuthContext);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const [valor, setValor] = useState('');
  const [valueCategory, setValueCategory] = useState('');

  const handleCreatedRecipe = (event: FormEvent) => {
    event.preventDefault();

    const value = valueRef.current?.value?.split(' ')[1]!;
    const valueNumber = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    const description = descriptionRef.current?.value;

    if (description === '' || valueCategory === '' || valueNumber < 1) return;

    const dateEnd = dateInstallments(new Date().getMonth() + 1);

    const data = {
      description: description,
      value: valueNumber,
      type: 0,
      installments: 1,
      categoryId: valueCategory,
      dateEnd: dateEnd
    };

    AddInvoice(data);

    if (descriptionRef.current && valueCategory && valueRef.current) {
      descriptionRef.current.value = '';
      valueRef.current.value = 'R$ ';
      setValueCategory('');
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-start">
          <DialogTitle>Adicionar receita</DialogTitle>
          <DialogDescription className="text-left">
            Vamos usar esse campo para adicionar novas receitas ao seu controle
            de finanças.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleCreatedRecipe}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
            <Textarea
              placeholder="Descrição da receita"
              ref={descriptionRef}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoria" className="text-right">
              Categoria
            </Label>

            <SelectCategories
              setValor={setValueCategory}
              valor={valueCategory}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valor" className="text-right">
              Valor
            </Label>
            <InputMoney valueRef={valueRef} setValor={setValor} valor={valor} />
          </div>
        </form>
        <DialogFooter className="flex gap-3 justify-center flex-row">
          <DialogClose asChild>
            <Button type="button" variant={'destructive'}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleCreatedRecipe}
            className="bg-green-900"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
