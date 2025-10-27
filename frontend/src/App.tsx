import { useState, useEffect } from 'react'

import './App.css'

import ResortCard from './components/ResortCard.tsx'

function App() {
    const [resorts, setResorts] = useState([]);

    useEffect(() => {
        fetch('http://feeds.snocountry.net/getSnowReport.php?apiKey=SnoCountry.example&states=WA&output=json')
            .then(res => res.json())
            .then(data => {
                const resorts = data.items;
                console.log(resorts);
            });
    }, []);

    return (
        <ResortCard />
    )
}

export default App
