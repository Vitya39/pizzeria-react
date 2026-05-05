const navbarHtml = `
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <a class="navbar-brand" href="index.html">Főoldal</a>
    <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"
        data-toggle="collapse" data-target="#collapsibleNavbar"
        aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="react/react-crud/dist/index.html">React CRUD</a></li>
            <li class="nav-item"><a class="nav-link" href="javascript.html">Java CRUD</a></li>
            <li class="nav-item"><a class="nav-link" href="react/dist/index.html">SPA</a></li>
            <li class="nav-item"><a class="nav-link" href="fetchapi.html">Fetch API</a></li>
            <li class="nav-item"><a class="nav-link" href="axios.html">Axios</a></li>
            <li class="nav-item"><a class="nav-link" href="oojs.html">OOJS</a></li>
        </ul>
    </div>
</nav>
`;

const navbarStyle = `
.navbar {
    background-color: rgba(0, 0, 0, 0.8) !important;
}

.nav-link {
    color: #fff !important;
}

.nav-link:hover {
    color: #ffc107 !important;
}
`;

function insertSharedNavbar() {
    if (!document.getElementById('shared-navbar-style')) {
        const style = document.createElement('style');
        style.id = 'shared-navbar-style';
        style.textContent = navbarStyle;
        document.head.appendChild(style);
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHtml;

    const jumbotron = document.querySelector('.jumbotron');
    if (jumbotron && jumbotron.parentNode) {
        jumbotron.parentNode.insertBefore(wrapper, jumbotron.nextSibling);
    } else {
        document.body.insertBefore(wrapper, document.body.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', insertSharedNavbar);
