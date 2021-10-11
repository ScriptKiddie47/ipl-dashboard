import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MatchDetailedCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';
import './matchpage.scss';

export const MatchPage = () => {

    const [matches, setMatches] = useState([])
    const { teamName, year } = useParams() //Fetched from route call
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            };
            fetchMatches();
        }, [teamName, year]
    );


    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName} />
            </div>
            <div>
                <h1 className="page-heading">{teamName} Matches in Year {year}</h1>
                {
                    matches.map(match =>
                        <MatchDetailedCard teamName={teamName} match={match} />)
                }
            </div>
        </div>
    );
}