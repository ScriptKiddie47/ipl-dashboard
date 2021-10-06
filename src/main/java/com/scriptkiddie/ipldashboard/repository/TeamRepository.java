package com.scriptkiddie.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import com.scriptkiddie.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
	Team findByTeamName(String teamName);
}
