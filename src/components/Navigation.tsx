'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user } = useAuth();
  console.log('user', user);

  return (
    <nav className="flex justify-between items-center gap-25">
      <div className="flex flex-col gap-5">
        <h1 className="text-[25px] font-bold">To-Do List</h1>
        <p className="text-[20px] text-foreground/70">
          {user
            ? `Selamat datang, ${user.username}!`
            : 'Kelola tugas dengan mudah'}
        </p>
      </div>
      {/* <ButtonTitle
        title="Logout"
        icon={<ArrowLeftStartOnRectangleIcon />}
        href="/"
      /> */}
    </nav>
  );
}
