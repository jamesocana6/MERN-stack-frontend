import { useEffect, useState } from "react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index.js";
import Show from "../pages/Show.js";

function Main(props) {
    
    const [ people, setPeople ] = useState(null);
    //const URL = "http://localhost:4000/people";
    const URL = "https://agile-escarpment-89896.herokuapp.com/people/"
    const getPeople = async () => {
        const repsonse = await fetch(URL);
        const data = await repsonse.json();
        setPeople(data);
    }

    const createPeople = async (person) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person)
        })
        //update list of people    
        getPeople();
    }

    const updatePeople = async (person, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person)
        });
        getPeople();
    }

    const deletePeople = async (id) => {
        await fetch(URL + id, {
            method: "DELETE",
        });
        getPeople();
    }

    //works
    //useEffect(() => () => getPeople(), []);
    useEffect(() => {getPeople()}, []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index 
                        people={people}
                        createPeople={createPeople}
                        />
                </Route>
                <Route 
                    path="/people/:id"
                    render={(rp) => (
                        <Show
                        people={people}
                        updatePeople={updatePeople}
                        deletePeople={deletePeople}
                        {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    )
};

export default Main;