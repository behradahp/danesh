'use client'

import { useEffect } from "react"
import { useRouter } from 'next/navigation';
import authFetch from "@/app/utils/authFetch";

export default function AdminPanel() {
    const router = useRouter();

    useEffect(() => {
        const authCheck = async () => {
            const response = await authFetch("http://localhost:8000/auth/panel/", "GET");
            if(!response?.success) {
                router.replace("/danesh_admin/login")
            }
        }

        authCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return <div></div>
}