import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps {
    label?: string;
};

export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-[#c0c0c0] dark:bg-[#15202b]">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
            {label && <p className="text-sm text-muted-foreground">{label}</p>}
        </div>
    );
};