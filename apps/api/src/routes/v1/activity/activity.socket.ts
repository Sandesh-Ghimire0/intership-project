import { io } from "../../../index.js";
import { IActivity } from "../shared/types/type.js";
import { activityService } from "./activity.service.js";

class ActivitySocket {
    initialize() {
        io.on("connection", (socket) => {
            console.log("User connected", socket.id);

            socket.on("activity", (data) => {
                this.handleActivity(data);
            });

            socket.on("disconnect", () => [
                console.log("User disconnected ", socket.id)
            ]);
        });
    }

    private async handleActivity(data: IActivity) {
        console.log(data)
        const activity = await activityService.createNewActivity(data);
        io.emit("activity", activity);
    }
}

export const activitySocket = new ActivitySocket();
