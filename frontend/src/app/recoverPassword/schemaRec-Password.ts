import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const recoverPasswordSchema = () => {
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: 'Por gentileza informe um email' })
      .email({ message: 'Por gentileza informe um email valido' })
  });

  type formDataProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<formDataProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: ''
    }
  });

  return { handleSubmit, register, errors, schema };
};
