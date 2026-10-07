import './ResortCard.css';

import type {Resort} from "../types/resort.ts";

export default function ResortCard({ resort }: { resort: Resort }) {
    return (
        <div className="resort-card">
            <h2 className="resort-name">{resort.resort}</h2>

            <div className="resort-stats">
                <div>Base: {resort.snowMetrics.baseDepth} in</div>
                <div>24h: {resort.snowMetrics["24hr"]} in</div>
            </div>

            <div className="resort-weather">
                <div>{resort.todaysWeather.currentTemp}°</div>
                <div>{resort.todaysWeather.condition}</div>
            </div>

            {resort.status?.lifts && resort.status?.runs && (
                <div className="resort-status">
                    <div>
                        Lifts: {resort.status.lifts.open}/{resort.status.lifts.total}
                    </div>
                    <div>
                        Runs: {resort.status.runs.open}/{resort.status.runs.total}
                    </div>
                </div>
            )}
        </div>
    );
}