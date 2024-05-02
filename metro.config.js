const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname); // Değişiklik burada
config.resolver.assetExts.push("cjs");
module.exports = config;
