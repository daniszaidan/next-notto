import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/solid';
import ButtonTitle from './ButtonTitle';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center gap-25">
      <div className="flex flex-col gap-5">
        <h1 className="text-[25px] font-bold">Notto</h1>
        <p className="text-[20px] text-foreground/70">A note-taking app</p>
      </div>
      <ButtonTitle title="Login" icon={<ArrowRightIcon />} />
      {/* <ButtonTitle title="Danis" icon={<UserIcon />} /> */}
    </nav>
  );
}
