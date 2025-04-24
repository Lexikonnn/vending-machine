import Navigation from "../components/navigation/Navigation";

const MainLayout = ({ children }) => {
    return (
        <main>
            <div className="sidebar">
                <Navigation />
            </div>
            {children}
        </main>
    );
}

export default MainLayout;