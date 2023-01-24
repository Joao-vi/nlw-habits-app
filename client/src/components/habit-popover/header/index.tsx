export const Header = () => (
  <header className="flex flex-col gap-2 [&>h1]:leading-[1] [&>span]:leading-[1]">
    <span className="text-zinc-400 font-medium">terça-feira</span>
    <h1 className="font-bold text-2xl">03/01</h1>
    <HabitsProgress />
  </header>
);

const HabitsProgress = () => {
  return (
    <div className="w-[200px] relative h-2 rounded-2xl bg-zinc-700 overflow-hidden">
      <div className="absolute h-full w-[50%] left-0 bg-violet-600" />
    </div>
  );
};
