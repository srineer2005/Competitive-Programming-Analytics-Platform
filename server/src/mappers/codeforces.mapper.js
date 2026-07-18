const mapCodeforcesProfile = (profile) => {
    return {
        handle: profile.handle,
        rating: profile.rating,
        maxRating: profile.maxRating,
        rank: profile.rank,
        maxRank: profile.maxRank,
        avatar: profile.avatar,
        titlePhoto: profile.titlePhoto,
        contribution: profile.contribution,
        country: profile.country,
        city: profile.city,
        organization: profile.organization,
        friendOfCount: profile.friendOfCount,
    };
};

module.exports = {
    mapCodeforcesProfile,
};