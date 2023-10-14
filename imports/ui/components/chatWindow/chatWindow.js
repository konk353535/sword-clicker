import { Chats } from "meteor/cesarve:simple-chat/collections"
import { SimpleChat } from "meteor/cesarve:simple-chat/config"
import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"

import moment from "moment"

import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Groups } from "/imports/api/groups/groups.js"
import { Users } from "/imports/api/users/users"

import { Combat } from "/imports/api/combat/combat.js"

import "./chatWindow.html"

SimpleChat.scrollToEnd = function () {
    // This is 'wrong' -- it checks the width of the chat window to determine if it's the full chat page
    /*
    if ($(window).width() > 500) {
        Template.chatWindow.endScroll = true
        const messages = $(".direct-chat-messages")
        messages.animate({ scrollTop: 100000 }, { duration: 300, queue: false })
        messages.trigger("scroll")
    }
    */

    // This is how it should be done
    if ($(".chat-container:not(.is-chat-page)").length > 0) {
        Template.chatWindow.endScroll = true
        const messages = $(".direct-chat-messages")
        messages.animate({ scrollTop: 100000 }, { duration: 300, queue: false })
        messages.trigger("scroll")
    }
}

SimpleChat.handleObserver = undefined

const AVAILABLE_CHATS = {
    Server: {
        name: "Server",
        id: "Server",
        class: "chat-Server",
        show: true
    },
    General: {
        name: "General",
        id: "General",
        class: "chat-General",
        show: true
    },
    Party: {
        name: "Party",
        id: "Party",
        class: "chat-Party",
        show: true
    },
    LFG: {
        name: "LFG",
        id: "LFG",
        class: "chat-LFG",
        show: true
    },
    Game: {
        name: "Game",
        id: "Game",
        class: "chat-Game",
        show: true
    },
    Help: {
        name: "Help",
        id: "Help",
        class: "chat-Help",
        show: true
    },
    Announcements: {
        name: "Announcements",
        id: "Announcements",
        class: "chat-Dev",
        show: true
    }
}

Template.chatWindow.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    this.state.set("minimized", true)
    this.state.set("currentChat", "General")
    this.state.set("availableChats", AVAILABLE_CHATS)

    this.initializing = true
    this.beep = SimpleChat.options?.beep ?? false
    this.showViewed = SimpleChat.options?.showViewed ?? true
    this.showJoined = SimpleChat.options?.showJoined ?? true
    this.showReceived = SimpleChat.options?.showReceived ?? true
    this.limit = new ReactiveVar(this.limit || SimpleChat.options.limit)
    this.increment = this.limit.get()

    Tracker.autorun(() => {
        let minimized = true
        let myUserDoc = Users.findOne({ _id: Meteor.userId() })
        if (myUserDoc && myUserDoc.uiState && myUserDoc.uiState.showChat !== undefined) {
            minimized = !myUserDoc.uiState.showChat
        }

        //if (myUserDoc && myUserDoc.isMutedExpiry && moment().isBefore(myUserDoc.isMutedExpiry)) {
        //  toastr.error(`You will be unmuted in ${moment(myUserDoc.isMutedExpiry).fromNow()}. Please keep things civil.`);
        //}

        this.state.set("minimized", minimized)
        this.state.set("chatScrollForMessages", false)
    })

    this.autorun(() => {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })
        const myUserDoc = Users.findOne({ _id: Meteor.userId() })
        const availableChats = this.state.get("availableChats")

        if (!myUserDoc) {
            return
        }

        if (availableChats.General.show) {
            Meteor.subscribe("simpleChats", `General`, this.limit.get())
            //Meteor.subscribe("simpleChats", `General-${myUserDoc.server}`, this.limit.get());
        }

        if (availableChats.Server.show) {
            Meteor.subscribe("simpleChats", `Server-${myUserDoc.server}`, this.limit.get())
        }

        if (currentGroup && availableChats.Party.show) {
            // Current group messages
            Meteor.subscribe("simpleChats", currentGroup._id, this.limit.get())
        }

        if (availableChats.LFG.show) {
            // People looking for group
            Meteor.subscribe("simpleChats", `LFG-${myUserDoc.server}`, this.limit.get())
        }

        if (availableChats.Game.show) {
            // Events relevant to you
            Meteor.subscribe("simpleChats", `Game-${Meteor.userId()}`, this.limit.get())
        }

        if (availableChats.Announcements.show) {
            // Events relevant to you
            //Meteor.subscribe("simpleChats", `Offtopic-${myUserDoc.server}`, this.limit.get());
            Meteor.subscribe("simpleChats", `Announcements`, this.limit.get())
        }

        if (availableChats.Help.show) {
            // Events relevant to you
            Meteor.subscribe("simpleChats", `Help`, this.limit.get())
        }

        this.subscribing = true
    })
})

