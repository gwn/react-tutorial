const
    React = require('react'),
    {createRoot} = require('react-dom/client'),

    App = () =>
        <div>
            <p>
                naber lan asdf
            </p>
        </div>

createRoot(document.getElementById('app'))
    .render(<App />)
