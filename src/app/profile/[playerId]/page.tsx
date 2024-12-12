import Link from "next/link";

interface PlayerProfileProps {
    params: Promise<{ playerId: string }>;
}

const playerProfile = async ({ params }: PlayerProfileProps) => {
    const { playerId } = await params;
    
    return ( 
        <div className="min-h-screen flex flex-col justify-center items-center">
            Player ID: {playerId}
            Voltar para <Link className="text-lg text-gray-900 font-bold" href="/">Página Inicial</Link>
        </div>
    );
}

export default playerProfile;