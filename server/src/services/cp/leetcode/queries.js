const USER_PROFILE_QUERY = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      ranking
      userAvatar
      reputation
      starRating
      aboutMe
      school
      countryName
      company
      jobTitle
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

const USER_CONTEST_QUERY = `
query userContestRanking($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }

  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}
`;

module.exports = {
    USER_PROFILE_QUERY,
    USER_CONTEST_QUERY,
};