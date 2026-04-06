import React from "react";

const Loading = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div
                    v-for="i in 4"
                    className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-4 animate-pulse"
                >
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-8"></div>
                    <div className="flex items-center justify-between">
                        <div className="w-48 h-48 border-8 border-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-32 h-32 border-8 border-gray-50 rounded-full"></div>
                        </div>
                        <div className="space-y-4 w-1/4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div className="h-3 bg-gray-100 rounded w-full"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div className="h-3 bg-gray-100 rounded w-full"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div className="h-3 bg-gray-100 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4 mb-10"></div>

                    <div className="flex items-end justify-around h-48 px-4 border-b border-gray-100">
                        <div className="w-16 bg-gray-200 rounded-t-md h-1/3"></div>
                        <div className="w-16 bg-gray-200 rounded-t-md h-1/3"></div>
                        <div className="w-16 bg-gray-300 rounded-t-md h-2/3"></div>
                    </div>
                    <div className="flex justify-around mt-4">
                        <div className="h-3 bg-gray-100 rounded w-12"></div>
                        <div className="h-3 bg-gray-100 rounded w-12"></div>
                        <div className="h-3 bg-gray-100 rounded w-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
