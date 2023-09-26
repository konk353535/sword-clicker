Passwords + `mup.js` + `nginx-config.conf` + `settings.json` are in Bitwarden ET vault
Server admin is through Hetzner https://console.hetzner.cloud/

meteor: alma-cpx31-ash-1-meteor server

-   mup commands from `.deploy` folder (mup start / stop / deploy / reconfig, etc)
    mongo: alma-ccx23-ash-1-mongo server
-   `systemctl status mongod`
-   mongo can be restarted by running `systemctl restart mongod`
-   `docker ps` should show `oplogToRedis` container is running
-   there is a folder `~/oplogToRedis` that has a `docker-compose.yml`, can `cd ~/oplogToRedis` then `docker compose stop` then `docker compose start` to restart `oplogToRedis`
    battle: alma-cpx21-ash-1-battle server
-   `docker ps` should show `node` and `proxy` containers running
-   there is a folder `~/sword-clicker` with a `docker-compose.yml`, can `cd ~/sword-clicker` then `docker compose stop` then `docker compose start` to restart battle node and proxy
