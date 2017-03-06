import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap';

import './main.html';

// Components
import '/imports/ui/components/itemIcon/itemIcon.js';
import '/imports/ui/components/formatNumber/formatNumber.js';
import '/imports/ui/components/requiredItems/requiredItems.js';

// Pages / Core
import '../imports/ui/body.js';
import '../imports/ui/nav.js';
import '../imports/ui/pages/home.js';
import '../imports/ui/pages/mining.js';
import '../imports/ui/pages/crafting.js';
import '../imports/ui/pages/combat.js';

// Start Up
import '../imports/startup/both';
import '../imports/startup/client';
