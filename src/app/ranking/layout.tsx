interface RankingLayoutProps {
    children: React.ReactNode;
};

const RankingLayout = ({ children }: RankingLayoutProps) => {
    return ( 
        <div>
            {children}
        </div>
    );
}

export default RankingLayout;