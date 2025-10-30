import { useState, useEffect } from 'react'

import './App.css'

import ResortCard from './components/ResortCard.tsx'
import Header from './components/Header.tsx'

import data from './sampleFile.json'

export function App() {
    const watchlist = data.items;

    return (
        <div>
            <Header />
            <div id="container">
                {watchlist.map((r) => (
                    <ResortCard key={r.id} resort={r} />
                ))}
            </div>
        </div>
    )
}



