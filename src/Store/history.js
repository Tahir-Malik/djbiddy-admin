// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
// export default history;

// Client code

import { createBrowserHistory } from 'history';
const history = createBrowserHistory({
    // basename: '/latest-build'
});

let lastPath = undefined;
history.listen(function (location) {
    if (location.pathname !== lastPath && history.action === 'PUSH') {
        window.gtag('config', 'UA-139938495-2', {
            page_path: location.pathname + location.search
        });
    }
    lastPath = location.pathname;
});

export default history;
