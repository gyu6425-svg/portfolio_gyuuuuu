import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NAV_ITEMS = [
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

export const Header = memo(function Header() {
    const headerDark = useSelector((state) => state.ui.headerDark);
    const location = useLocation();

    const logoStyle = {
        fontFamily: 'Alkatra, cursive',
        fontSize: '30px',
        fontWeight: 400,
        lineHeight: 'normal',
        color: headerDark ? '#FFF' : '#000',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    };

    const navContainerStyle = {
        display: 'flex',
        height: '60px',
        padding: '8px 30px',
        alignItems: 'center',
        gap: '40px',
        borderRadius: '40px',
        background: headerDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.02)',
        transition: 'background 0.3s ease',
    };

    const chipStyle = {
        display: 'flex',
        width: '90px',
        height: '44px',
        padding: '0 10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '20px',
        fontFamily: 'Alkatra, cursive',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: 'normal',
        color: headerDark ? '#FFF' : '#000',
        textDecoration: 'none',
        transition: 'color 0.3s ease, background 0.2s ease',
    };

    return (
        <header className="w-full flex items-center justify-between">
            <Link to="/home" style={logoStyle}>
                GYUU
            </Link>

            <nav style={navContainerStyle}>
                {NAV_ITEMS.map(({ label, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            style={{
                                ...chipStyle,
                                color: isActive ? '#DB6C1B' : chipStyle.color,
                            }}
                            className={isActive ? '' : 'hover:bg-[#DB6C1B] hover:!text-black'}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
});
