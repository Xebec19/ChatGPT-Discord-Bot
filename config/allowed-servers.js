/**
 * @description it contains list of registered guilds
 */
const ALLOWED_GUILDS = {
  "1117782861248987277": {
    owner: "me",
    serverName: "Rohan Thakur's name",
  },
};

/**
 *
 * @returns sends list of authorised guilds
 */
function getAuthorisedGuilds() {
  return Object.keys(ALLOWED_GUILDS);
}

/**
 *
 * @param {string} guildId it represents the server id of the server
 * @returns boolean indicating if the guild is registered or not
 */
export default function checkGuildId({ guildId }) {
  let list = getAuthorisedGuilds(ALLOWED_GUILDS);
  if (list.includes(guildId)) {
    return true;
  }

  return false;
}
