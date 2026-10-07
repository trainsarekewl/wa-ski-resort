import { useEffect, useState } from "react";
import "./App.css";
import ResortCard from "./components/ResortCard";
import Header from "./components/Header";

import type {Resort} from "./types/resort.ts";

type CacheResponse = {
    updatedAt: string | null;
    resorts: any[];
    errors: string[];
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3001";

export function App() {
    const [cache, setCache] = useState<CacheResponse>({
        updatedAt: null,
        resorts: [],
        errors: [],
    });
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setLoadError(null);

                const res = await fetch(`${API_BASE}/api/resorts`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const json = (await res.json()) as CacheResponse;
                if (!cancelled) setCache(json);
            } catch (e: any) {
                if (!cancelled) setLoadError(e?.message ?? "Failed to load");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) return <div>Loading…</div>;
    if (loadError) return <div>Error: {loadError}</div>;

    return (
        <div>
            <Header />
            <div id="container">
                {cache.resorts.map((r: Resort) => (
                    <ResortCard key={r.resort} resort={r} />
                ))}
            </div>
        </div>
    );
}
