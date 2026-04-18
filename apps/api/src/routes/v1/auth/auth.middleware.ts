import dotenv from "dotenv";
dotenv.config();

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../user/user.model.js";

type DoneCallback = (msg: any, user: any) => void;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google environment variables not found");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: DoneCallback,
        ) => {
            try {
                const user = (await User.findOneAndUpdate(
                    { googleId: profile.id },
                    {
                        $setOnInsert: {
                            googleId: profile.id,
                            username: profile.displayName,
                            email: profile.emails?.[0]?.value,
                        },
                    },
                    { upsert: true, new: true, runValidators: true },
                )) as any;

                const token = user.generateAccessToken();

                // Just return the user you already have
                return done(null, { user, token });
            } catch (error) {
                console.log("oauth middleware error ", error);
                return done(error, null);
            }
        },
    ),
);

export default passport;
