import { React, useEffect, useState } from 'react'
import { TeamTile } from '../components/TeamTile';
import './homePage.scss';
export const HomePage = () => {

    const [teams, setTeams] = useState([])
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                setTeams(data);
            };
            fetchAllTeams();
        }, []
    );

    return (
        <div className="home-page">
            <div className="header-section">
                <h1 className="app-name">ipl-dashboard</h1>
            </div>
            <div className="team-grid">
                {
                    teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)
                }
            </div>
        </div>
    );
}

//export default teamPage;
//Specfic Export as to whomever importing it has to specify the name
// function teamPage() { will be changed to export const TeamPage = () => {