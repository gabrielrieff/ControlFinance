import { invoiceProps } from '~/@types/contextTypes';

type OrderDirection = 'asc' | 'desc';

type paramOrder = 'description' | 'category' | 'category' | 'value' | 'type';

export function orderByInvoices(
  array: Array<invoiceProps>,
  param: paramOrder,
  direction: OrderDirection = 'asc'
) {
  const sortOrder = direction === 'asc' ? 1 : -1;

  if (param === 'description' || param === 'category') {
    if (param === 'description') {
      const sort = array
        .slice()
        .sort((a, b) => sortOrder * a.description.localeCompare(b.description));
      return sort;
    }

    if (param === 'category') {
      const sort = array
        .slice()
        .sort(
          (a, b) => sortOrder * a.category.title.localeCompare(b.category.title)
        );
      return sort;
    }
  }

  if (param === 'value' || param === 'type') {
    if (param === 'value') {
      const sort = array.slice().sort((a, b) => sortOrder * a.value - b.value);

      return sort;
    }

    if (param === 'type') {
      const sort = array.slice().sort((a, b) => sortOrder * a.type - b.type);

      return sort;
    }
  }
}
