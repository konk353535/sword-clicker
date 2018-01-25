


== Install

https://www.meteor.com/
https://www.meteor.com/install



== Run Locally

meteor --settings settings-development.json

== Deployment

http://meteor-up.com/
https://github.com/zodern/meteor-up


== Gotchas

In the logs there is an error :
`
Exception while invoking method 'shop.fetchGlobalBuffs' { stack: 'SyntaxError: Unexpected token u\n    at Object.parse (native)\n    at [object Object].Meteor.methods.shop.fetchGlobalBuffs (server/api/shop/shop.js:18:17)\n    at [object Object].methodMap.(anonymous function) (packages/meteorhacks_kadira.js:2731:30)\
`
which is fixed when you run this in the console:

`
redis-cli set global-buffs-xpq "{\"combat\":\"2017-10-29T19:30:59.534Z\",\"gathering\":\"2017-10-29T08:45:55.520Z\",\"crafting\":\"2017-10-29T18:45:54.943Z\"}"
`


== Growth 

/r/PBBG
/r/incremental_games/
/r/webgames