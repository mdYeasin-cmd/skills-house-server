import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;
import chalk from "chalk";

// Function to get full-line background style by level
const getBgColorByLevel = (level) => {
    switch (level) {
        case "error":
            return chalk.bgRed.white;
        case "warn":
            return chalk.bgYellow.black;
        case "info":
            return chalk.bgGreen.white;
        case "http":
            return chalk.bgCyan.black;
        case "debug":
            return chalk.bgGreen.black;
        default:
            return chalk.bgGray.white;
    }
};

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
    format.printf(({ level, message, timestamp }) => {
        const colorFn = getBgColorByLevel(level);
        return `${colorFn(`[${timestamp}] ${level}: ${message}`)}`;
    })
);

// Create a Winston logger
const logger = createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({ filename: "app.log" }),
    ],
});

export default logger;