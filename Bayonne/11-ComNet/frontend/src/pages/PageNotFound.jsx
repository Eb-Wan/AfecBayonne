import { Link } from 'react-router-dom';

const PageNotFound = () => {
    document.title = "Page not found - ComNet";
    return (
        <>
            <h1>Error 404 : Page not found</h1>
            <div className="message error">{window.location.href} does not exist.</div>
            <Link to="/">Back to the home page</Link>
        </>
    );
}

export default PageNotFound;