// This could probably be better :|
Template.chatWindow.rendered = function () {
    SimpleChat.scrollToEnd()

    this.$(".direct-chat-messages").scroll(function (event) {
        // multiply the the chat window height by 2.. if the top of the user's scroll area is at least twice the height
        // of the scrollable area, then they are scrolled back by 1 (or more) 'pages'
        Template.chatWindow.endScroll = event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= $(".scroll-height").height() * 2

        // Debug
        //console.log("Heights", Template.chatWindow.endScroll, event.currentTarget.scrollHeight, event.currentTarget.scrollTop, $(".scroll-height").height())
    })

    this.autorun(() => {
        if (this.subscriptionsReady()) {
            this.subscribing = false
            SimpleChat.scrollToEnd(this)
        }
    })

    const username = Meteor.user().username
    if (this.showViewed) {
        const checkViewed = () => {
            if (window.visivility == "visible") {
                $(".notViewed")
                    .filter(":onscreen")
                    .each(function (i, o) {
                        $(o).removeClass("notViewed")
                        Meteor.call("SimpleChat.messageViewed", $(o).attr("id"), username, function (err) {
                            if (err) $(o).addClass("notViewed")
                        })
                    })
            }
        }
        $(window).on("resize scroll focus", checkViewed)
        $(".direct-chat-messages").on("scroll", checkViewed)
    }

    $(window).on("SimpleChat.newMessage", (e, id, doc) => {
        if (Template.chatWindow.endScroll) {
            SimpleChat.scrollToEnd(this)
            Template.instance().state.set("chatScrollForMessages", false)
        } else {
            Template.instance().state.set("chatScrollForMessages", true)
        }
    })
}

Template.chatWindow.onDestroyed(function templateDestroyedFromDom() {
    // Have to stop this observer manually or we can leak memory!
    if (SimpleChat.handleObserver) {
        try {
            SimpleChat.handleObserver.stop()
            SimpleChat.handleObserver = undefined
        } catch (err) {}
    }
})

Template.chatWindow.events({
    "click .chat-new-messages-scroll"(event, instance) {
        SimpleChat.scrollToEnd()
        instance.state.set("chatScrollForMessages", false)
    },

    "click .maximize-icon"(event, instance) {
        instance.state.set("minimized", false) // Do instantly in UI to avoid delay
        Meteor.call("users.setUiState", "showChat", true)
    },

    "click .btn-hide-chat"(event, instance) {
        const chatId = instance.$(event.target).closest(".btn-hide-chat").data("id")

        const availableChats = instance.state.get("availableChats")
        availableChats[chatId].show = false
        instance.state.set("availableChats", availableChats)
    },

    "click .btn-show-chat"(event, instance) {
        const chatId = instance.$(event.target).closest(".btn-show-chat").data("id")

        const availableChats = instance.state.get("availableChats")
        availableChats[chatId].show = true
        instance.state.set("availableChats", availableChats)
    },

    "click .change-chat"(event, instance) {
        const chatId = instance.$(event.target).closest(".change-chat").data("chat-id")
        instance.state.set("currentChat", chatId)
    },

    "click .minimize-btn"(event, instance) {
        instance.state.set("minimized", true) // Do instantly in UI to avoid delay
        Meteor.call("users.setUiState", "showChat", false)
    },

    "click .room-general"(event, instance) {
        instance.state.set("currentRoom", "General")
    },

    "click .room-other"(event, instance) {
        instance.state.set("currentRoom", "Other")
    },

    "click .room-bugs"(event, instance) {
        instance.state.set("currentRoom", "Bugs")
    },

    "click .room-party"(event, instance) {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })
        instance.state.set("currentRoom", currentGroup._id)
    },

    "keydown #simple-chat-message": function (event) {
        const $message = $(event.currentTarget)
        if (event.which === 13 && $message.val() !== "") {
            // 13 is the enter key event
            event.preventDefault()
            Template.instance().$("button#message-send").click()
        }
    },

    "click button#message-send": function () {
        let template = Template.instance()
        let $message = template.$("#simple-chat-message")
        const contents = $message.val().split(" ")
        const command = contents[0].trim().toLowerCase()
        const text = contents.length > 1 ? contents.slice(1).join(" ") : ""

        let myUserDoc = Users.findOne({ _id: Meteor.userId() })
        if (myUserDoc && myUserDoc.isMutedExpiry && moment().isBefore(myUserDoc.isMutedExpiry)) {
            toastr.error(
                `You will be unmuted in ${moment(myUserDoc.isMutedExpiry).fromNow()}. Please keep things civil.`
            )
            return
        }

        // Check for client commands
        if (command === "/party" || command === "/p") {
            $message.val(text)
            template.state.set("currentChat", "Party")
        } else if (command === "/general" || command === "/g") {
            $message.val(text)
            template.state.set("currentChat", "General")
        } else if (command === "/server" || command === "/s") {
            $message.val(text)
            template.state.set("currentChat", "Server")
        } else if (command === "/lfg") {
            $message.val(text)
            template.state.set("currentChat", "LFG")
        } else if (command === "/help" || command === "/h") {
            $message.val(text)
            template.state.set("currentChat", "Help")
        } else if (
            command === "/announce" ||
            command === "/a" ||
            command === "/an" ||
            command === "/ann" ||
            command === "/announcement" ||
            command === "/announcements" ||
            command === "/d" ||
            command === "/dev"
        ) {
            $message.val(text)
            template.state.set("currentChat", "Announcements")
        }

        if ($message.val() !== "") {
            let text = $message.val()
            $message.val("")
            SimpleChat.scrollToEnd(template)
            const currentChatId = template.state.get("currentChat")
            // Room id is based
            const custom = {
                roomType: currentChatId,
                isAdmin: myUserDoc.isMod || myUserDoc.isSuperMod,
                classIcon: userCurrentClass().unlocked ? userCurrentClass().icon : undefined
                //todo: when we add badges for achievements, custom titles, custom colors for chat, etc. -- place it here and then reference it within chatWindow.html
            }

            let roomId
            if (currentChatId === "Party") {
                roomId = Groups.findOne({ members: Meteor.userId() })._id
            } else if (currentChatId === "Server" || currentChatId === "LFG") {
                roomId = `${currentChatId}-${Meteor.user().server}`
            } else {
                roomId = `${currentChatId}`
            }

            let playerIcon = "character.svg"
            const myCombat = Combat.findOne({
                owner: Meteor.userId()
            })
            if (myCombat && myCombat.characterIcon) {
                try {
                    playerIcon = `/icons/${myCombat.characterIcon}`
                } catch (err) {}
            }

            Meteor.call(
                "SimpleChat.newMessage",
                text,
                roomId,
                Meteor.user().username,
                playerIcon,
                Meteor.user().username,
                custom,
                function (err, res) {
                    if (err) {
                        $message.val(text)
                    }
                }
            )
        }
    },

    "click #simple-chat-load-more": function () {
        let template = Template.instance()
        template.subscribing = true
        template.limit.set(template.limit.get() + 20)
        template.scroll = template.$(".scroll-height")[0].scrollHeight
        template.$(".direct-chat-messages").animate({ scrollTop: 0 }, 0)
        template.$(".direct-chat-messages").trigger("scroll")
    }
})

