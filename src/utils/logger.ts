import bunyan from "bunyan";
import BunyanFormat from "bunyan-format";
import colors from "colors";

const formatOut = BunyanFormat({ outputMode: "long", color: true });

let level: bunyan.LogLevel = "info";

const streams = [
  {
    stream: formatOut,
    level,
    color: true,
  },
];

const log = bunyan.createLogger({
  name: "Prisma-ORM",
  streams,
  serializers: bunyan.stdSerializers,
});

const debug = (obj: any, msg = "") => {
  log.debug(colors.gray(obj), msg);
};

const info = (obj: any, msg = "") => {
  log.info(colors.green(obj), msg);
};

const error = (obj: any, msg = "") => {
  log.error(colors.red(obj), msg);
};

const warn = (obj: any, msg = "") => {
  log.warn(colors.yellow(obj), msg);
};

export default {
  debug,
  info,
  error,
  warn,
};
