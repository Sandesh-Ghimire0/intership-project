import { create } from "zustand";
import { IActivity } from "../types/type";

interface ActivityState {
    activities: IActivity[];
    myActivities: IActivity[];
    setActivities: (activities: IActivity[]) => void;
    setMyActivities: (myActivities: IActivity[]) => void;
    addActivity: (activity: IActivity) => void;
    addMyActivity: (myActivity: IActivity) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
    activities: [],
    myActivities: [],
    setActivities: (activities) => set({ activities }),
    setMyActivities: (myActivities) => set({ myActivities }),
    addActivity: (activity) => {
        set((state) => ({
            activities: [activity, ...state.activities],
        }));
    },
    addMyActivity: (myActivity) => {
        set((state) => ({
            myActivities: [myActivity, ...state.myActivities],
        }));
    },
}));
