import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MatchDetailedCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    //Need a Explanation on this 
    const [team, setTeam] = useState({ matches: [] });
    const { teamName } = useParams() //Fetched from route call
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
        //Call the Hook when Team Name changes 
        //Earlier [] , now [ teamName ]
    );

    if (!team || !team.teamName) return <h2>Team not Found</h2>

    return (
        <div className="TeamPage">
            <h1>{team.teamName}</h1>

            <MatchDetailedCard teamName={team.teamName} match={team.matches[0]} />

            {team.matches.slice(1).map(match =>
                <MatchSmallCard teamName={team.teamName} match={match} />)}
        </div>
    );
}

//export default teamPage;
//Specfic Export as to whomever importing it has to specify the name
// function teamPage() { will be changed to export const TeamPage = () => {