Template.chatWindow.helpers({
    minimized() {
        return Template.instance().state.get("minimized")
    },

    chatScrollForMessages() {
        return Template.instance().state.get("chatScrollForMessages")
    },

    wantCondensedChat() {
        return Session.get("wantCondensedChat")
    },

    currentRoom() {
        return Template.instance().state.get("currentRoom")
    },

    currentChat() {
        const instance = Template.instance()
        return instance.state.get("availableChats")[instance.state.get("currentChat")]
    },

    availableChats() {
        const instance = Template.instance()
        return Object.keys(instance.state.get("availableChats")).map((chatId) => {
            return instance.state.get("availableChats")[chatId]
        })
    },

    currentGroup() {
        return Groups.findOne({
            members: Meteor.userId()
        })
    },

    isChatPage() {
        if (Template.instance().data) {
            return Template.instance().data.isChatPage
        }

        return false
    },

    simpleChats: function () {
        const instance = Template.instance()
        const chats = Chats.find({}, { sort: { date: 1 } })
        // Have to stop this observer manually or we can leak memory!  https://docs.meteor.com/api/collections.html
        if (SimpleChat.handleObserver) {
            try {
                SimpleChat.handleObserver.stop()
                SimpleChat.handleObserver = undefined
            } catch (err) {}
        }
        SimpleChat.handleObserver = chats.observeChanges({
            added: (id, doc) => {
                const username = Meteor.user().username
                $(window).trigger("SimpleChat.newMessage", [id, doc])
            }
        })

        const localChats = chats.map((chat) => {
            return chat
        })

        // this is set on message send now, no need to look up everyone's user data for every message received anymore
        /*
        localChats.forEach((chat, idx) => {
            if (chat.userId) {
                const userDoc = Users.findOne({ _id: chat.userId })
                if (userDoc) {
                    localChats[idx].isAdmin = userDoc.isMod || userDoc.isSuperMod
                    localChats[idx].custom.isAdmin = userDoc.isMod || userDoc.isSuperMod
                } else {
                    localChats[idx].isAdmin = false
                    localChats[idx].custom.isAdmin = false
                }
            }
        })
        */

        return localChats
    },

    hasMore: function () {
        // note: this may need to be updated with the change to cursorLimitCount in
        // https://guide.meteor.com/2.6-migration
        return (
            Chats.find(
                {},
                {
                    sort: { date: 1 },
                    limit: Template.instance().limit.get()
                }
            ).count() === Template.instance().limit.get()
        )
    },

    placeholder: function () {
        return SimpleChat.options.texts.placeholder
    },

    button: function () {
        return SimpleChat.options.texts.button
    },

    join: function () {
        return SimpleChat.options.texts.join
    },

    left: function () {
        return SimpleChat.options.texts.left
    },

    room: function () {
        return SimpleChat.options.texts.room
    }
})
