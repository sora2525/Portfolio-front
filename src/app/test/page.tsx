'use client';
import { useSession } from 'next-auth/react';
import Login from '@/components/Login';
import Logout from '@/components/Logout';

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<div className='pointer-events-auto flex flex-col justify-center items-center h-screen'>
			{status === 'authenticated' ? (
				<div>
					<p>セッションの期限：{session.expires}</p>
					<p>ようこそ、{session.user?.name}さん</p>
					<img
						src={session.user?.image ?? ``}
						alt=""
						style={{ borderRadius: '50px' }}
					/>
					<div>
						<Logout />
					</div>
				</div>
			) : (
				<Login />
			)}
		</div>
	);
}
