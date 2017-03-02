import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap';

import './main.html';
import '../imports/ui/body.js';
import '../imports/ui/nav.js';
import '../imports/ui/pages/home.js';
import '../imports/ui/pages/mining.js';

// Start Up
import '../imports/startup/both';
import '../imports/startup/client';
