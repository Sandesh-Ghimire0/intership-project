import TaskCardSkeleton from "@/features/tasks/components/TaskCardSkeleton";
import React from "react";

const Loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <TaskCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default Loading;
