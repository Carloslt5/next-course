import { getPaginatedUsers } from "@/actions/users/get-paginated-users";
import { Title } from "@/components/ui/Title";
import { UsersTable } from "@/components/users/UsersTable";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const { status, users = [] } = await getPaginatedUsers();
  if (!status) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All Users" />

      <div className="mb-10">
        <UsersTable users={users} />
        {/* Add Pagination */}
      </div>
    </>
  );
}
