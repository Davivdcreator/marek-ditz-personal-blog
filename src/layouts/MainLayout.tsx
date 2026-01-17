import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-primary-500/30 selection:text-primary-200">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
