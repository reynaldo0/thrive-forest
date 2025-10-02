import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="">
            <div>
            </div>

            <div className="">
                {children}
            </div>
        </div>
    );
}
