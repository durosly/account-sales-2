'use client';
import { useRouter } from 'next/navigation';

function RedirectC() {
    const router = useRouter();
    router.push('/email-verification/success');
    return (
        <div className="min-h-screen flex justify-center items-center py-10 px-5 ">
            <p className="animate-pulse">Redirecting...</p>
        </div>
    );
}

export default RedirectC;
