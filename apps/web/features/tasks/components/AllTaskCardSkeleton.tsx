const AllTaskCardSkeleton = () => {
    return (
        <div className="rounded-lg py-4 px-5 bg-white shadow-sm flex flex-col justify-between gap-3 animate-pulse">
            {/* STATUS & PRIORITY BADGES SKELETON */}
            <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                    <div className="h-7 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* TITLE SKELETON */}
            <div className="h-6 w-3/4 bg-gray-200 rounded mt-2"></div>

            {/* DESCRIPTION SKELETON */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
            </div>
        </div>
    );
};

export default AllTaskCardSkeleton;
