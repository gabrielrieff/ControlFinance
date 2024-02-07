import { useContext } from 'react';
import { Button } from '../shadcn/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../shadcn/dialog';
import { AuthContext } from '~/context/auth/authContext';

interface data {
  type: number;
  value: string;
  id: string;
}
interface modelDeleteInvoiceProps {
  data: data;
}

export const ModelDeleteInvoice = ({ data }: modelDeleteInvoiceProps) => {
  const { deleteInvoice } = useContext(AuthContext);

  const isDelet = async (id: string) => {
    deleteInvoice(id);
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex items-start gap-4">
        <DialogTitle>Excluir uma transação</DialogTitle>

        <div className="flex flex-col items-start gap-3">
          <h3>
            Tipo de transação:{' '}
            {data.type == 0 ? (
              <span className="text-green-600 font-bold">Receita</span>
            ) : (
              <span className="text-red-600 font-bold">Despesa</span>
            )}
          </h3>

          <span>
            Valor:{' '}
            <span className="text-yellow-400 font-bold">R$ {data.value}</span>
          </span>
        </div>
      </DialogHeader>

      <DialogFooter className="flex gap-3 justify-center flex-row">
        <DialogClose asChild>
          <Button type="button" variant={'destructive'}>
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-green-900"
          onClick={() => isDelet(data.id)}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
