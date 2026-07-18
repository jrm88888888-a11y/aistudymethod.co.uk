/* ArcadeIcons — hand-drawn pixel icon set for the Subjects Arcade.
   Dependency-free IIFE. Every icon is a pixel map (array of strings, one
   char per pixel) rendered to SVG (crispEdges) or canvas from the same data.
   Palette chars:
     . transparent   K outline #0d0a30   D deep #1a1340
     Y yellow #ffd24d   y yellow-shade #9a6a00
     C cyan #5cffe4   M magenta #ff5fa2   L lavender #7e6dff   W white #ece8ff
*/
(function () {
  'use strict';

  var PAL = {
    K: '#0d0a30', D: '#1a1340',
    Y: '#ffd24d', y: '#9a6a00',
    C: '#5cffe4', M: '#ff5fa2',
    L: '#7e6dff', W: '#ece8ff'
  };

  var MAPS = {

    /* ============ SUBJECTS (16x16) ============ */

    'art-design': [
      '................',
      '....KKKKKKK.....',
      '..KKWWWWWWWKK...',
      '.KWWWYYWWWWWWK..',
      '.KWWWYYWWWWWWK..',
      'KWCCWWWWKKKKKWK.',
      'KWCCWWWWK...KWK.',
      'KWWWWWWWK...KWK.',
      'KWMMWWWWK...KWK.',
      'KWMMWWWWKKKKKWK.',
      '.KWWWWWWWWWWWK..',
      '..KWWWWWWWWWK...',
      '...KKKKKKKKK....',
      '................',
      '................',
      '................'
    ],

    'astronomy': [
      '..............W.',
      '................',
      '.....KKKKK......',
      '....KLLLLLK.....',
      '...KLWLLLLLK....',
      '...KLLLCCLLK....',
      '..KKLLLLLLLKK...',
      '.KYYYYYYYYYYYK..',
      '..KKKKKKKKKKK...',
      '...KLLLLLLLK....',
      '...KLCCLLLLK....',
      '....KLLLLLK.....',
      '.....KKKKK......',
      '..W.............',
      '................',
      '................'
    ],

    'biology': [
      '................',
      '.......KK.......',
      '......KCCK......',
      '.....KCCCCK.....',
      '....KCCWCCCK....',
      '....KCCWCCCK....',
      '...KCCCWCCCK....',
      '...KCCCWCCCK....',
      '...KCCCWCCCK....',
      '...KCCCWCCCK....',
      '....KCCWCCK.....',
      '.....KCWCK......',
      '......KWCK......',
      '.......KWK......',
      '.......KWK......',
      '........K.......'
    ],

    'business-studies': [
      '................',
      '......KKKK......',
      '.....KKYYKK.....',
      '.....KY..YK.....',
      '...KKKKKKKKKK...',
      '..KYYYYYYYYYYK..',
      '..KYWYYYYYYYYK..',
      '..KYYYYYYYYYYK..',
      '..KKKKKYYKKKKK..',
      '..KYYYKYYKYYYK..',
      '..KYYYKKKKYYYK..',
      '..KyYYYYYYYYyK..',
      '..KyyyyyyyyyyK..',
      '...KKKKKKKKKK...',
      '................',
      '................'
    ],

    'chemistry': [
      '................',
      '.....KKKKKK.....',
      '......KWCK......',
      '......KWCK......',
      '......KWCK......',
      '......KWCK......',
      '......KWCK......',
      '.....KWCCCK.....',
      '.....KWCCCK.....',
      '....KWCMMCCK....',
      '...KWCMMMMMCK...',
      '..KWCMMWMMMMK...',
      '..KMMMMMMWMMK...',
      '..KMMMMMMMMMK...',
      '...KKKKKKKKK....',
      '................'
    ],

    'computer-science': [
      '................',
      '....K...K...K...',
      '....W...W...W...',
      '..KKKKKKKKKKKK..',
      '..KLLLLLLLLLLK..',
      '..KLKKKKKKKKLK..',
      '..KLKDDDDDDKLK..',
      '..KLKDCCCCDKLK..',
      '..KLKDCDDCDKLK..',
      '..KLKDCCCCDKLK..',
      '..KLKDDDDDDKLK..',
      '..KLKKKKKKKKLK..',
      '..KLLLLLLLLLLK..',
      '..KKKKKKKKKKKK..',
      '....W...W...W...',
      '....K...K...K...'
    ],

    'design-technology': [
      '................',
      '......KYYK......',
      '...K..KYYK..K...',
      '..KYKKKYYKKKYK..',
      '..KYYYYYYYYYYK..',
      '...KYYYYYYYYK...',
      '.KKYYYKKKKYYYKK.',
      '.KYYYK....KYYYK.',
      '.KYYYK....KYYYK.',
      '.KKYYYKKKKYYYKK.',
      '...KYYYYYYYYK...',
      '..KYYYYYYYYyYK..',
      '..KYKKKYYKKKyK..',
      '...K..KYyK..K...',
      '......KYyK......',
      '................'
    ],

    'economics': [
      '...........KK...',
      '..........KYYK..',
      '.........KYYYYK.',
      '.........KKYYKK.',
      '..........KYYK..',
      '..........KKKK..',
      '................',
      '..........KKKK..',
      '..........KCCK..',
      '.....KKKK.KCCK..',
      '.....KCCK.KCCK..',
      'KKKK.KCCK.KCCK..',
      'KCCK.KCCK.KCCK..',
      'KCCK.KCCK.KCCK..',
      'KCCK.KCCK.KCCK..',
      'KKKKKKKKKKKKKK..'
    ],

    'english-language': [
      '................',
      '..........KKK...',
      '.........KMMKK..',
      '........KMMMMK..',
      '.......KYYMMK...',
      '......KYYYYK....',
      '.....KYYYYK.....',
      '....KYYYYK......',
      '...KYYYYK.......',
      '..KWYYYK........',
      '.KWWYYK.........',
      '.KWWWK..........',
      '.KKWK...........',
      '.KKK............',
      '................',
      '................'
    ],

    'english-literature': [
      '................',
      '................',
      '...KK......KK...',
      '..KWWKK..KKWWK..',
      '.KWWWWWKKWWWWWK.',
      '.KWLWWWKKWWLWWK.',
      '.KWWWWWKKWWWWWK.',
      '.KWLWWWKKWWLWWK.',
      '.KWWWWWKKWWWWWK.',
      '.KWLWWWKKWWLWWK.',
      '..KWWWWKKWWWWK..',
      '...KKWWKKWWKK...',
      '.....KKKKKK.....',
      '................',
      '................',
      '................'
    ],

    'environmental-science': [
      '................',
      '...KK......KK...',
      '..KCCK....KCCK..',
      '.KCCCCK..KCCCCK.',
      '.KCCCCCKKCCCCCK.',
      '..KCCCKWWKCCCK..',
      '...KKKKWWKKKK...',
      '......KWWK......',
      '......KWWK......',
      '....KKKKKKKK....',
      '...KYYYYYYYYK...',
      '...KYYYYYYYyK...',
      '....KyyyyyyK....',
      '.....KKKKKK.....',
      '................',
      '................'
    ],

    'food-technology': [
      '................',
      '......KKKK......',
      '.....KMMMMK.....',
      '...KKMMMMMMKK...',
      '..KMMWMMMMMMMK..',
      '..KMWMMMMMMMMK..',
      '..KMMMMMMMMMMK..',
      '..KKKKKKKKKKKK..',
      '..KYYYYYYYYYYK..',
      '..KYyYYyYYyYYK..',
      '..KYyYYyYYyYYK..',
      '...KYyYYyYYyK...',
      '...KYYYYYYYYK...',
      '....KKKKKKKK....',
      '................',
      '................'
    ]
  };

  /* __MAPS_PART2__ */
  var MAPS2 = {

    'french': [
      '................',
      '..KKKKKKKKKKKK..',
      '.KWWWWWWWWWWWWK.',
      '.KWWWWWWWWWWWWK.',
      '.KWKKKWWKKWWWWK.',
      '.KWKWWWWKWKWWWK.',
      '.KWKKWWWKKWWWWK.',
      '.KWKWWWWKWKWWWK.',
      '.KWKWWWWKWKWWWK.',
      '.KWWWWWWWWWWWWK.',
      '..KKKKWWKKKKKK..',
      '.....KWWK.......',
      '....KWWK........',
      '....KKK.........',
      '................',
      '................'
    ],

    'german': [
      '................',
      '..KKKKKKKKKKKK..',
      '.KWWWWWWWWWWWWK.',
      '.KWWWWWWWWWWWWK.',
      '.KWKKWWWKKKWWWK.',
      '.KWKWKWWKWWWWWK.',
      '.KWKWKWWKKWWWWK.',
      '.KWKWKWWKWWWWWK.',
      '.KWKKWWWKKKWWWK.',
      '.KWWWWWWWWWWWWK.',
      '..KKKKWWKKKKKK..',
      '.....KWWK.......',
      '....KWWK........',
      '....KKK.........',
      '................',
      '................'
    ],

    'spanish': [
      '................',
      '..KKKKKKKKKKKK..',
      '.KWWWWWWWWWWWWK.',
      '.KWWWWWWWWWWWWK.',
      '.KWKKKWWWKKWWWK.',
      '.KWKWWWWKWWWWWK.',
      '.KWKKKWWWKKWWWK.',
      '.KWWWKWWWWWKWWK.',
      '.KWKKKWWKKKWWWK.',
      '.KWWWWWWWWWWWWK.',
      '..KKKKWWKKKKKK..',
      '.....KWWK.......',
      '....KWWK........',
      '....KKK.........',
      '................',
      '................'
    ],

    'geography': [
      '................',
      '.....KKKKK......',
      '....KCCCCCK.....',
      '...KCLLCCCCK....',
      '..KCLLLCCWWCK...',
      '..KCCLLCCCWCK...',
      '..KCCCLLLCCCK...',
      '..KCCCCLLCCCK...',
      '..KCLCCCLLCCK...',
      '..KCLLCCCCCCK...',
      '...KCLLCCCCK....',
      '....KCCCCCK.....',
      '.....KKKKK......',
      '................',
      '................',
      '................'
    ],

    'history': [
      '................',
      '..KKKKKKKKKK....',
      '.KWKWWWWWWKWK...',
      '.KWKWWWWWWKWK...',
      '..KKWWWWWWKK....',
      '...KWLLLLWK.....',
      '...KWWWWWWK.....',
      '...KWLLLWWK.....',
      '...KWWWWWWK.....',
      '...KWLLLLWK.....',
      '..KKWWWWWWKK....',
      '.KWKWWWWWWKWK...',
      '.KWKWWWWWWKWK...',
      '..KKKKKKKKKK....',
      '................',
      '................'
    ],

    'maths': [
      '................',
      '................',
      '..KKKKKKKKKKK...',
      '.KYYYYYYYYYYYK..',
      '.KKKYYKKKYYKKK..',
      '...KYYK.KYYK....',
      '...KYYK.KYYK....',
      '...KYYK.KYYK....',
      '...KYYK.KYYK....',
      '...KYYK.KYYYK...',
      '...KYYK..KyYYK..',
      '...KKKK...KKK...',
      '................',
      '................',
      '................',
      '................'
    ],

    'music': [
      '................',
      '....KKKKKKKK....',
      '....KMMMMMMK....',
      '....KMMKKMMK....',
      '....KMK..KMK....',
      '....KMK..KMK....',
      '....KMK..KMK....',
      '....KMK..KMK....',
      '..KKKMK.KKMK....',
      '.KMMMMKKMMMMK...',
      '.KMMMMKKMMMMK...',
      '..KKKK..KKKK....',
      '................',
      '................',
      '................',
      '................'
    ],

    'pe': [
      '................',
      '.....KKKKK......',
      '....KWWWWWK.....',
      '...KWWWKWWWK....',
      '..KWKWWWWWKWK...',
      '..KWWWKKKWWWK...',
      '..KWWKKKKKWWK...',
      '..KWWKKKKKWWK...',
      '..KWWWKKKWWWK...',
      '..KWKWWWWWKWK...',
      '...KWWWKWWWK....',
      '....KWWWWWK.....',
      '.....KKKKK......',
      '................',
      '................',
      '................'
    ],

    'physics': [
      '................',
      '................',
      '.....KKKKKK.....',
      '...KKCCMCCCKK...',
      '..KCCKKKKKKCCK..',
      '.KCK........KCK.',
      '.KCK..KKKK..KCK.',
      '.KMK.KYYYYK.KCK.',
      '.KCK.KYWYYK.KCK.',
      '.KCK..KKKK..KMK.',
      '..KCCKKKKKKCCK..',
      '...KKCCCCCCKK...',
      '.....KKKKKK.....',
      '................',
      '................',
      '................'
    ],

    'psychology': [
      '................',
      '....KKKKKK......',
      '..KKMMMMMMKK....',
      '.KMMWMMMKMMMK...',
      '.KMWMMMMKMMMMK..',
      'KMMMMMMMKMMMMMK.',
      'KMMKKMMMKMMKKMK.',
      'KMMMMMMMKMMMMMK.',
      '.KMMMMKMKMKMMK..',
      '.KMMMMMMKMMMMK..',
      '..KMMMMMKMMMK...',
      '...KMMMMKMMK....',
      '....KKKKKKK.....',
      '................',
      '................',
      '................'
    ],

    'religious-studies': [
      '................',
      '.......KK.......',
      '......KYYK......',
      '.....KYMMYK.....',
      '.....KYMMYK.....',
      '......KYYK......',
      '.......KK.......',
      '.....KKKKKK.....',
      '.....KWWWWK.....',
      '.....KWWLWK.....',
      '.....KWWWWK.....',
      '.....KWWWWK.....',
      '....KKKKKKKK....',
      '...KLLLLLLLLK...',
      '....KKKKKKKK....',
      '................'
    ],

    'sociology': [
      '................',
      '..KKK......KKK..',
      '.KLLLK....KMMMK.',
      '.KLLLK....KMMMK.',
      '..KKK.KKKK.KKK..',
      '.KLLLKKCCKKMMMK.',
      'KLLLLKKCCKKMMMMK',
      'KLLLLKKCCKKMMMMK',
      'KKKKKKKCCKKKKKKK',
      '...KKCCCCCCKK...',
      '..KCCCCCCCCCCK..',
      '..KCCCCCCCCCCK..',
      '..KKKKKKKKKKKK..',
      '................',
      '................',
      '................'
    ]
  };

  /* __MAPS_PART3__ */
  var MAPS3 = {

    /* ============ CABINETS (16x16) ============ */

    'daily-drill': [
      '................',
      '...KK......KK...',
      '..KKKKKKKKKKKK..',
      '..KMMMMMMMMMMK..',
      '..KKKKKKKKKKKK..',
      '..KWWWWWWWWWWK..',
      '..KWDWDWDWDWWK..',
      '..KWWWWWWWKKWK..',
      '..KWDWDWWKYYKK..',
      '..KWWWWWKYYYYK..',
      '..KWDWWKYYMYYK..',
      '..KWWWWKYMMYYK..',
      '..KKKKKKYYYYK...',
      '.........KKK....',
      '................',
      '................'
    ],

    'wager': [
      '................',
      '.....KKKKKK.....',
      '...KKYYYYYYKK...',
      '..KYYWYYYYYYYK..',
      '..KYWYKKKYYYYK..',
      '.KYYYKYYYKYYYYK.',
      '.KYYYKYYYYYYYYK.',
      '.KYYKKKKYYYYYYK.',
      '.KYYYKYYYYYYYYK.',
      '.KYYYKYYYYYYyYK.',
      '..KYKKKKKYYyyK..',
      '..KYYYYYYYyyyK..',
      '...KKyyyyyyKK...',
      '.....KKKKKK.....',
      '................',
      '................'
    ],

    'falling-words': [
      'KKKKKKK.........',
      'KWWWWWK....W....',
      'KWWKWWK....W....',
      'KWKKKWK.........',
      'KWKWKWK..KKKKKKK',
      'KWWWWWK..KWWWWWK',
      'KKKKKKK..KWKKWWK',
      '.....W...KWKKKWK',
      '.....W...KWKKWWK',
      '..KKKKKKKKWWWWWK',
      '..KWWWWWKKKKKKKK',
      '..KWKKKWK.......',
      '..KWKWWWK.......',
      '..KWKKKWK.......',
      '..KWWWWWK.......',
      '..KKKKKKK.......'
    ],

    'conveyor': [
      '................',
      '................',
      '.....KKKKK......',
      '.....KYYYK......',
      '.....KYYyK......',
      '.....KKKKK......',
      '.KKKKKKKKKKKKKK.',
      'KLWLLLLWLLLLWLLK',
      'KLLLLLLLLLLLLLLK',
      '.KKKKKKKKKKKKKK.',
      '...KKK....KKK...',
      '..KDWDK..KDWDK..',
      '..KDDDK..KDDDK..',
      '...KKK....KKK...',
      '................',
      '................'
    ],

    'two-truths': [
      '.KKKKK..........',
      'KWWWWWK.........',
      'KWWWWWK.........',
      'KWKWKWK..KKKKK..',
      'KWWWWWK.KLLLLLK.',
      'KKWWWKK.KLLLLLK.',
      'KWKKKWK.KLKLKLK.',
      '.KWWWK..KLLLLLK.',
      '..KKK...KLKKKLK.',
      '........KKLLLKK.',
      '.........KLLLK..',
      '..........KKK...',
      '................',
      '................',
      '................',
      '................'
    ],

    'higher-lower': [
      '...KK...........',
      '..KCCK..........',
      '.KCCCCK.........',
      'KCCCCCCK........',
      'KKKCCKKK........',
      '..KCCK..........',
      '..KCCK..........',
      '..KCCK....KKKK..',
      '..KKKK....KMMK..',
      '..........KMMK..',
      '..........KMMK..',
      '........KKKMMKKK',
      '........KMMMMMMK',
      '.........KMMMMK.',
      '..........KMMK..',
      '...........KK...'
    ],

    'mob-quiz': [
      '................',
      '................',
      '..KK...KK...KK..',
      '.KLLK.KCCK.KMMK.',
      '.KLLK.KCCK.KMMK.',
      '..KK...KK...KK..',
      '....KK....KK....',
      '...KYYK..KWWK...',
      '...KYYK..KWWK...',
      '.KKKKKKKKKKKKKK.',
      'KLLCCYYWWMMCCLLK',
      'KLLCCYYWWMMCCLLK',
      '.KKKKKKKKKKKKKK.',
      '................',
      '................',
      '................'
    ],

    'memory': [
      '................',
      '.KKKKKK..KKKKKK.',
      '.KLLLLK..KWWWWK.',
      '.KLDDLK..KWYYWK.',
      '.KDLLDK..KYYYYK.',
      '.KDLLDK..KYYYYK.',
      '.KLDDLK..KWYYWK.',
      '.KLLLLK..KWWWWK.',
      '.KKKKKK..KKKKKK.',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................'
    ],

    'sort': [
      '................',
      '......KKKK......',
      '......KYYK......',
      '......KKKK......',
      '....KK....KK....',
      '...KCK....KMK...',
      '..KCK......KMK..',
      '.KCCK......KMMK.',
      '..KK........KK..',
      '................',
      'KKKKKK....KKKKKK',
      'KCCCCK....KMMMMK',
      'KCCCCK....KMMMMK',
      'KCCCCK....KMMMMK',
      'KKKKKK....KKKKKK',
      '................'
    ],

    'timeline': [
      '................',
      '................',
      '...KKK..........',
      '..KYYYK.........',
      '..KYYYK...KKK...',
      '...KKK...KCCCK..',
      '....K....KCCCK..',
      'KKKKKKKKKKKKKKKK',
      'KWWWWWWWWWWWWWWK',
      'KKKKKKKKKKKKKKKK',
      '....K......K....',
      '...KKK....KKK...',
      '..KMMMK..KLLLK..',
      '..KMMMK..KLLLK..',
      '...KKK....KKK...',
      '................'
    ]
  };

  /* __MAPS_PART4__ */
  var MAPS4 = {

    'diagram': [
      '................',
      'KKKKKKKKKKKK....',
      'KWWWWWWWWWWK....',
      'KWCCCWKKKKWK....',
      'KWCCCWWWWWWK....',
      'KWCCCWKKKKWK....',
      'KWWWWWWWWWKKK...',
      'KWKKKKWWWKMMMK..',
      'KKKKKKKKKKMWMK..',
      '.........KMMMK..',
      '..........KMK...',
      '...........K....',
      '................',
      '................',
      '................',
      '................'
    ],

    'quiz': [
      '................',
      '.KKKKKKKKKKKKK..',
      'KYWYYYYYYYYYYYK.',
      'KWYYYKKKKKYYYYK.',
      'KYYYKKYYYKKYYYK.',
      'KYYYKKYYYKKYYYK.',
      'KYYYYYYYKKYYYYK.',
      'KYYYYYYKKYYYYYK.',
      'KYYYYYKKYYYYYYK.',
      'KYYYYYKKYYYYYyK.',
      'KYYYYYYYYYYYYyK.',
      'KYYYYYKKYYYYYyK.',
      'KYYYYYKKYYYyyyK.',
      'KyYYYYYYYYyyyyK.',
      '.KKKKKKKKKKKKK..',
      '................'
    ],

    'anagram': [
      'KKKKKKK.........',
      'KWWWWWK.....KK..',
      'KWWKWWK.KKKKKCK.',
      'KWKKKWK.KCCCCCCK',
      'KWKWKWK.KKKKKCK.',
      'KWWWWWK.....KK..',
      'KKKKKKK.........',
      '................',
      '................',
      '.........KKKKKKK',
      '..KK.....KWWWWWK',
      '.KCKKKKK.KWKKKWK',
      'KCCCCCCK.KWWKWWK',
      '.KCKKKKK.KWKKKWK',
      '..KK.....KWWWWWK',
      '.........KKKKKKK'
    ],

    'crossword': [
      '................',
      '.KKKKKKKKKKKKK..',
      '.KWWKWWKDDKWWK..',
      '.KWWKWWKDDKWWK..',
      '.KKKKKKKKKKKKK..',
      '.KDDKWWKWWKWWK..',
      '.KDDKWWKWWKWWK..',
      '.KKKKKKKKKKKKK..',
      '.KWWKWWKWWKDDK..',
      '.KWWKWWKWWKDDK..',
      '.KKKKKKKKKKKKK..',
      '.KWWKDDKWWKWWK..',
      '.KWWKDDKWWKWWK..',
      '.KKKKKKKKKKKKK..',
      '................',
      '................'
    ],

    'hangman': [
      '................',
      '.KKKKKKKKKKKKK..',
      '.KLLLLLLLLLLLK..',
      '.KLWLLLLLLLLLK..',
      '.KLWLMMLLMMLLK..',
      '.KLLMMMMMMMMLK..',
      '.KLLMMMMMMMMLK..',
      '.KLLMMWMMMMMLK..',
      '..KLLMMMMMMLK...',
      '..KLLLMMMMLLK...',
      '...KLLLMMLLK....',
      '....KLLLLLK.....',
      '.....KLLLK......',
      '......KLK.......',
      '.......K........',
      '................'
    ],

    'pairs': [
      '.......W........',
      '......WWW.......',
      '.......W........',
      'KKKKKKK.KKKKKKK.',
      'KWWWWWK.KWWWWWK.',
      'KWMWMWK.KWMWMWK.',
      'KMMMMMK.KMMMMMK.',
      'KWMMMWK.KWMMMWK.',
      'KWWMWWK.KWWMWWK.',
      'KWWWWWK.KWWWWWK.',
      'KKKKKKK.KKKKKKK.',
      '................',
      '................',
      '................',
      '................',
      '................'
    ],

    'pacman': [
      '................',
      '.....KKKKK......',
      '...KKYYYYYKK....',
      '..KYYYKYYYYYK...',
      '..KYYYKYYKKKK...',
      '.KYYYYYYKK......',
      '.KYYYYKK........',
      '.KYYYK.....KKK..',
      '.KYYYK.....KWWK.',
      '.KYYYYKK...KKK..',
      '.KYYYYYYKK......',
      '..KYYYYYYYKKK...',
      '..KYYYYYYYYYK...',
      '...KKYYYYYKK....',
      '.....KKKKK......',
      '................'
    ],

    'invaders': [
      '................',
      '................',
      '...KK......KK...',
      '...KCK....KCK...',
      '..KKCCKKKKCCKK..',
      '.KCCCCCCCCCCCCK.',
      '.KCCKKCCCCKKCCK.',
      '.KCCKKCCCCKKCCK.',
      '.KCCCCCCCCCCCCK.',
      '..KCCCCCCCCCCK..',
      '..KCCKCCCCKCCK..',
      '..KCK.KKKK.KCK..',
      '.KCK........KCK.',
      '..KK........KK..',
      '................',
      '................'
    ],

    /* TermGuess — Wordle-style tile grid: cyan = placed, yellow = present,
       deep = absent, with one letter-like white block on a placed tile. */
    'termguess': [
      '................',
      '.KKKK.KKKK.KKKK.',
      '.KDDK.KYYK.KDDK.',
      '.KDDK.KYYK.KDDK.',
      '.KKKK.KKKK.KKKK.',
      '................',
      '.KKKK.KKKK.KKKK.',
      '.KWCK.KCCK.KYYK.',
      '.KWWK.KCCK.KYYK.',
      '.KKKK.KKKK.KKKK.',
      '................',
      '.KKKK.KKKK.KKKK.',
      '.KDDK.KYYK.KCCK.',
      '.KDDK.KYYK.KCCK.',
      '.KKKK.KKKK.KKKK.',
      '................'
    ],

    /* ============ MASCOT (24x24) ============ */

    'mascot': [
      '..........KKKK..........',
      '..........KYYK..........',
      '..........KYYK..........',
      '..........KKKK..........',
      '...........KLK..........',
      '....KKKKKKKKKKKKKKKK....',
      '...KLLLLLLLLLLLLLLLLK...',
      '...KLKKKKKKKKKKKKKKLK...',
      '...KLKDWWDDDDDDDDDKLK...',
      '...KLKDWDDDDDDDDDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDMDDDDDDDDMDKLK...',
      '...KLKDDCDDDDDDCDDKLK...',
      '...KLKDDDCCCCCCDDDKLK...',
      '...KLKKKKKKKKKKKKKKLK...',
      '...KLLLLLLLLLLLLLLLLK...',
      '....KKKKKKKKKKKKKKKK....',
      '.......KKLLLLLLKK.......',
      '..KKKKKKLLLYYLLLKKKKKK..',
      '..KCCLLKLLLYYLLLKLLCCK..',
      '..KKKKKKKLKKKKLKKKKKKK..',
      '.......KCCK..KCCK.......'
    ],

    'mascot-cheer': [
      '..........KKKK..........',
      '...W......KYYK......W...',
      '..W.W.....KYYK.....W.W..',
      '...W......KKKK......W...',
      '...........KLK..........',
      '....KKKKKKKKKKKKKKKK....',
      '...KLLLLLLLLLLLLLLLLK...',
      '...KLKKKKKKKKKKKKKKLK...',
      'KKKKLKDWWDDDDDDDDDKLKKKK',
      'KCCKLKDWDDDDDDDDDDKLKCCK',
      'KCCKLKDDCCDDDDCCDDKLKCCK',
      'KKKKLKDDCCDDDDCCDDKLKKKK',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDMDDDDDDDDMDKLK...',
      '...KLKDDCDDDDDDCDDKLK...',
      '...KLKDDDCCCCCCDDDKLK...',
      '...KLKKKKKKKKKKKKKKLK...',
      '...KLLLLLLLLLLLLLLLLK...',
      '....KKKKKKKKKKKKKKKK....',
      '.......KKLLLLLLKK.......',
      '.......KLLLYYLLLK.......',
      '.......KLLLYYLLLK.......',
      '.......KKLKKKKLKK.......',
      '.......KCCK..KCCK.......'
    ],

    'mascot-flame': [
      '..........KKKK..........',
      '..........KYYK..........',
      '..........KYYK..........',
      '..........KKKK..........',
      '...........KLK..........',
      '....KKKKKKKKKKKKKKKK....',
      '...KLLLLLLLLLLLLLLLLK...',
      '...KLKKKKKKKKKKKKKKLK...',
      '...KLKDWWDDDDDDDDDKLK...',
      '...KLKDWDDDDDDDDDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDDCCDDDDCCDDKLK...',
      '...KLKDMDDDDDDDDMDKLKK..',
      '...KLKDDCDDDDDDCDDKLKYK.',
      '...KLKDDDCCCCCCDDDKKYYYK',
      '...KLKKKKKKKKKKKKKKKYMYK',
      '...KLLLLLLLLLLLLLLLKYMYK',
      '....KKKKKKKKKKKKKKKKYYK.',
      '.......KKLLLLLLKK..KCCK.',
      '..KKKKKKLLLYYLLLKLLKCCK.',
      '..KCCLLKLLLYYLLLKKKKKKK.',
      '..KKKKKKKLKKKKLKK.......',
      '.......KCCK..KCCK.......'
    ]
  };

  /* merge parts */
  var name;
  for (name in MAPS2) { MAPS[name] = MAPS2[name]; }
  for (name in MAPS3) { MAPS[name] = MAPS3[name]; }
  for (name in MAPS4) { MAPS[name] = MAPS4[name]; }

  /* Convert a map's rows into horizontal same-colour runs (shared by both renderers). */
  function runs(map) {
    var out = [];
    for (var yy = 0; yy < map.length; yy++) {
      var row = map[yy];
      var xx = 0;
      while (xx < row.length) {
        var ch = row.charAt(xx);
        if (ch === '.' || !PAL[ch]) { xx++; continue; }
        var start = xx;
        while (xx < row.length && row.charAt(xx) === ch) { xx++; }
        out.push([start, yy, xx - start, PAL[ch]]);
      }
    }
    return out;
  }

  function svg(name, size) {
    var map = MAPS[name];
    if (!map) { return ''; }
    var n = map.length; /* square grids: 16 or 24 */
    var px = size || n * 2;
    var r = runs(map);
    var parts = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + px + '" height="' + px +
      '" viewBox="0 0 ' + map[0].length + ' ' + n +
      '" style="shape-rendering:crispEdges;image-rendering:pixelated" role="img" aria-hidden="true">'
    ];
    for (var i = 0; i < r.length; i++) {
      parts.push('<rect x="' + r[i][0] + '" y="' + r[i][1] + '" width="' + r[i][2] +
        '" height="1" fill="' + r[i][3] + '"/>');
    }
    parts.push('</svg>');
    return parts.join('');
  }

  function drawOnCanvas(ctx, name, x, y, scale) {
    var map = MAPS[name];
    if (!ctx || !map) { return; }
    var s = scale || 1;
    var r = runs(map);
    for (var i = 0; i < r.length; i++) {
      ctx.fillStyle = r[i][3];
      ctx.fillRect(x + r[i][0] * s, y + r[i][1] * s, r[i][2] * s, s);
    }
  }

  window.ArcadeIcons = {
    svg: svg,
    drawOnCanvas: drawOnCanvas,
    has: function (name) { return Object.prototype.hasOwnProperty.call(MAPS, name); },
    names: function () { return Object.keys(MAPS); },
    size: function (name) { var m = MAPS[name]; return m ? m.length : 0; }
  };
})();
