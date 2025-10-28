import './ResortCard.css';

interface Resort {
    id: string;
    resortName: string;
}

export default function ResortCard( {resort}: { resort: Resort} ) {
    return (<div className="resort-card">
        <h2>{resort.resortName}</h2>
    </div>)
}