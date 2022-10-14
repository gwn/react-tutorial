const
    {createServer} = require('http'),
    {parse: urlParse} = require('url')

let hobbies = ['art', 'music', 'code']

createServer((req, res) => {
    const
        {method, url} = req,
        {pathname, query} = urlParse(url, {query: true}),
        routeName = method + ' ' + pathname,
        routeHandler = routes[routeName]

    req.query = query

    res.setHeader('Access-control-allow-origin', '*')

    return routeHandler(req, res)
})
    .listen({host: 'localhost', port: 5000})

const routes = {
    'GET /': (req, res) => {
        res
            .writeHead(200, {'content-type': 'application/json'})
            .end(JSON.stringify(hobbies))
    },

    'GET /add': (req, res) => {
        hobbies.push(req.query.hobbyName)
        res.writeHead(201).end('oldu')
    },

    'GET /remove': (req, res) => {
        hobbies = hobbies.filter(h => h != req.query.hobbyName)
        res.writeHead(204).end(null)
    },
}
