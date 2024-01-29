import { MutableRefObject, useState } from 'react';
import { IoIosArrowDown, IoMdCloseCircle } from 'react-icons/io';
import { Drowdown } from '~/components/shared/Dropdown';

interface selectedInstallmentsProps {
  installmentsRef: MutableRefObject<HTMLDivElement | null>;
}

export const SelectedInstallments = (props: selectedInstallmentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState<JSX.Element | null>(null);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInstallments = (
    installmentsId: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const divHandle = (
      <div
        ref={props.installmentsRef}
        data-value={installmentsId}
        className=""
        dangerouslySetInnerHTML={{ __html: event.currentTarget.innerHTML }}
      />
    );

    setLabel(divHandle);
    setIsOpen(!isOpen);
  };

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

  function handleCleanSelectedInstallments() {
    setLabel(null);
  }

  return (
    <Drowdown.Root>
      <Drowdown.Main onClick={handleDropdown}>
        {label === null ? (
          <span>Parcelas</span>
        ) : (
          <>
            <>{label}</>
            <div
              className="absolute right-9"
              onClick={handleCleanSelectedInstallments}
            >
              <IoMdCloseCircle size={26} className="hover:text-red-200" />
            </div>
          </>
        )}
        <IoIosArrowDown className={`${isOpen ? 'rotate-180' : ''}`} />
      </Drowdown.Main>
      <Drowdown.Content open={isOpen}>
        {installments.map((item) => (
          <span
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleInstallments(item.id, e)
            }
            key={item.id}
            data-value={item.valor}
            className="hover:bg-grey-500 hover:cursor-pointer p-1"
          >
            {item.parcela}
          </span>
        ))}
      </Drowdown.Content>
    </Drowdown.Root>
  );
};
