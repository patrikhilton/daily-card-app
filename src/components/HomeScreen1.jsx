import { useEffect } from "react";

const getTimeGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good Morning';
    }
    if (hour < 17) {
        return 'Good Aftenoon';
    }
    return 'Good Evening';
};

const HomeScreen1 = ({email, username, onLogout}) => {
    const greeting = getTimeGreeting();

    // email as a primary key and load users' saved data
    useEffect(() => {
        if (!email) return;

        const userProgressKey = `mummy_progress_${email}`;
        const savedProgress = localStorage.getItem(userProgressKey);

        if (savedProgress) {
            JSON.parse(savedProgress);
        }
    }, [email]);

    return (
        <section className="home-screen">
            <header className="home-screen__header">
                <h1 className="home-screen__greeting">
                    {greeting}, {username}
                </h1>
            </header>

            <main className="home-screen__content">
                {/* Home or Dashbord content */}
            </main>

            <footer className="home-screen__footer">
                <button
                    type="button"
                    className="home-screen__logout-btn"
                    onClick={onLogout}
                >
                    Log out
                </button>
            </footer>
        </section>
    );
};

export default HomeScreen1;