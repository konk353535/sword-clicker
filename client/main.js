import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap';

import './main.html';

// Components
import '/imports/ui/components/groupList/groupList.js';
import '/imports/ui/components/chatWindow/chatWindow.js';
import '/imports/ui/components/ability/ability.js';
import '/imports/ui/components/helpIcon/helpIcon.js';
import '/imports/ui/components/itemIcon/itemIcon.js';
import '/imports/ui/components/recipeIcon/recipeIcon.js';
import '/imports/ui/components/formatNumber/formatNumber.js';
import '/imports/ui/components/ceilNumber/ceilNumber.js';
import '/imports/ui/components/requiredItems/requiredItems.js';
import '/imports/ui/components/displayCombatStats/displayCombatStats.js';
import '/imports/ui/components/battleUnit/battleUnit.js';
import '/imports/ui/components/skillHeader/skillHeader.js';
import '/imports/ui/components/memberBenefit/memberBenefit.js';

// Pages / Core
import '../imports/ui/body.js';
import '../imports/ui/nav.js';
import '../imports/ui/pages/guestSettings.js';
import '../imports/ui/pages/home.js';
import '../imports/ui/pages/chat.js';
import '../imports/ui/pages/magic.js';
import '../imports/ui/pages/mining.js';
import '../imports/ui/pages/crafting.js';
import '../imports/ui/pages/inscription.js';
import '../imports/ui/pages/woodcutting.js';
import '../imports/ui/pages/skills.js';
import '../imports/ui/pages/patchNotes.js';
import '../imports/ui/pages/combat.js';
import '../imports/ui/pages/farming.js';
import '../imports/ui/pages/shop.js';

// Start Up
import '../imports/startup/both';
import '../imports/startup/client';
