import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 브라우저가 뒤로가기/앞으로가기 시 자동으로 스크롤 복원하는 것을 막음
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
