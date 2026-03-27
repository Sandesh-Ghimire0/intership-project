import ActivityList from "@/features/activity/components/ActivityList";

const Activity = () => {
    // Mock data for your logs
    const logs = [
        {
            id: 1,
            user: "ram_dev",
            action: "updated the task",
            target: "Build UI",
            time: "2 mins ago",
            type: "update",
        },
        {
            id: 2,
            user: "hari_dev",
            action: "deleted the task",
            target: "Deploy to Vercel",
            time: "5 hours ago",
            type: "delete",
        },
        {
            id: 3,
            user: "sita_ux",
            action: "created the task",
            target: "Design System",
            time: "1 day ago",
            type: "create",
        },
    ];

    // return <ActivityList logs={logs} />;
};

export default Activity;
