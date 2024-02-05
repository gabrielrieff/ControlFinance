import { MutableRefObject, useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../shadcn/select';

interface selectInstallmentsProps {
  refInstallments: MutableRefObject<HTMLButtonElement | null>;
}

export const SelectInstallments = ({
  refInstallments
}: selectInstallmentsProps) => {
  const [sel, setSel] = useState('');

  const installments = [
    { id: '1', parcela: '1x', valor: 1 },
    { id: '2', parcela: '2x', valor: 2 },
    { id: '3', parcela: '3x', valor: 3 },
    { id: '4', parcela: '4x', valor: 4 },
    { id: '5', parcela: '5x', valor: 5 },
    { id: '6', parcela: '6x', valor: 6 },
    { id: '7', parcela: '7x', valor: 7 },
    { id: '8', parcela: '8x', valor: 8 },
    { id: '9', parcela: '9x', valor: 9 },
    { id: '10', parcela: '10x', valor: 10 },
    { id: '11', parcela: '11x', valor: 11 },
    { id: '12', parcela: '12x', valor: 12 }
  ];

  return (
    <Select>
      <SelectTrigger className="col-span-3" ref={refInstallments}>
        <SelectValue placeholder="Selecione em quantas parcelas" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="h-max-[100px]">
          {installments.map((installment) => (
            <SelectItem value={installment.id} key={installment.id}>
              <div
                data-value={installment.valor}
                className="flex flex-row items-center gap-2"
              >
                <span>{installment.parcela}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
