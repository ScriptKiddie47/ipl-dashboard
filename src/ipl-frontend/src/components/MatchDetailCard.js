import { React } from 'react'
import { Link } from 'react-router-dom';
import './MatchDetailCard.scss'

export const MatchDetailedCard = ({ match, teamName }) => {
    if (!match) return null;
    console.log(teamName);
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1
    const otherTeamRoute = `/teams/${otherTeam}`
    const isMatchWon = teamName === match.matchWinner;

    return (
        <div className={isMatchWon ? ' MatchDetailedCard won-card' : ' MatchDetailedCard lost-card'}>
            <div>
                <span>vs</span>
                <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>

                <h2 className="match-date"> {match.date}</h2>

                <h3 className="match-venue">at {match.venue}</h3>

                <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
            </div>
            <div className="additional-detail">
                <h3>First Innings</h3>
                <p>{match.team1}</p>
                <h3>Second Innings</h3>
                <p>{match.team2}</p>
                <h3>Man of the Match</h3>
                <p>{match.playerOfMatch}</p>
                <h3>Umpires</h3>
                <p>{match.umpire1} , {match.umpire1}</p>
            </div>

        </div>
    );
}