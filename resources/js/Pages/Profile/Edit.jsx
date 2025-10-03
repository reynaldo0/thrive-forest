import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-900">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    {/* Profile Information */}
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-100">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password */}
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-100">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account */}
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-100">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
