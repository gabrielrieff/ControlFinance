import { Input } from '~/components/shared/Input';

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="w-[80%]">
        <h1>Login</h1>
        <Input
          placeholder="texto"
          type="text"
          styleCSS="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-green-500"
        />
      </div>
    </main>
  );
}
