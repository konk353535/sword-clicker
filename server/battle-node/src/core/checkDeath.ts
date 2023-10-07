import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import Unit from "./unit"

function indefinite_article(phrase: string) {

    // Getting the first word 
    var match = /\w+/.exec(phrase);
    if (match)
        var word = match[0];
    else
        return "an";

    var l_word = word.toLowerCase();
    // Specific start of words that should be preceeded by 'an'
    var alt_cases = ["honest", "hour", "hono"];
    for (var i in alt_cases) {
        if (l_word.indexOf(alt_cases[i] || "") == 0)
            return "an";
    }

    // Single letter word which should be preceeded by 'an'
    if (l_word.length == 1) {
        if ("aedhilmnorsx".indexOf(l_word) >= 0)
            return "an";
        else
            return "a";
    }

    // Capital words which should likely be preceeded by 'an'
    if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
        return "an";
    }

    // Special cases where a word that begins with a vowel should be preceeded by 'a'
    const regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/]
    for (var i in regexes) {
        if (l_word.match(regexes[i] || ""))
            return "a"
    }

    // Special capital words (UK, UN)
    if (word.match(/^U[NK][AIEO]/)) {
        return "a";
    }
    else if (word == word.toUpperCase()) {
        if ("aedhilmnorsx".indexOf(l_word[0] || "") >= 0)
            return "an";
        else 
            return "a";
    }

    // Basic method of words that begin with a vowel being preceeded by 'an'
    if ("aeiou".indexOf(l_word[0] || "") >= 0)
        return "an";

    // Instances where y follwed by specific letters is preceeded by 'an'
    if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
        return "an";

    return "a";
}

export function checkDeath(this: Battle, defender: Unit, attacker: Unit) {
    // Check if this unit is dead
    if (defender.stats.health <= 0 || !defender.stats.health) {
        defender.stats.health = 0

        // Call death event for this defender
        if (defender.buffs) {
            // Buffs can do things on tick, will collect them in the form of combatEvents
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onBeforeDeath) {
                    buff.constants.events.onBeforeDeath({ buff, target: defender, actualBattle: this })
                }
            })
        }

        // Only kill defender if it is still dead
        if (defender.stats.health <= 0) {
            if (defender.onDeath) {
                defender.onDeath()
            }
            this.removeUnit(defender)
        }

        if (this.tickEvents) {
            let label = ""
            let eventType = "death"

            if (defender && defender.id) {
                if (attacker && attacker.id) {
                    if (defender._isEnemy) {
                        eventType = "death-enemy"
                        if (attacker._isEnemy) {
                            // enemy killed enemy (enemy died)
                            label = `${indefinite_article(attacker.name)} ${attacker.name} defeated ${indefinite_article(defender.name)} ${defender.name}.`
                        } else {
                            // ally killed enemy (enemy died)
                            label = `${attacker.name} defeated ${indefinite_article(defender.name)} ${defender.name}.`
                        }
                    } else {
                        eventType = "death-ally"
                        if (attacker._isEnemy) {
                            // enemy killed ally (ally died)
                            label = `${defender.name} was slain by ${indefinite_article(attacker.name)} ${attacker.name}!`
                        } else {
                            // ally killed ally (ally died)
                            label = `${attacker.name} was slain by ${defender.name}!`
                        }
                    }
                } else {
                    if (defender._isEnemy) {
                        eventType = "death-enemy"
                        // enemy died (unknown source of damage)
                        label = `${indefinite_article(defender.name)} ${defender.name} has been defeated`
                    } else {
                        eventType = "death-ally"
                        // ally died (unknown source of damage)
                        label = `${defender.name} was slain!`
                    }
                }
            }

            this.tickEvents.push({
                from: attacker ? attacker.id :  "",
                to: defender ? defender.id : "",
                eventType,
                label,
                customColor: "red",
                customIcon: "skull"
            })
        }
    }
}
