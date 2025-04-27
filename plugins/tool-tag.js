const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "tagii",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, prefix, command }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        // Hakuna kuangalia admin tena hapa!

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '❤‍🩹', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '🎧', '🪀', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];

        let message = (m.body || "").slice((prefix + command).length).trim();
        if (!message) message = "Attention Everyone"; // Default message

        let teks = `▢ Group : *${groupName}*\n▢ Members : *${totalMembers}*\n\n▢ Message: *${message}*\n\n┌───⊷ *MENTIONS*\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `${emojis[Math.floor(Math.random() * emojis.length)]} @${mem.id.split('@')[0]}\n`;
        }

        teks += "✪ 𝐁.𝐌.𝐁 ┃ 𝐗𝐌𝐃✪";

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});