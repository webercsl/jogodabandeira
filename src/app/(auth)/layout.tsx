interface AuthNavbarProps {
    children: React.ReactNode;
};

const AuthNavbar = ({ children }: AuthNavbarProps) => {
    return ( 
        <div>
            <h1>Auth Navbar</h1>
            {children}
        </div>
    );
}

export default AuthNavbar;