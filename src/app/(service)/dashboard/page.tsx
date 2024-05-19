import { TestComp } from '@/components/test';
import { auth, signOut } from '@/lib/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  const logOut = async () => {
    'use server';
    await signOut({ redirectTo: '/login', redirect: true });
  };

  return (
    <div className="main">
      <h1>홈페이지</h1>
      <form action={ logOut } >
        <div>Wellcome, { session?.user?.name }</div>
        <Link href="/test">go test</Link>
        <button>로그아웃</button>
        <TestComp />
      </form>
    </div>
  );
}
