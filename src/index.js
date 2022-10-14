const
    React = require('react'),
    {useState, createContext, useContext, useCallback, useEffect} = require('react'),
    {QueryClient, QueryClientProvider, useQuery} = require('react-query'),
    {createRoot} = require('react-dom/client'),

    noop = () => {},

    queryClient = new QueryClient(),

    HobbiesContext = createContext(),

    App = () =>
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>,

    Home = () => {
        const
            listHobbiesQ = useQuery('hobbies', () =>
                fetch('http://localhost:5000').then(resp => resp.json())),

            handleHobbyAdd = useCallback(newHobbyName =>
                setHobbies([...hobbies, newHobbyName])),

            handleHobbyRemove = useCallback(hobbyName =>
                setHobbies(hobbies.filter(h => h != hobbyName)))

        return <HobbiesContext.Provider
            value={{
                value: listHobbiesQ.data,
                add: handleHobbyAdd,
                remove: handleHobbyRemove,
            }}
        >
            {listHobbiesQ.isLoading && 'Loading'}

            {listHobbiesQ.isSuccess && <>
                <Naber
                    name='fasulye'
                    age={15}
                    onGreet={name => alert('Naber ' + name)}
                />

                <Maber />
            </>}
        </HobbiesContext.Provider>
    },

    Maber = ({}) => {
        const hobbiesCtx = useContext(HobbiesContext)

        return JSON.stringify(hobbiesCtx.data)
    },

    Naber = ({
        name,
        age,
        onGreet = noop,
    }) => {
        const
            hobbiesCtx = useContext(HobbiesContext),
            [newHobby, setNewHobby] = useState('')

        return <>
            <p>naber lan {name}</p>

            <p>Age is {age}</p>

            <section>
                Hobbies are:

                <ul>{hobbiesCtx.value.map(hobbyName =>
                    <li key={hobbyName}>
                        {hobbyName}
                        &nbsp;-&nbsp;
                        <button
                            children='Remove'
                            onClick={() => hobbiesCtx.remove(hobbyName)}
                        />
                    </li>
                )}</ul>

                <input
                    placeholder='Add hobby'
                    value={newHobby}
                    onChange={e => setNewHobby(e.target.value)}
                />

                <button
                    onClick={() => {
                        hobbiesCtx.add(newHobby)
                        setNewHobby('')
                    }}
                    children='Add'
                />
            </section>

            <p>
                <button
                    children='Greet'
                    onClick={() => onGreet(name)}
                />
            </p>
        </>
    }

    // App = () => {
    //     const
    //         [hobbies, setHobbies] = useState([]),

    //         handleHobbyAdd = newHobbyName =>
    //             setHobbies([...hobbies, newHobbyName]),

    //         handleHobbyRemove = hobbyName =>
    //             setHobbies(hobbies.filter(h => h != hobbyName))

    //     return <div>
    //         <Naber
    //             name='fasulye'
    //             age={15}
    //             onGreet={name => alert('Naber ' + name)}
    //             hobbies={hobbies}
    //             onHobbyAdd={handleHobbyAdd}
    //             onHobbyRemove={handleHobbyRemove}
    //         />

    //         <Maber hobbies={hobbies} />
    //     </div>
    // },

    // Maber = ({hobbies}) =>
    //     JSON.stringify(hobbies),

    // Naber = ({
    //     name,
    //     age,
    //     onGreet = noop,
    //     hobbies = [],
    //     onHobbyAdd = noop,
    //     onHobbyRemove = noop,
    // }) => {
    //     const [newHobby, setNewHobby] = useState('')

    //     return <>
    //         <p>naber lan {name}</p>

    //         <p>Age is {age}</p>

    //         <section>
    //             Hobbies are:

    //             <ul>{hobbies.map(hobbyName =>
    //                 <li key={hobbyName}>
    //                     {hobbyName}
    //                     &nbsp;-&nbsp;
    //                     <button
    //                         children='Remove'
    //                         onClick={() => onHobbyRemove(hobbyName)}
    //                     />
    //                 </li>
    //             )}</ul>

    //             <input
    //                 placeholder='Add hobby'
    //                 value={newHobby}
    //                 onChange={e => setNewHobby(e.target.value)}
    //             />

    //             <button
    //                 onClick={() => {
    //                     onHobbyAdd(newHobby)
    //                     setNewHobby('')
    //                 }}
    //                 children='Add'
    //             />
    //         </section>

    //         <p>
    //             <button
    //                 children='Greet'
    //                 onClick={() => onGreet(name)}
    //             />
    //         </p>
    //     </>
    // }


createRoot(document.getElementById('app'))
    .render(<App />)
