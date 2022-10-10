const
    React = require('react'),
    {createRoot} = require('react-dom/client'),

    App = () =>
        <div>
            <p>
                naber lan yarak
            </p>
        </div>

createRoot(document.getElementById('app'))
    .render(<App />)
