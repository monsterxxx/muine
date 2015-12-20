(function(){

'use strict';

angular.module('muineApp.services.data', [])
.factory('MuineDataSvc', function(){
  //In future, when data is pulled from server db, it should be cached
  //Data recieved in sorted order
  var sports = [{
    id: 3,
    name: 'Windsurfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '4w.jpg'
    },
    photo: {
      slides: [
        '1.jpg',
        '6.jpg',
        '7.jpg'
      ]
    },
    video: {
      slides: [
        'QkuC0lvMAX0',
        'BuYu_pOqVGM',
        'zKv_sUx9EDM'
      ]
    }
  },{
    id: 55,
    name: 'Kitesurfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1w.jpg',
      cardImg: '1w.jpg'
    },
    photo: {
      slides: [
        '1w.jpg',
        '2.jpg'
      ]
    },
    video: {
      slides: [
        'o3ttzu5VWII',
        'Gup_JcxSO2o'
      ]
    }
  },{
    id: 87,
    name: 'Surfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '1.jpg'
    },
    photo: {
      slides: [
        '1.jpg'
      ]
    },
    video: {
      slides: [

      ]
    }
  },{
    id: 49,
    name: 'SUP',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '1.jpg'
    },
    photo: {
      slides: [
        '1.jpg'
      ]
    },
    video: {
      slides: [

      ]
    }
  }];

  var clubs = [{
    id: 49,
    name: 'Kitesurf Vietnam',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '1.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 3,
    name: 'Rids',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '1.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 23,
    name: 'Surf4You',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '2.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 87,
    name: 'VKS',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '1.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 28,
    name: 'Leto',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '2.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 99,
    name: "Jibe's",
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '1.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard',
        'Cabrinha',
        'Ocean rodeo'
      ]
    }
  },{
    id: 115,
    name: 'Source Kiteboarding',
    sports: [{
      id: 3,
      name: 'Windsurfing'
    },{
      id: 55,
      name: 'Kitesurfing'
    },{
      id: 87,
      name: 'Surfing'
    },{
      id: 49,
      name: 'SUP'
    }],
    spots: [{
      id: 49,
      name: 'Suoi Nuoc'
    }],
    home: {
      bgImg: '2.jpg',
      cardLogo: '3.jpg',
      cardAvatar: '4w.jpg',
      cardTopBackground: '#0e0e0e',
      welcome: 'We welcome you in our club and hope to build strong relationship for the future!',
      pros: [
        'Surf trips to secret spot',
        'More than 40 sails and boards',
        'Special prices for Surf Hotel guests'
      ],
      languages: [
        'Vietnameese',
        'English',
        'Russian',
        'German',
        'French'
      ],
      equipment: [
        'JP Australia',
        'Starboard'
      ]
    }
  }];
  var spots = [{
    id: 3,
    name: 'Muine overview',
    home: {
      bgImg: '1.jpg'
    }
  },{
    id: 55,
    name: 'Nga Tro',
    home: {
      bgImg: '2.jpg'
    }
  },{
    id: 87,
    name: 'Tro Nka',
    home: {
      bgImg: '1.jpg'
    }
  },{
    id: 49,
    name: 'Suoi Nuoc',
    home: {
      bgImg: '2.jpg'
    }
  }];
  var data = {
    sports: sports,
    clubs: clubs,
    spots: spots
  };
  return {
    getData: function(){
      return data;
    },
    getDataKey: function (dataKey) {
      return data[dataKey];
    }
  };
});

})();
