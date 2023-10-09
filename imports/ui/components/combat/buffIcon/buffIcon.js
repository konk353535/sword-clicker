import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"

import { fixupBuffText } from "/imports/battleUtils"

import "./buffIcon.html"
import { TUNGSTEN_CRAFTS } from "../../../../constants/combat/crafts/tungsten"

// Note: Drop() is an extension of tether.js
// https://github.hubspot.com/drop/
// https://tetherjs.dev/

const tooltipMethod = "drop"
//const tooltipMethod = 'tippyShort';
//const tooltipMethod = 'tippy';

Template.buffIcon.helpers({
    buffIcon() {
        try {
            const localData = Template.instance().data

            if (!localData) {
                return false
            }

            if (localData.buff.data.icon && localData.buff.data.icon.length > 0) return localData.buff.data.icon

            if (localData.buff.icon && localData.buff.icon.length > 0) return localData.buff.icon
        } catch (err) {}

        return false
    },

    buffCustom() {
        try {
            const localData = Template.instance().data

            if (!localData) {
                return false
            }

            if (localData.buff.data.custom) return true

            if (localData.buff.custom) return true
        } catch (err) {}

        return false
    },

    buffShortUid() {
        try {
            const localData = Template.instance().data

            if (!localData) {
                return false
            }

            if (!localData.buff.uid) {
                return '?'
            }

            return localData.buff.uid.substring(localData.buff.uid.length - 5)
        } catch (err) {
            console.log(err)
        }

        return "!"
    },

    debugMode() {
//return true
        return false
    },

    hideBuff() {
        try {
            const localData = Template.instance().data

            if (!localData) {
                return true
            }

            return localData.buff.hideBuff || localData.buff.data.hideBuff
        } catch (err) {}

        return false
    },

    hideBuffFromTop() {
        try {
            const localData = Template.instance().data

            if (!localData) {
                return true
            }

            return localData.buff.hideBuffFromTop || localData.buff.data.hideBuffFromTop
        } catch (err) {}

        return false
    },
})

if (!document.buffIconManager) {
    document.buffIconManager = Object.assign({}, document?.buffIconManager)
}
const BIM = document.buffIconManager;
if (!BIM.init) {
    BIM.init = true
    BIM.buffs = []
    BIM.checkExpiredBuffs = function() {
        if (!BIM.buffs) {
            return
        }
        BIM.buffs.forEach(function(thisBuff) {
            const selectorA_id = `buff-${thisBuff.size}-${thisBuff.uid}` // match the .html element ID
            const selectorA = `#${selectorA_id}`
            const selectorB_id = `buff-tooltip-content-${thisBuff.size}-${thisBuff.uid}`
            const selectorB = `#${selectorB_id}`

            if ($(selectorA).length === 0) {
                //console.log("Buff Icon Manager destroyed tooltip info for:", thisBuff?.name, thisBuff?.id, thisBuff?.uid, thisBuff?.size)

                $(selectorB).remove()

                let idx = BIM.buffs.length - 1
                while (idx >= 0) {
                    if (BIM.buffs[idx].uid === thisBuff.uid && BIM.buffs[idx].size === thisBuff.size) {
                        BIM.buffs.splice(idx, 1);
                    }
                  
                    idx -= 1;
                }
            }
        })
    }
    BIM.checkBuffsWithNoTooltip = (function() {
        if (!BIM.buffs) {
            return
        }
        BIM.buffs.forEach(function(thisBuff) {
            if (!thisBuff?.addedTooltip && thisBuff?.size == "small") {
                const selectorA_id = `buff-${thisBuff.size}-${thisBuff.uid}` // match the .html element ID
                const selectorA = `#${selectorA_id}`
                const selectorB_id = `buff-tooltip-content-${thisBuff.size}-${thisBuff.uid}`
                const selectorB = `#${selectorB_id}`

                if ($(selectorA).length === 1) {
                    if ($(selectorB).length === 0) {
                        //console.log("Buff Icon Manager detected no tooltip info for:", thisBuff?.name, thisBuff?.id, thisBuff?.uid, thisBuff?.size)

                        $(".body-content").append(`
                            <!-- Icon Tooltip -->
                            <div class="buff-tooltip-content my-tooltip-inner combat-buff-tooltip-data" owner="${selectorA_id}" id="${selectorB_id}">
                                <h3 class='popover-title text-capitalize'>
                                ${thisBuff?.name}
                                </h3>
                                <div class='popover-content'>
                                    <div style='max-width: 350px;'>
                                    ${thisBuff?.description}
                                    </div>
                                </div>
                            </div>`)

                        const dropInst = new Drop({
                            target: $(selectorA)[0],
                            content: $(selectorB)[0],
                            openOn: "hover",
                            position: "bottom left",
                            remove: false,
                            constrainToWindow: false,
                            constrainToScrollParent: false,
                            tetherOptions: {
                                appendTo: document.querySelector(".body-content")
                            }
                        })
        
                        $(selectorA).on('mouseenter', function() {
                            // yes, really do it immediately and 1ms later
                            window.setTimeout(function() {
                                //dropInst.open() // don't need this
                                $(selectorB).show()
                            }, 1)
                            //dropInst.open() // don't need this
                            $(selectorB).show()
                        })
                        
                        $(selectorA).on('mouseleave', function() {
                            dropInst.close() // isn't closing on its own and this doesn't seem to close it manually, so we n
                            // yes, really do it immediately and 1ms later
                            window.setTimeout(function() {
                                dropInst.close()
                                $(selectorB).hide()
                            }, 1)
                            $(selectorB).hide()
                        })

                        let idx = BIM.buffs.length - 1
                        while (idx >= 0) {
                            if (BIM.buffs[idx].uid === thisBuff.uid && BIM.buffs[idx].size === thisBuff.size) {
                                BIM.buffs[idx].addedTooltip = true;
                            }
                        
                            idx -= 1;
                        }
                    }
                }
            }
        })
    })
    window.setInterval(BIM.checkExpiredBuffs, 500)
    //window.setInterval(BIM.checkBuffsWithNoTooltip, 500)
}

