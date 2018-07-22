import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Random } from 'meteor/random';
import moment from 'moment';

import { Servers } from '/imports/api/servers/servers';

import { Skills } from '../../api/skills/skills.js';
import { BlackList } from '../../api/blacklist/blacklist.js';
import { Floors } from '../../api/floors/floors.js';
import { Mining, MiningSpace } from '../../api/mining/mining.js';
import { Crafting } from '../../api/crafting/crafting.js';
import { Combat } from '../../api/combat/combat.js';
import { Adventures } from '../../api/adventures/adventures.js';
import { Abilities } from '../../api/abilities/abilities.js';
import { addItem } from '/server/api/items/items.js';
import { Items } from '/imports/api/items/items.js';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { updateCombatStats } from '/server/api/combat/combat.js';

import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { FLOORS } from '/server/constants/floors/index.js';

import '/imports/api/users/users.js';
import '/server/api/users/users.js';
import './crons.js';
import './chatConfig.js';

Accounts.emailTemplates.siteName = "Eternity Tower";
Accounts.emailTemplates.from = "Admin Eternity Tower <admin@eternitytower.net>";
Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Reset your password on Eternity Tower";
  },
  text(user, url) {
    return `Hello!
        Click the link below to reset your password on Eternity Tower.
        ${url}
        If you didn't request this email, please ignore it.
        Thanks,
        The Eternity Tower Team
    `
  },
  html(user, url) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Simple Transactional Email</title>
          <style type="text/css">
            /* -------------------------------------
                      GLOBAL RESETS
                  ------------------------------------- */
                  /* -------------------------------------
                      BODY & CONTAINER
                  ------------------------------------- */
                  /* -------------------------------------
                      HEADER, FOOTER, MAIN
                  ------------------------------------- */
                  /* -------------------------------------
                      TYPOGRAPHY
                  ------------------------------------- */
                  /* -------------------------------------
                      BUTTONS
                  ------------------------------------- */
                  /* -------------------------------------
                      OTHER STYLES THAT MIGHT BE USEFUL
                  ------------------------------------- */
                  /* -------------------------------------
                      RESPONSIVE AND MOBILE FRIENDLY STYLES
                  ------------------------------------- */
                  @media only screen and (max-width: 620px) {
                    table[class=body] h1 {
                      font-size: 28px !important;
                      margin-bottom: 10px !important; }
                    table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                      font-size: 16px !important; }
                    table[class=body] .wrapper,
                    table[class=body] .article {
                      padding: 10px !important; }
                    table[class=body] .content {
                      padding: 0 !important; }
                    table[class=body] .container {
                      padding: 0 !important;
                      width: 100% !important; }
                    table[class=body] .main {
                      border-left-width: 0 !important;
                      border-radius: 0 !important;
                      border-right-width: 0 !important; }
                    table[class=body] .btn table {
                      width: 100% !important; }
                    table[class=body] .btn a {
                      width: 100% !important; }
                    table[class=body] .img-responsive {
                      height: auto !important;
                      max-width: 100% !important;
                      width: auto !important; }}
                  /* -------------------------------------
                      PRESERVE THESE STYLES IN THE HEAD
                  ------------------------------------- */
                  @media all {
                    .ExternalClass {
                      width: 100%; }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                      line-height: 100%; }
                    .apple-link a {
                      color: inherit !important;
                      font-family: inherit !important;
                      font-size: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                      text-decoration: none !important; }
                    .btn-primary table td:hover {
                      background-color: #34495e !important; }
                    .btn-primary a:hover {
                      background-color: #34495e !important;
                      border-color: #34495e !important; } }
          </style>
        </head>
        <body class="" style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
          <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;">
            <tr>
              <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
              <td class="container" style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;">
                <div class="content" style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;">
                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader" style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">Welcome to Eternity Tower! Confirm your email</span>
                  <table class="main" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;">
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper" style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">
                            <img src="http://eternitytower.net/images/tower.png" style="width: 40px; height: 40px"><h1 style="display: inline; margin-left: 10px; height: 40px;">Eternity Tower</h1>
                            <br /><br />
                              <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Hi there ${user.username},</p>
                              <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Click the button below to reset your password</p>
                              <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;">
                                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;">
                                        <tbody>
                                          <tr>
                                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:#3498db;"> <a href="${url}" target="_blank" style="text-decoration:underline;background-color:#ffffff;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;color:#3498db;cursor:pointer;display:inline-block;font-size:14px;font-weight:bold;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize;background-color:#3498db;border-color:#3498db;color:#ffffff;">Reset Password</a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- END MAIN CONTENT AREA -->
                  </table>
                  <!-- START FOOTER -->
                  <!-- END FOOTER -->
                  <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
    `
  }
};
Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return "Confirm your Eternity Tower account";
  },
  text(user, url) {
    return `Hello!
        Click the link below to confirm your account on Eternity Tower.
        ${url}
        If you didn't request this email, please ignore it.
        Thanks,
        The Eternity Tower Team
    `
  },
  html(user, url) {
    return `

      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Simple Transactional Email</title>
          <style type="text/css">
            /* -------------------------------------
                      GLOBAL RESETS
                  ------------------------------------- */
                  /* -------------------------------------
                      BODY & CONTAINER
                  ------------------------------------- */
                  /* -------------------------------------
                      HEADER, FOOTER, MAIN
                  ------------------------------------- */
                  /* -------------------------------------
                      TYPOGRAPHY
                  ------------------------------------- */
                  /* -------------------------------------
                      BUTTONS
                  ------------------------------------- */
                  /* -------------------------------------
                      OTHER STYLES THAT MIGHT BE USEFUL
                  ------------------------------------- */
                  /* -------------------------------------
                      RESPONSIVE AND MOBILE FRIENDLY STYLES
                  ------------------------------------- */
                  @media only screen and (max-width: 620px) {
                    table[class=body] h1 {
                      font-size: 28px !important;
                      margin-bottom: 10px !important; }
                    table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                      font-size: 16px !important; }
                    table[class=body] .wrapper,
                    table[class=body] .article {
                      padding: 10px !important; }
                    table[class=body] .content {
                      padding: 0 !important; }
                    table[class=body] .container {
                      padding: 0 !important;
                      width: 100% !important; }
                    table[class=body] .main {
                      border-left-width: 0 !important;
                      border-radius: 0 !important;
                      border-right-width: 0 !important; }
                    table[class=body] .btn table {
                      width: 100% !important; }
                    table[class=body] .btn a {
                      width: 100% !important; }
                    table[class=body] .img-responsive {
                      height: auto !important;
                      max-width: 100% !important;
                      width: auto !important; }}
                  /* -------------------------------------
                      PRESERVE THESE STYLES IN THE HEAD
                  ------------------------------------- */
                  @media all {
                    .ExternalClass {
                      width: 100%; }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                      line-height: 100%; }
                    .apple-link a {
                      color: inherit !important;
                      font-family: inherit !important;
                      font-size: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                      text-decoration: none !important; }
                    .btn-primary table td:hover {
                      background-color: #34495e !important; }
                    .btn-primary a:hover {
                      background-color: #34495e !important;
                      border-color: #34495e !important; } }
          </style>
        </head>
        <body class="" style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
          <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;">
            <tr>
              <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
              <td class="container" style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;">
                <div class="content" style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;">
                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader" style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">Welcome to Eternity Tower! Confirm your email</span>
                  <table class="main" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;">
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper" style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">
                            <img src="http://eternitytower.net/images/tower.png" style="width: 40px; height: 40px"><h1 style="display: inline; margin-left: 10px; height: 40px;">Eternity Tower</h1>
                            <br /><br />
                              <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Hi there ${user.username},</p>
                              <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Welcome to Eternity Tower! <br /> Confirm your account and get started by clicking the confirm button below.</p>
                              <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;">
                                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;">
                                        <tbody>
                                          <tr>
                                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:#3498db;"> <a href="${url}" target="_blank" style="text-decoration:underline;background-color:#ffffff;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;color:#3498db;cursor:pointer;display:inline-block;font-size:14px;font-weight:bold;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize;background-color:#3498db;border-color:#3498db;color:#ffffff;">Confirm Account</a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- END MAIN CONTENT AREA -->
                  </table>
                  <!-- START FOOTER -->
                  <!-- END FOOTER -->
                  <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
    
    `
  }
};

Accounts.validateLoginAttempt((attempt) => {
  const clientIp = attempt.connection.clientAddress;

  // Is user banned?
  if (attempt.user.banned) {
    throw new Meteor.Error('something-is-wrong', 'Something went wrong, sorry :|');    
  }

  if (BlackList.findOne({ clientIp })) {
    throw new Meteor.Error('something-is-wrong', 'Something went wrong, sorry :|');
  }

  return true;
});

Accounts.onCreateUser((options, user) => {

  user._id = Random.id();
  const userId = user._id;
  user.uiState = {
    showChat: true,
    showSummaryList: false,
    craftingFilter: 'mining'
  }

  let targetServer;
  if (options.server) {
    targetServer = Servers.findOne({
      _id: options.server
    });
  } else {
    targetServer = Servers.findOne({
      name: 'Classic'
    });    
  }

  user.server = targetServer._id;

  user.tutorial = {
    hideCombat: true,
  
    highlightCombat: false,
    highlightCombatPersonalQuest: false,
    highlightCombatTower: false,
    highlightCombatAdventures: false,
    highlightCombatAbilities: false,
    highlightCombatEquipment: false,
    hideCombatEquipment: true,
    hideCombatAbilities: true,
    hideCombatGroup: true,
    hideCombatBattleLog: true,
    hideCombatTower: true,
    hideCombatPersonalQuest: true,
    hideCombatAdventures: true,

    hideInscription: true,
    highlightInscription: false,
    hideInscriptionAbilities: true,
    highlightInscriptionAbilities: false,
    hideInscriptionPigments: true,
    highlightInscriptionPigments: false,
    hideInscriptionPaper: true,
    highlightInscriptionPaper: false,

    hideFarming: true,
    highlightFarming: false,
    hideFarmingPlots: true,
    highlightFarmingPlots: false,

    hideCrafting: true,
    highlightCrafting: false,

    hideWoodcutting: true,
    highlightWoodcutting: false,

    hideMiningEquipment: true,
    highlightMiningEquipment: false,
    hideMiningMiners: true,
    highlightMiningMiners: false,
    hideMiningProspectors: true,
    highlightMiningProspectors: false,
    currentStep: 1
  }

  if (options.isGuest) {
    user.isGuest = options.isGuest;
  }

  // Mining stuff
  Skills.insert({
    type: 'mining',
    server: targetServer._id,
    createdAt: new Date(),
    owner: userId,
    xp: 0,
    username: user.username
  });

  Mining.insert({
    owner: userId,
    lastGameUpdated: new Date(),
    miners: [{
      id: MINING.miners.primitive_miner.id,
      amount: 1
    }],
    prospectors: [{
      id: MINING.prospectors.stone.id,
      amount: 1
    }]
  });

  MiningSpace.insert({
    owner: userId,
    oreId: MINING.ores.stone.id,
    health: MINING.ores.stone.healthMax,
    index: 0
  });

  for (let i = 1; i < 16; i++) {
    MiningSpace.insert({
      owner: userId,
      oreId: MINING.ores.stone.id,
      health: MINING.ores.stone.healthMax,
      index: i
    }, (err, res) => {
      
    });
  }

  addItem(ITEMS['sharp_rock_pickaxe'].id, 1, userId);

  Items.update({
    owner: userId,
    itemId: ITEMS['sharp_rock_pickaxe'].id
  }, {
    $set: {
      equipped: true,
      slot: ITEMS['sharp_rock_pickaxe'].slot
    }
  });

  // Update mining stats
  updateMiningStats(userId, true);

  // Non mining stuff
  Skills.insert({
    type: 'defense',
    createdAt: new Date(),
    owner: userId,
    server: targetServer._id,
    username: user.username
  }, (err, res) => {
    Skills.insert({
      type: 'attack',
      createdAt: new Date(),
      owner: userId,
      server: targetServer._id,
      username: user.username
    });

    Skills.insert({
      type: 'health',
      createdAt: new Date(),
      owner: userId,
      level: SKILLS.health.baseLevel,
      server: targetServer._id,
      username: user.username
    });

    Skills.insert({
      type: 'crafting',
      createdAt: new Date(),
      owner: userId,
      server: targetServer._id,
      username: user.username
    });

    Skills.insert({
      type: 'total',
      server: targetServer._id,
      createdAt: new Date(),
      owner: userId,
      username: user.username
    });

    Crafting.insert({
      owner: userId,
      currentlyCrafting: []
    });

    Combat.insert({
      server: targetServer._id,
      owner: userId,
      stats: {
        health: 50,
        healthMax: 50,
        energy: 40
      }
    });

    Adventures.insert({
      owner: userId,
      adventures: [],
      lastGameUpdated: moment().subtract(2000, 'seconds').toDate(),
      timeTillUpdate: 60 * 3
    });

    Abilities.insert({
      owner: userId,
      learntAbilities: [{
        "abilityId": "slash",
        "level": 1,
        "equipped": false,
        "slot": "mainHand",
        "currentCooldown": 0
      }]
    });

    // Update combat stats
    updateCombatStats(userId, user.username);
  });


  return user;
});

const currentFloor = Floors.findOne();

if (!currentFloor) {
  const targetServer = Servers.findOne({
    name: 'Classic'
  });
  const pointsMax = FLOORS.getNewPointCount(1, 10);

  // Create our first floor
  Floors.insert({
    floor: 1,
    server: targetServer._id,
    createdAt: new Date(),
    points: 0,
    pointsMax
  });
}

const MINUTE = 60 * 1000;
DDPRateLimiter.addRule({ type: 'method', name: 'SimpleChat.newMessage' }, 15, 1 * MINUTE);
