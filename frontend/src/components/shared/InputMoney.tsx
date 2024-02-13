import { ChangeEvent, MutableRefObject, useEffect } from 'react';
import { Input } from '../shadcn/input';

interface inputMaskRealProps {
  valor: string;
  setValor: (valor: string) => void;
  valueRef: MutableRefObject<HTMLInputElement | null>;
}

export const InputMoney = ({
  valor,
  setValor,
  valueRef
}: inputMaskRealProps) => {
  const formatarValor = (valor: string) => {
    const str = valor.indexOf('R$');
    if (str !== -1) {
      return `R$ `;
    } else {
      return `R$ ${valor}`;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value.replace(/[^0-9,.]/g, '');

    const ultimoCaractere = event.target.value.slice(-1);
    if (ultimoCaractere.match(/[A-Za-z]/)) {
      const str = event.target.value.slice(0, -1);
      setValor(str);
    } else {
      setValor(novoValor);
    }
  };

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.value = formatarValor(valor);
    }
  }, [valor]);

  return (
    <Input
      id="valor"
      value={valor}
      ref={valueRef}
      type="text"
      onChange={handleInputChange}
      className="col-span-3"
    />
  );
};
