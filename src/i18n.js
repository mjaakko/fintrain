import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        and: 'and',
        loading: 'Loading',
        retry: 'Retry',
      },
      appInfo: {
        info: 'Info',
        copyrightTitle: 'Copyright',
        copyrightText:
          'Data sourced from Traffic Management Finland / <1>digitraffic.fi</1> under <3>CC 4.0 BY</3>',
      },
      frontPageSettings: {
        settings: 'Settings',
        showTrainPositions: 'Show train positions',
      },
      map: {
        yourLocation: 'Your location',
      },
      trainTimetable: {
        arrives: 'Arrival',
        departs: 'Departure',
        train: 'Train',
        station: 'Station',
        destination: 'Destination',
        track: 'Track',
      },
      station: {
        failedToLoad: 'Failed to load station data',
      },
      train: {
        notFoundTitle: 'Train not found',
        notFoundDescription:
          'Train <1>{{ trainNumber }}</1> is not running on <3>{{ date }}</3>',
        cancelled: 'The train has been cancelled',
        failedToLoad: 'Failed to load train data',
      },
      trainComposition: {
        composition: 'Composition',
        wagon: 'Wagon',
        wagonDisabled: 'Wagon has space for wheelchairs',
        wagonLuggage: 'Wagon has space for luggage',
        wagonPlayground: 'Wagon has a playground',
        wagonPet: 'Wagon has space for pets',
        wagonCatering: 'Wagon has a restaurant',
        compositionDescription:
          'Total length {{length}}m, maximum speed {{speed}}km/h',
      },
      trainTime: {
        delayed: 'Delayed',
        byUnknownTime: 'by unknown time',
        timeInMinutes: '{{time}}min',
        cancelled: 'Cancelled',
        delayCause: ' due to {{causes}}',
      },
    },
  },
  fi: {
    translation: {
      common: {
        and: 'ja',
        loading: 'Ladataan',
        retry: 'Yritä uudestaan',
      },
      appInfo: {
        info: 'Info',
        copyrightTitle: 'Käyttölupa',
        copyrightText:
          'Datan tarjoaa Traffic Management Finland / <0>digitraffic.fi</0> lisenssillä <1>CC 4.0 BY</1>',
      },
      frontPageSettings: {
        settings: 'Asetukset',
        showTrainPositions: 'Näytä junien sijainnit',
      },
      map: {
        yourLocation: 'Oma sijainti',
      },
      trainTimetable: {
        arrives: 'Saapuu',
        departs: 'Lähtee',
        train: 'Juna',
        station: 'Asema',
        destination: 'Määränpää',
        track: 'Raide',
      },
      station: {
        failedToLoad: 'Aseman tietojen lataaminen epäonnistui',
      },
      train: {
        notFoundTitle: 'Junaa ei löytynyt',
        notFoundDescription:
          'Juna <1>{{ trainNumber }}</1> ei ole kulussa <3>{{ date }}</3>',
        cancelled: 'Juna on peruttu',
        failedToLoad: 'Junan tietojen lataaminen epäonnistui',
      },
      trainComposition: {
        composition: 'Kokoonpano',
        wagon: 'Vaunu',
        wagonDisabled: 'Vaunussa on tilaa pyörätuoleille',
        wagonLuggage: 'Vaunussa on tilaa matkatavaroille',
        wagonPlayground: 'Vaunussa on leikkipaikka',
        wagonPet: 'Vaunussa on tilaa lemmikeille',
        wagonCatering: 'Vaunussa on ravintola',
        compositionDescription:
          'Kokonaispituus {{length}}m, maksiminopeus {{speed}}km/h',
      },
      trainTime: {
        delayed: 'Myöhässä',
        byUnknownTime: 'tuntemattoman ajan',
        timeInMinutes: '{{time}}min',
        cancelled: 'Peruttu',
        delayCause: ', syynä {{causes}}',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  resources,
  lng: 'en',
  nonExplicitWhitelist: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
