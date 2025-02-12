"use client"

import {
    CircleAlert,
    EllipsisVertical,
    MessageCircle,
    CircleHelp,
    ChartNoAxesColumnDecreasing,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"


export const DropdownMenuButtonEnglish = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer hover:bg-slate-200/10 rounded-full p-2 h-10 w-10">
                <EllipsisVertical className="absolute right-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <Dialog>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <CircleHelp />
                                <DropdownMenuLabel>How to play</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">How to play</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                The game consists of correctly guessing the flag of the country shown.
                                You will see an image of a flag and must choose between four country names.
                                <br /><br />
                                <strong>- To start:</strong> Click in <i>"Play"</i>.<br />
                                <strong>- Scores:</strong> The faster you answer correctly, the more points you will earn!<br />
                                <strong>- End Game:</strong> If you get it wrong, the game is over and your final score will be recorded.
                                <br /><br />
                                After the match ends, a link will be generated for you to share your score with your friends!
                                <br /><br />
                                Good luck and have fun!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <ChartNoAxesColumnDecreasing />
                                <DropdownMenuLabel>Ranking</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Score Ranking</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                The game has a <strong>score ranking</strong> where you can compete with other players!
                                To have your score recorded and appear in the ranking, simply log in with your <strong>Google account</strong>.
                                <br /><br />
                                <strong>Why do we use Google Account?</strong><br />
                                - Fast and secure.<br />
                                - No need to create new passwords.<br />
                                - Only your score will be stored.
                                <br /><br />
                                Show off your skills and try to reach the top of the rankings!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <CircleAlert />
                                <DropdownMenuLabel>Credits</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Credits</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                This game was developed by:
                                <br /><br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/08705cce-2ab0-4816-867f-95902c654af1" alt="Foto de Gustavo Weber" />
                                    <div className="font-medium dark:text-white">
                                        <div>Gustavo Weber</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Computer Engineering Student</div>
                                    </div>
                                </div>
                                <br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/8210adcb-e13e-4ee2-9f01-6f4a7725f5b7" alt="Foto de Eduardo Motter" />
                                    <div className="font-medium dark:text-white">
                                        <div>Eduardo Motter</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Computer Science Student</div>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <MessageCircle />
                                <DropdownMenuLabel>Feedback</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Send your Feedback</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                We want to hear from you! Leave your feedback here and help us improve the game.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const feedbackMessage = formData.get("feedback") as string;
                                window.location.href = `mailto:weber1.caxias@gmail.com?subject=Feedback%20do%20Jogo&body=${encodeURIComponent(feedbackMessage)}`;
                            }}
                        >
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="feedback" className="text-lg font-semibold">Your message</Label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    rows={4}
                                    required
                                    className="w-full border rounded-md p-4 text-lg"
                                    placeholder="Write your feedback here..."
                                />
                                <Button type="submit" className="text-lg px-6 py-3 hover:bg-slate-300 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    Send Feedback
                                </Button>
                            </div>
                        </form>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
