interface ProfileLayoutPageProps {
    children: React.ReactNode;
};

const ProfileLayoutPage = ({ children }: ProfileLayoutPageProps) => {
    return ( 
        <div>
            <h1>Profile Layout</h1>
            {children}
        </div>
    );
}

export default ProfileLayoutPage;