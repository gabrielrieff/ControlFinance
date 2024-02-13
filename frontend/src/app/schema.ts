import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useFormSchema = () => {
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: 'Por gentileza informe um email' })
      .email({ message: 'Por gentileza informe um email valido' }),
    password: z.string().min(1, { message: 'Por gentileza forneça uma senha' })
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
      email: '',
      password: ''
    }
  });

  return { handleSubmit, register, schema, errors };
};
