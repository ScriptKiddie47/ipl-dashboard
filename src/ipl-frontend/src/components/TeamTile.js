import { React } from "react"

export const TeamTile = ({ teamName }) => {
    return (
        <div className="TeamTile">
            <h3>{teamName}</h3>
        </div>
    );
}