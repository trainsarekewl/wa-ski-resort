import './ResortCard.css';

export interface Resort {
    id: string;
    resortName: string;
    state: string;
    country: string;
    reportDateTime: string;
    resortStatus: string;
    operatingStatus: string;
    resortType: string;
    primarySurfaceCondition: string;
    newSnowMin: string;
    newSnowMax: string;
    snowLast48Hours: string;
    snowComments: string;
    avgBaseDepthMin: string;
    avgBaseDepthMax: string;
    openDownHillTrails: string;
    openDownHillLifts: string;
    openDownHillMiles: string;
    openDownHillAcres: string;
    openDownHillPercent: string;
    nightSkiing: string;
    weekendHours: string;
    weekdayHours: string;
    maxOpenDownHillTrails: string;
    maxOpenDownHillMiles: string;
    maxOpenDownHillAcres: string;
    maxOpenDownHillLifts: string;
    terrainParkOpen: string;
    terrainParkLocation: string;
    numberTerrainParksOpen: string;
    numberTerrainParkFeatures: string;
    covidMaskRequired: string;
    covidUpdatedOn: string;
    covidSocialDistancingRequired: string;
    covidSanitizationStationsAvailable: string;
    covidPassProtection: string;
    covidReservationsRequired: string;
    covidPrePurchaseDayLiftTicketsRecommended: string;
    resortCovidPage: string;
    covidPassProtectionPage: string;
    covidReservationsRequiredPage: string;
    weatherToday_Condition: string | null;
    weatherTomorrow_Condition: string | null;
    weatherDayAfterTomorrow_Condition: string | null;
    weatherDay4_Condition: string | null;
    weatherDay5_Condition: string | null;
    weatherToday_WindDirection: string | null;
    weatherTomorrow_WindDirection: string | null;
    weatherDayAfterTomorrow_WindDirection: string | null;
    weatherDay4_WindDirection: string | null;
    weatherDay5_WindDirection: string | null;
    SnoCountryResortLink: string;
    tnTrailMapURL: string;
    lgTrailMapURL: string;
    logo: string;
    timezone: string;
    resortAddress: string;
    maxXCSkiTrails: string;
    "Parks-n-Pipes": string;
    "Parks-n-Pipes-Available": string;
}

export default function ResortCard( {resort}: { resort: Resort} ) {
    return (<div className="resort-card">
        <h2 id="resort-name">{resort.resortName}</h2>
    </div>)
}