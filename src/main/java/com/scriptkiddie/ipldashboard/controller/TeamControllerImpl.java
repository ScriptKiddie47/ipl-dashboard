package com.scriptkiddie.ipldashboard.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scriptkiddie.ipldashboard.model.Team;
import com.scriptkiddie.ipldashboard.repository.MatchRepository;
import com.scriptkiddie.ipldashboard.repository.TeamRepository;

@RestController
@CrossOrigin
public class TeamControllerImpl {

	@Autowired
	private TeamRepository teamRepository;
	@Autowired
	private MatchRepository matchRepository;

	@RequestMapping(value = "/team/{teamName}", method = RequestMethod.GET)
	public ResponseEntity<?> getTeam(@PathVariable String teamName) {
		Team team = teamRepository.findByTeamName(teamName);
		team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4 ));
		return ResponseEntity.ok(team);
	}
	
	@RequestMapping(value = "/team/{teamName}/matches", method = RequestMethod.GET)
	public ResponseEntity<?> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year) {
		LocalDate dateStart = LocalDate.of(year, 1, 1);
		LocalDate dateEnd = LocalDate.of(year + 1, 1, 1);
		return ResponseEntity.ok(
				matchRepository.getMatchesByTeamBetweenDates(teamName, dateStart, dateEnd));
	}
}
