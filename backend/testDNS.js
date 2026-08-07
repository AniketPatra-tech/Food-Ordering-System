const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv("_mongodb._tcp.cluster0.lhc3xsb.mongodb.net", (err, addresses) => {
    if (err) {
        console.log("DNS Error:", err);
    } else {
        console.log("MongoDB SRV:", addresses);
    }
});