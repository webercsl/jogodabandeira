"use client"

import {
    CircleAlert,
    EllipsisVertical,
    MessageCircle,
    CircleHelp,
    ChartNoAxesColumnDecreasing,
    Settings
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export const DropdownMenuButton = () => {
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
                                <DropdownMenuLabel>Como jogar</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Como Jogar</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                O jogo consiste em adivinhar corretamente a bandeira do país apresentada.
                                Você verá uma imagem de uma bandeira e deverá escolher entre quatro opções de nomes de países.
                                <br /><br />
                                <strong>- Para começar:</strong> Clique em <i>"Jogar"</i>.<br />
                                <strong>- Pontos:</strong> Quanto mais rápido você responder corretamente, mais pontos você ganhará!<br />
                                <strong>- Fim de jogo:</strong> Se errar, o jogo termina e sua pontuação final será registrada.
                                <br /><br />
                                Após o término da partida, será gerado um link para você compartilhar sua pontuação com seus amigos!
                                <br /><br />
                                🎯 Boa sorte e divirta-se!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Fechar
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
                            <DialogTitle className="text-3xl font-bold">Ranking de Pontuação</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                O jogo possui um <strong>ranking de pontuação</strong> onde você pode competir com outros jogadores!
                                Para ter sua pontuação registrada e aparecer no ranking, basta fazer login com sua <strong>conta Google</strong>.
                                <br /><br />
                                <strong>Por que usamos a conta Google?</strong><br />
                                - ✅ Rápido e seguro.<br />
                                - ✅ Sem necessidade de criar novas senhas.<br />
                                - ✅ Apenas sua pontuação será armazenada.
                                <br /><br />
                                Mostre suas habilidades e tente alcançar o topo do ranking!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Fechar
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
                                <DropdownMenuLabel>Créditos</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Créditos</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                Este jogo foi desenvolvido por:
                                <br /><br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/08705cce-2ab0-4816-867f-95902c654af1" alt="Foto de Gustavo Weber" />
                                    <div className="font-medium dark:text-white">
                                        <div>Gustavo Weber</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Estudante de Engenharia da Computação</div>
                                    </div>
                                </div>
                                <br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/8210adcb-e13e-4ee2-9f01-6f4a7725f5b7" alt="Foto de Eduardo Motter" />
                                    <div className="font-medium dark:text-white">
                                        <div>Eduardo Motter</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Estudante de Ciências da Computação</div>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Fechar
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
                            <DialogTitle className="text-3xl font-bold">Envie seu Feedback</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                Queremos saber sua opinião! Deixe aqui seu feedback e nos ajude a melhorar o jogo.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const feedbackMessage = formData.get("feedback") as string;
                                window.location.href = `mailto:seuemail@exemplo.com?subject=Feedback%20do%20Jogo&body=${encodeURIComponent(feedbackMessage)}`;
                            }}
                        >
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="feedback" className="text-lg font-semibold">Sua Mensagem</Label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    rows={4}
                                    required
                                    className="w-full border rounded-md p-4 text-lg"
                                    placeholder="Escreva seu feedback aqui..."
                                />
                                <Button type="submit" className="text-lg px-6 py-3 hover:bg-slate-300 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    Enviar Feedback
                                </Button>
                            </div>
                        </form>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Fechar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
