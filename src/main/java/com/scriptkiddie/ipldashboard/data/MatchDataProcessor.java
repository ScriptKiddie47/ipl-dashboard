package com.scriptkiddie.ipldashboard.data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.scriptkiddie.ipldashboard.model.Match;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

//ItemProcessor takes 2 Parameters -> Input Type and Output Type
public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {
    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

    @Override
    public Match process(final MatchInput matchInput) throws Exception {
        Match match = matchTransformer(matchInput);
        return match;
    }

	/**
	 * @param matchInput
	 * @return Match
	 */
	private Match matchTransformer(MatchInput matchInput) {
		Match match = new Match();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");

		match.setId(Long.parseLong(matchInput.getId()));
		match.setCity(matchInput.getCity());
		match.setDate(LocalDate.parse(matchInput.getDate(), formatter));
		match.setPlayerOfMatch(matchInput.getPlayer_of_match());
		match.setVenue(matchInput.getVenue());
		match.setTossWinner(matchInput.getToss_winner());
		match.setTossDecision(matchInput.getToss_decision());
		match.setResult(matchInput.getResult());
		match.setResultMargin(matchInput.getResult_margin());
		match.setUmpire1(matchInput.getUmpire1());
		match.setUmpire2(matchInput.getUmpire2());
		match.setMatchWinner(matchInput.getWinner());
		
		setTeam1andTeam2(matchInput, match);
		return match;
	}

    /**
     * Set Team 1 and Team 2 Depending on Innings order If the toss decision is Bat
     * then 1st Innings team is a Toss winner. If the toss decision is filed the 2nd
     * Innings Team is a toss winner
     */
    private void setTeam1andTeam2(MatchInput matchInput, Match match) {
        String firstInningsTeam, secondInningsTeam;
        if ("bat".equals(matchInput.getToss_decision())) {
            firstInningsTeam = matchInput.getToss_winner();
            secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2()
                    : matchInput.getTeam1();
        } else {
            secondInningsTeam = matchInput.getToss_winner();
            firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2()
                    : matchInput.getTeam1();
        }
        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);
    }
}

// Note :
// Team 1 and Team 2 will classified based on Toss Result, 1st team to Bat ->
// Team 1