Template.buffIcon.onCreated(function bodyOnCreated() {
    //console.log("Template.buffIcon.onCreated()", Template.instance()?.data?.buff?.uid, this?.data?.buff?.uid)

    this.intervalTimer = undefined
    this.instRef = undefined
    this.tooltip = undefined // we don't use this unless we change tooltipMethod
    this.state = new ReactiveDict()
    this.oldUid = ""
    this.state.set("didThisBuff", false)

    /*
    if (this.oldUid != this.data.buff.uid) {
        const fixedBuff = fixupBuffText(this.data.buff, undefined)
        if (this.oldUid == "" || this.oldUid == this.data.buff.uid) {
            console.log("buff created create:", fixedBuff.data.name, this.data.buff.uid)
        } else {
            console.log("buff created mutate:", fixedBuff.data.name, this.data.buff.uid, this.oldUid)
        }
        this.oldUid = this.data.buff.uid
    }

    if (this.oldUid != Template.currentData().buff.uid) {
        console.log("********* MUTATE?", Template.currentData().buff.uid, this.oldUid)
    }
    */

    const tryToRenderTooltips = function (self) {
        let localData = self.data
        const localSize = localData.small ? "small" : "medium"

        if (self.state.get("didThisBuff")) {
            //todo: check if buff name changed?
            //console.log('Monitoring changes to buff:', tooltipMethod, localSize, localData);
            Meteor.clearInterval(self.intervalTimer)
            return
        }

        // overkill debugging stuff left in for educational purpose
        //if (!localData || !localData.data || !localData.data.icon) { try { localData = self; } catch (err) { } }
        //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.data; } catch (err) { } }
        //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.instance.data; } catch (err) { } }
        //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.instance().data; } catch (err) { } }
        //if (!localData || !localData.data || !localData.data.icon) { try { localData = Template.instance().data; } catch (err) { } }

        if (!localData || !localData.buff || !localData.buff.icon || !localData.buff.data) {
            //console.log('Skipping tooltip hook this pass:', tooltipMethod, localSize, localData);
            return
        }

        if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === "undefined") {
            // no localData.buff.uid (waiting)
            return
        }

        const fixedBuff = fixupBuffText(localData.buff, undefined)
        localData.buff.data.name = fixedBuff.data.name
        localData.buff.data.description = fixedBuff.data.description

        //console.log('Performing tooltip hook:', tooltipMethod, localSize, localData.buff.uid, localData.buff.id, localData.buff.name);
        if (!localData.buff.data?.description) {
            console.log("WARNING: can't find a description for this buff")
            console.log(localData, fixedBuff)
        }

        const selectorA_id = `buff-${localSize}-${localData.buff.uid}` // match the .html element ID
        const selectorA = `#${selectorA_id}`
        const selectorB_id = `buff-tooltip-content-${localSize}-${localData.buff.uid}`
        const selectorB = `#${selectorB_id}`
        const buffName = localData.buff.data?.name || localData.buff?.id || "Combat Effect"
        const buffDesc = localData.buff.data?.description || "You aren't sure what this effect does."

        if (BIM && BIM.buffs) {
            BIM.buffs.push({ uid: localData.buff.uid, size: localSize ? "small" : "medium", id: localData.buff?.id, name: buffName, description: buffDesc })
        }

        self.state.set("selectorA", selectorA)
        self.state.set("selectorB", selectorB)
        self.state.set("buffName", buffName)
        self.state.set("buffDesc", buffDesc)

        if ($(selectorA).length === 1 && $(selectorB).length === 0) {
            $(".body-content").append(`
                <!-- Icon Tooltip -->
                <div class="buff-tooltip-content my-tooltip-inner combat-buff-tooltip-data" owner="${selectorA_id}" id="${selectorB_id}">
                    <h3 class='popover-title text-capitalize'>
                       ${buffName}
                    </h3>
                    <div class='popover-content'>
                        <div style='max-width: 350px;'>
                           ${buffDesc}
                        </div>
                    </div>
                </div>`
            )
        }

        // this can happen if we try to render a buff after the buff is already gone (dead unit, etc.)
        if ($(selectorA).length + $(selectorB).length !== 2) {
            $(selectorA).remove()
            $(selectorB).remove()
            Meteor.clearInterval(self.intervalTimer)
            self.state.set("didThisBuff", true)
            return
        }

        if (tooltipMethod === "drop") {
            if (!localData.small) {
                self.dropInst = new Drop({
                    target: $(selectorA)[0],
                    content: $(selectorB)[0],
                    openOn: "hover",
                    position: "top left",
                    remove: true
                })
            } else {
                self.dropInst = new Drop({
                    target: $(selectorA)[0],
                    content: $(selectorB)[0],
                    openOn: "hover",
                    position: "bottom left",
                    remove: false,
                    constrainToWindow: false,
                    constrainToScrollParent: false,
                    tetherOptions: {
                        appendTo: document.querySelector(".body-content")
                    }
                })

                // NOTE:  the '.small-icon' CSS style broke the 'hover' event from firing previously by setting
                //        'pointer-events: none'.  Now the 'hover' event works, however the tooltip sticks on the
                //        screen.  This should be automatically cleaned up by Drop() but doesn't seem to be
                //        working.  Instead, we attach our own hover events and call the Drop() instance's
                //        '.close()'... which also doesn't seem to be working.  So we use jQuery's '.hide()' and
                //        '.show()' to set the CSS display of the tooltipcontent to be visible instead, which
                //        requires a little hackery with timing to make sure it applies in the correct order.
                //
                // TL;DR: Lots of voodoo here, don't change it unless you know what you're doing.

                $(selectorA).on('mouseenter', function() {
                    // yes, really do it immediately and 1ms later
                    window.setTimeout(function() {
                        //self.dropInst.open() // don't need this
                        $(selectorB).show()
                    }, 1)
                    //self.dropInst.open() // don't need this
                    $(selectorB).show()
                })
                
                $(selectorA).on('mouseleave', function() {
                    self.dropInst.close() // isn't closing on its own and this doesn't seem to close it manually, so we n
                    // yes, really do it immediately and 1ms later
                    window.setTimeout(function() {
                        self.dropInst.close()
                        $(selectorB).hide()
                    }, 1)
                    $(selectorB).hide()
                })
            }
        } else if (tooltipMethod === "tippyShort") {
            self.tooltip = tippy($(selectorA)[0], {
                html: $(selectorB)[0],
                performance: true,
                animateFill: false,
                distance: 5
            })
        } else if (tooltipMethod === "tippy") {
            const vm = self
            vm.state.set("tooltipOpen", false)
            self.tooltip = tippy($(selectorA)[0], {
                appendTo: $(".body-content")[0],
                popperOptions: {
                    modifiers: {
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: "viewport"
                        },
                        hide: {
                            enabled: false
                        }
                    }
                },
                html: $(selectorB)[0],
                performance: true,
                animateFill: false,
                distance: 5,
                onHide: function () {
                    vm.state.set("tooltipOpen", false)
                }
            })
        }

        //console.log('Did buff for:', tooltipMethod, localSize, localData);
        self.state.set("didThisBuff", true)
        return
    }

    this.intervalTimer = Meteor.setInterval(() => {
        tryToRenderTooltips(this)
    }, 250)
})

