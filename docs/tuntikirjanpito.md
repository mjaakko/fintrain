| Päivä      | Aika | Aika yht. | Mitä tein
|------------|------|-----------|------------------------
| 21.10.2019 | 2h   | 2h        | Projektin pystytystä, tutustumista rata.digitraffic.fi rajapintaan
| 24.10.2019 | 1h   | 3h        | Asemien hakeminen rajapinnasta ja näyttäminen kartalla
| 25.10.2019 | 0.5h | 3.5h      | react-routerin käyttöönotto. Metatietojen (asemat jne.) tallentaminen React contextiin
| 26.10.2019 | 2.5h | 6h        | Tutustumista rata.digitraffic.fi rajapintoihin (yhden aseman junien haku). Aseman aikataulujen hakeminen ja näyttäminen.
| 27.10.2019 | 2h   | 8h        | Pieniä korjauksia. Ensimmäinen yksikkötesti. Sovelluksen tyylien kanssa kokeilua.
| 29.10.2019 | 1h   | 9h        | Hieman koodin siistimistä. Yksittäisen junan hakeminen rajapinnasta.
| 30.10.2019 | 3h   | 12h       | Yksittäisen junan näyttäminen käyttöliittymässä. Pientä refaktorointia ja korjauksia. Datan lisenssin näyttäminen. Travis CI pystytys.
| 31.10.2019 | 2h   | 14h       | React hook käyttäjän sijainnin hakemiseen. Pieniä korjauksia mm. vaihtotyöjunien filtteröinti. React Helmetin käyttö sivun otsikon vaihtamiseen. Automaattinen deployaus git tagien perusteella Netlifyyn.
| 1.11.2019  | 0.5h | 14.5h     | Asemien nimet siistimmin. Käyttäjän sijainnin näyttäminen kartalla. Käyttöliittymän suunnittelua. rata.digitraffic.fi:n MQTT-rajapinnan tutkimista.
| 2.11.2019  | 1.5h | 16h       | Junan kokoonpanon hakeminen rajapinnasta ja näyttäminen käyttöliittymässä. Käyttöliittymän kanssa kokeiluja. 
| 4.11.2019  | 0.5h | 16.5h     | Metatietojen hakeminen siistimmin. Tyylien kanssa kokeilua.
| 7.11.2019  | 0.5h | 17h       | Myöhästymistietojen hakeminen rajapinnasta. Pientä refaktorointia.
| 11.11.2019 | 1.5h | 18.5h     | Pientä refaktorointia. Venäjän asemien oikean sijainnin näyttäminen (rajapinnasta tulee väärät koordinaatit). Venäjälle menevien junien aikataulujen näyttäminen paikallisessa ajassa. Nappi, jolla voi siirtyä kartalla omaan sijaintiin.
| 14.11.2019 | 2h   | 20.5h     | Junan myöhästymisen syyn näyttäminen. Taulukot paremmin näkyviin mobiilissa. Pieniä bugikorjauksia. Netlifyn säätöä.
| 19.11.2019 | 3h   | 23.5h     | Junien reaaliaikainen sijaintitieto rata.digitraffic.fi:n MQTT-rajapinnasta. Perutun pysähdyksen näyttäminen. Mahdollisuus yrittää metatietojen lataamista uudelleen virhetilanteessa. Yksikkötestejä.
| 25.11.2019 | 2h   | 25.5h     | Bugikorjauksia. Vain päivittyneen tiedon hakeminen rajapinnasta `version`-parametrilla.
| 3.12.2019  | 1.5h | 27h       | Datan hakemisen korjaus (`version`-parametri ei toimi halutulla tavalla). Selitykset vaunujen ominaisuuksille. Pieniä korjauksia ja parannuksia. Tällä hetkellä kulussa olevien junien hakeminen rajapinnasta.
| 18.12.2019 | 1.5h | 28.5h     | Pieniä korjauksia (asemien sijainnit, puuttuva asema, laiturinumerosta etunollat pois). Jatkoa reaaliaikaisen paikkatiedon näyttämiselle.
| 20.12.2019 | 0.5h | 29h       | Metatietojen tallentaminen välimuistiin. Tuntemattoman myöhästymisen näyttäminen kaikilla seuraavilla asemilla.
| 16.1.2020  | 2.5h | 31.5h     | Refaktorointia, korjauksia reaaliaikaisen paikkatiedon hakemiseen. React-komponentteja paikkatiedon näyttämiseen kartalla.
| 19.1.2020  | 1.5h | 33h       | Junien sijainnit näkymään kartalle
| 30.1.2020  | 2.5h | 35.5h     | Asetuksien tallentaminen sessionStorageen. Kartan keskittäminen käyttäjän sijaintiin, kun sovellus avataan. Pieniä korjauksia.
| 1.2.2020   | 0.5h | 36h       | Korjaus aseman ohittaneiden junien filtteröintiin. Selkeämpi viesti, jos junaa ei löydy tai lataamisessa tapahtuu virhe.
| 5.2.2020   | 2.5h | 38.5h     | Ilmoitus, jos juna on kokonaan peruttu. Käännösten tekeminen ja `react-i18next`:iin tutustumista.
| 6.2.2020   | 1h   | 39.5h     | Komponenttien tekstien lataaminen käännöksistä.
| 11.2.2020  | 1h   | 40.5h     | Oletuskielen valinta, komponentti kielen vaihtamiseen.
| 12.2.2020  | 5.5h | 46h       | Bugikorjauksia. Junan operaattorin nimen näyttäminen. Matkustajakäytössä olemattomien asemien nimen näyttäminen (esim. museojunia varten). Ilmoitus, jos juna on epäsäännöllistä liikennettä. Sivu junien hakemiseen.
| 13.2.2020  | 1h   | 47h       | Junahaun parantamista, linkki hakuun yläpalkkiin. Aikojen ja päivien muotoilu valitun lokaalin mukaisesti. Pientä testien säätöä.
| 22.2.2020  | 1h   | 48h       | "Korjauksia" rajapinnasta tulevaan dataan: "toteutumatiedon" näyttäminen asemilta, joilla sitä ei ole saatavilla + junan kokoonpanojen yhdistäminen, jos kokoonpano ei muutu matkalla
| 29.2.2020  | 0.5h | 48.5h     | Komponentti asemien hakemiseen
| 2.3.2020   | 2h   | 50.5h     | Kartan tilan tallentaminen React Contextiin. Jatkoa asemien haulle: kartan siirtäminen aseman kohdalle ja popupin avaaminen, kun asema valitaan tuloksista. Refaktorointia. Pieniä bugikorjauksia.
| 6.3.2020   | 0.5h | 51h       | Säätöä kartan siirtämisen kanssa, kun asema valitaan hausta.
| 8.3.2020   | 1h   | 52h       | Asemahaun viimeistely. Aseman ohittaneiden junien filtteröinnin korjaus.
| 9.3.2020   | 0.5h | 52.5h     | Korjauksia oletuslokaalin tunnistamiseen ja aikojen muotoiluun.
| 10.3.2020  | 1.5h | 54h       | Parempi menu mobiililaitteille. Muita pieniä korjauksia.
| 11.2.2020  | 0.5h | 54.5h     | Bugikorjauksia
