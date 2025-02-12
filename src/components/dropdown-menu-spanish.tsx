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


export const DropdownMenuButtonSpanish = () => {
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
                                <DropdownMenuLabel>Cómo jugar</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Cómo jugar</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                El juego consiste en adivinar correctamente la bandera del país mostrado.
                                Verá una imagen de una bandera y se le pedirá que elija entre cuatro opciones de nombres de países.
                                <br /><br />
                                <strong>- Para empezar:</strong> Haga clic en <i>"Jugar"</i>.<br />
                                <strong>- Puntos:</strong> ¡Cuanto más rápido respondas correctamente, más puntos ganarás!<br />
                                <strong>- Fin del juego:</strong> Si cometes un error, el juego termina y se registrará tu puntuación final.
                                <br /><br />
                                ¡Después de que termine el partido, se generará un enlace para que puedas compartir tu puntuación con tus amigos!
                                <br /><br />
                                ¡Buena suerte y diviértete!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Cerrar
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
                            <DialogTitle className="text-3xl font-bold">Ranking de Puntuación</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                ¡El juego tiene un <strong>ranking de puntuación</strong> donde puedes competir con otros jugadores!
                                Para que tu puntuación quede registrada y aparezca en el ranking, simplemente inicia sesión con tu <strong>cuenta de Google</strong>.
                                <br /><br />
                                <strong>¿Por qué utilizamos la cuenta de Google?</strong><br />
                                - Rápido y seguro.<br />
                                - No es necesario crear nuevas contraseñas.<br />
                                - Sólo se almacenará tu puntuación.
                                <br /><br />
                                ¡Demuestra tus habilidades e intenta llegar a lo más alto del ranking!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Cerrar
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
                            Este juego fue desarrollado por:
                                <br /><br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/08705cce-2ab0-4816-867f-95902c654af1" alt="Foto de Gustavo Weber" />
                                    <div className="font-medium dark:text-white">
                                        <div>Gustavo Weber</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Estudiante de Ingeniería en Computación</div>
                                    </div>
                                </div>
                                <br />
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="https://curious-fish-513.convex.cloud/api/storage/8210adcb-e13e-4ee2-9f01-6f4a7725f5b7" alt="Foto de Eduardo Motter" />
                                    <div className="font-medium dark:text-white">
                                        <div>Eduardo Motter</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Estudiante de Ciencias de la Computación</div>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Cerrar
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
                                <DropdownMenuLabel>Comentario</DropdownMenuLabel>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-lg p-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Envíanos tus comentarios</DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed">
                                ¡Queremos escuchar tu opinión! Deja tus comentarios aquí y ayúdanos a mejorar el juego.
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
                                <Label htmlFor="feedback" className="text-lg font-semibold">Tu mensaje</Label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    rows={4}
                                    required
                                    className="w-full border rounded-md p-4 text-lg"
                                    placeholder="Escribe tus comentarios aquí..."
                                />
                                <Button type="submit" className="text-lg px-6 py-3 hover:bg-slate-300 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    Enviar Comentarios
                                </Button>
                            </div>
                        </form>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-lg px-6 py-3">
                                    Cerrar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
