interface RankingLayoutProps {
    children: React.ReactNode;
};

const RankingLayout = ({ children }: RankingLayoutProps) => {
    return ( 
        <div>
            <h1>Navbar</h1>
            {children}
        </div>
    );
}

export default RankingLayout;