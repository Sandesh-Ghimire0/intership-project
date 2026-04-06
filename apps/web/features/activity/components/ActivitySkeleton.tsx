import React from "react";

const ActivitySkeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 md:even:border-l "
                    >
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 bg-gray-100 rounded-lg shrink-0"></div>

                            <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                <div className="h-3 w-28 bg-gray-100 rounded"></div>
                                <div className="h-3 w-20 bg-gray-50 rounded"></div>
                            </div>
                        </div>

                        <div className="pr-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivitySkeleton;
