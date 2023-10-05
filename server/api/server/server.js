import { Meteor } from "meteor/meteor"

import { Servers, validDeployFlags } from "/imports/api/servers/servers"
import { State } from "/imports/api/state/state"
import { Users } from "/imports/api/users/users.js"
import { Chats } from 'meteor/cesarve:simple-chat/collections'

Meteor.methods({
    // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
    "server.info"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        return Servers.findOne({ _id: Meteor.user().server })
    },

    "server.deployFlag"(flag) {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        if (!validDeployFlags.includes(flag)) {
            return false
        }

        let message = ""
        if (flag === "deploy_meteor") {
            message = "Incoming update ~5 minutes. The battle server will not be restarted, but while the game is updating, combat interactions will be interrupted for 20-30 seconds."
        } else if (flag === "deploy_battle") {
            message = "Incoming update ~5 minutes. The battle server will be restarted, so please make sure you are finished with your battles at the time."
        } else if (flag === "deploy_all") {
            message = "Incoming update: ~5 minutes. All services will be interrupted, so please make sure you are finished with your battles at the time."
        }

        if (message.length > 0) {
            Chats.insert({
                message: message,
                username: "SERVER",
                name: "SERVER",
                date: new Date(),
                custom: {
                    roomType: "Announcements"
                },
                roomId: `Announcements`
            })
        }

        State.insert({
            name: flag
        })

        return true
    },

    "server.unsetDeployFlag"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        State.remove({
            name: {
                $in: validDeployFlags
            }
        })

        return true
    }
})
