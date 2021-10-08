import { React } from 'react'
import { Link } from 'react-router-dom';

export const MatchDetailedCard = ({ match, teamName }) => {
    if (!match) return null;
    console.log(teamName);
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1
    const otherTeamRoute = `/teams/${otherTeam}`
    return (
        <div className="MatchDetailedCard">
            <h3>Latest Matches</h3>
            <h4>Match Details</h4>
            <h1>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <h2>{match.date}</h2>
            <h3>at {match.venue}</h3>
            <h3>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
        </div>
    );
}