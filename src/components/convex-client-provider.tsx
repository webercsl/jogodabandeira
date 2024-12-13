"use client"

import { ReactNode } from "react";
import { Authenticated, Unauthenticated, AuthLoading ,ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { FullscreenLoader } from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk 
                useAuth={useAuth} 
                client={convex}
            >
                {children}
                <AuthLoading>
                    <FullscreenLoader label="Carregando..." />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};