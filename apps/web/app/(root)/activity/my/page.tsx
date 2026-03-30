export const dynamic = "force-dynamic";

import MyActivityList from "@/features/activity/components/MyActivityList";
import { serverFetch } from "@/lib/serverFetch";

const MyActivity = async () => {
    const res = await serverFetch("/api/v1/activity/my");

    if (!res.data) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the My Activity data
                </h1>
            </div>
        );
    }

    return <MyActivityList initialData={res.data} />;
};

export default MyActivity;
