const API_KEY = "HDEV-c1b09c7a-1188-4e0b-97b3-b5da2d3f01ed";
const BASE_URL = "https://api.henrikdev.xyz/valorant";

/**
 * Fetches real-time stats for a Valorant player using Henrikdev API.
 * @param {string} name - Player name
 * @param {string} tag - Player tag
 * @returns {Promise<Object|null>} Stats object or null if failed
 */
export const fetchPlayerStats = async (name, tag) => {
    try {
        // 1. Get Account Info to find the correct region
        const accountRes = await fetch(`${BASE_URL}/v1/account/${name}/${tag}`, {
            headers: { "Authorization": API_KEY }
        });

        if (!accountRes.ok) throw new Error("Account not found");
        const accountData = await accountRes.json();
        const region = accountData.data.region;

        // 2. Get MMR Info (Rank)
        const mmrRes = await fetch(`${BASE_URL}/v1/mmr/${region}/${name}/${tag}`, {
            headers: { "Authorization": API_KEY }
        });

        let rank = "N/A";
        if (mmrRes.ok) {
            const mmrData = await mmrRes.json();
            rank = mmrData.data?.currenttierpatched || "N/A";
        }

        // 3. Get Recent Match Stats (To approximate K/D and HS%)
        // Henrik's API doesn't have a simple "Lifetime Stats" for general users, 
        // so we fetch the last few matches to get "Current Form" stats.
        const matchesRes = await fetch(`${BASE_URL}/v3/matches/${region}/${name}/${tag}?size=5`, {
            headers: { "Authorization": API_KEY }
        });

        if (matchesRes.ok) {
            const matchesData = await matchesRes.json();
            const matches = matchesData.data;

            let totalKills = 0;
            let totalDeaths = 0;
            let totalHeadshots = 0;
            let totalShots = 0;
            let mainAgent = "N/A";

            if (matches && matches.length > 0) {
                // Determine main agent from these matches
                const agents = {};

                matches.forEach(match => {
                    const player = match.players.all_players.find(p =>
                        p.name.toLowerCase() === name.toLowerCase() &&
                        p.tag.toLowerCase() === tag.toLowerCase()
                    );

                    if (player) {
                        totalKills += player.stats.kills;
                        totalDeaths += Math.max(1, player.stats.deaths);
                        totalHeadshots += player.stats.headshots;
                        totalShots += (player.stats.headshots + player.stats.bodyshots + player.stats.legshots);

                        const agent = player.character;
                        agents[agent] = (agents[agent] || 0) + 1;
                    }
                });

                mainAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b);

                return {
                    "K/D": (totalKills / totalDeaths).toFixed(2),
                    "HS%": totalShots > 0 ? `${Math.round((totalHeadshots / totalShots) * 100)}%` : "0%",
                    "Main": mainAgent,
                    "Rank": rank,
                    "isLive": true
                };
            }
        }

        return null;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null; // Trigger safeguard
    }
};

/**
 * Fetches agent artwork URL from valorant-api.com.
 * @param {string} agentName - Agent name
 * @returns {Promise<string|null>} Portrait URL or null
 */
export const fetchAgentArt = async (agentName) => {
    try {
        const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
        if (!res.ok) return null;

        const data = await res.json();
        const agent = data.data.find(a => a.displayName.toLowerCase() === agentName.toLowerCase());

        return agent ? agent.fullPortrait : null;
    } catch (error) {
        console.error("Error fetching agent art:", error);
        return null;
    }
};