Template.buffIcon.rendered = function () {
    /*
    console.log("Template.buffIcon.rendered()", Template.instance()?.data?.buff?.uid, this?.data?.buff?.uid)

    if (this.oldUid != this.data.buff.uid) {
        const fixedBuff = fixupBuffText(this.data.buff, undefined)
        if (this.oldUid == "" || this.oldUid == this.data.buff.uid) {
            console.log("buff render create:", fixedBuff.data.name, this.data.buff.uid)
        } else {
            console.log("buff rendermutate:", fixedBuff.data.name, this.data.buff.uid, this.oldUid)
        }
        this.oldUid = this.data.buff.uid
    }

    if (this.oldUid != Template.currentData().buff.uid) {
        console.log("********* MUTATE?", Template.currentData().buff.uid, this.oldUid)
    }
    */
}

Template.buffIcon.onDestroyed(function () {
    /*
    console.log("Template.buffIcon.onDestroyed()", Template.instance()?.data?.buff?.uid, this?.data?.buff?.uid)
    */

    const instRef = Template.instance()
    const localData = instRef.data

    try {
        if (instRef.dropInst) {
            instRef.dropInst.remove()
        }
    } catch (err) {}

    if (!localData || !localData.buff || !localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === "undefined" || typeof localData.buff.uid === "undefined") {
        try {
            // clean up tooltip if they were hovering when the buff/effect expired, battle ended, or the icon is otherwise destroyed from the DOM
            const selectorA = instRef.state.get("selectorA")
            const selectorB = instRef.state.get("selectorB")

            //console.log("buff removal, method 1:", selectorA)

            $(selectorA).remove()
            $(selectorB).remove()
        } catch (err) {}
    } else {
        const localSize = localData.small ? "small" : "medium"
        const selectorA = `#buff-${localSize}-${localData.buff.uid}`
        const selectorB = `#buff-tooltip-content-${localSize}-${localData.buff.uid}`

        //console.log("buff removal, method 2:", selectorA)

        try {
            if (instRef.tooltip && tooltipMethod === "tippy") {
                const tooltipInstance = $(selectorA)[0]

                if (tooltipInstance && tooltipInstance.hasOwnProperty("_tippy")) {
                    tooltipInstance._tippy.destroy()
                }
            }
        } catch (err) {}

        try {
            // clean up tooltip if they were hovering when the buff/effect expired, battle ended, or the icon is otherwise destroyed from the DOM
            $(selectorA).remove()
            $(selectorB).remove()
        } catch (err) {}
    }


    Meteor.clearInterval(this.intervalTimer)
})

Template.buffIcon.events({
    "click .icon-box"(event, instance) {
        if (tooltipMethod === "tippy") {
            const localData = Template.instance().data

            if (!localData) {
                return
            }

            if ($("body").hasClass("targetting-item")) {
                return
            }

            if (Session.get("tooltipInput") === "touch") {
                const localSize = localData.small ? "small" : "medium"

                if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === "undefined") {
                    return
                }

                const selectorA = `#buff-${localSize}-${localData.buff.uid}`

                if (instance.state.get("tooltipOpen")) {
                    // close tooltip
                    let tooltipInstance = $(selectorA)[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.hide()
                        instance.state.set("tooltipOpen", false)
                    }
                } else {
                    // open tooltip
                    let tooltipInstance = $(selectorA)[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.show()
                        instance.state.set("tooltipOpen", true)
                    }
                    return
                }
            }

            const primaryAction = instance.data.item.primaryAction
            const shiftAction = instance.data.item.shiftAction
            const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey

            if (shiftAction && shiftKey) {
                shiftAction.method()
            } else if (primaryAction) {
                primaryAction.method()
            }
        }
    }
})
