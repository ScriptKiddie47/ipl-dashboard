import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MatchDetailedCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

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
        }, []
    );


    return (
        <div className="MatchPage">
            <h1>MatchPage</h1>
            {
                matches.map(match =>
                    <MatchDetailedCard teamName={teamName} match={match} />)
            }
        </div>
    );
}