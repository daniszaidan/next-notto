import { CheckIcon } from '@heroicons/react/24/solid';
import ButtonTitle from './ButtonTitle';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center gap-25">
      <div className="flex flex-col gap-5">
        <h1 className="text-[25px] font-bold">To-Do List</h1>
        <p className="text-[20px] text-foreground/70">Kelola tugas dengan mudah</p>
      </div>
      <ButtonTitle title="Checklist" icon={<CheckIcon />} href="/" />
    </nav>
  );
}
