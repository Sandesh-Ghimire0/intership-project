import { create } from "zustand";
import { IActivity } from "../types/type";

interface ActivityState {
    activities: IActivity[];
    setActivities: (activities: IActivity[]) => void;
    setMyActivities: (activities: IActivity[]) => void;
    addActivity: (activity: IActivity) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
    activities: [],
    setActivities: (activities) => set({ activities }),
    setMyActivities: (activities) => set({ activities }),
    addActivity: (activity) => {
        set((state) => ({
            activities: [activity, ...state.activities],
        }));
    },
}));
