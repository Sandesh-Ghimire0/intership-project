export const dynamic = "force-dynamic";

import { fetchMyActivities } from "@/features/activity/api/api";
import MyActivityList from "@/features/activity/components/MyActivityList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyActivity = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        redirect("/login");
    }
    const logs = await fetchMyActivities(token);

    if (!logs) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the My Activity data
                </h1>
            </div>
        );
    }

    return <MyActivityList initialData={logs} />;
};

export default MyActivity;
