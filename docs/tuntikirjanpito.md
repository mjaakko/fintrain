| Päivä      | Aika | Mitä tein
|------------|------|------------------------
| 21.10.2019 | 2h   | Projektin pystytystä, tutustumista rata.digitraffic.fi rajapintaan
| 24.10.2019 | 1h   | Asemien hakeminen rajapinnasta ja näyttäminen kartalla
| 25.10.2019 | 0.5h | react-routerin käyttöönotto. Metatietojen (asemat jne.) tallentaminen React contextiin
| 26.10.2019 | 2.5h | Tutustumista rata.digitraffic.fi rajapintoihin (yhden aseman junien haku). Aseman aikataulujen hakeminen ja näyttäminen.
| 27.10.2019 | 2h   | Pieniä korjauksia. Ensimmäinen yksikkötesti. Sovelluksen tyylien kanssa kokeilua.
| 29.10.2019 | 1h   | Hieman koodin siistimistä. Yksittäisen junan hakeminen rajapinnasta.
| 30.10.2019 | 3h   | Yksittäisen junan näyttäminen käyttöliittymässä. Pientä refaktorointia ja korjauksia. Datan lisenssin näyttäminen. Travis CI pystytys.
| 31.10.2019 | 2h   | React hook käyttäjän sijainnin hakemiseen. Pieniä korjauksia mm. vaihtotyöjunien filtteröinti. React Helmetin käyttö sivun otsikon vaihtamiseen. Automaattinen deployaus git tagien perusteella Netlifyyn.
| 1.11.2019  | 0.5h | Asemien nimet siistimmin. Käyttäjän sijainnin näyttäminen kartalla. Käyttöliittymän suunnittelua. rata.digitraffic.fi:n MQTT-rajapinnan tutkimista.
| 2.11.2019  | 1.5h | Junan kokoonpanon hakeminen rajapinnasta ja näyttäminen käyttöliittymässä. Käyttöliittymän kanssa kokeiluja. 
| 4.11.2019  | 0.5h | Metatietojen hakeminen siistimmin. Tyylien kanssa kokeilua.
| 7.11.2019  | 0.5h | Myöhästymistietojen hakeminen rajapinnasta. Pientä refaktorointia.
| 11.11.2019 | 1.5h | Pientä refaktorointia. Venäjän asemien oikean sijainnin näyttäminen (rajapinnasta tulee väärät koordinaatit). Venäjälle menevien junien aikataulujen näyttäminen paikallisessa ajassa. Nappi, jolla voi siirtyä kartalla omaan sijaintiin.
| 14.11.2019 | 2h   | Junan myöhästymisen syyn näyttäminen. Taulukot paremmin näkyviin mobiilissa. Pieniä bugikorjauksia. Netlifyn säätöä.
| 19.11.2019 | 3h   | Junien reaaliaikainen sijaintitieto rata.digitraffic.fi:n MQTT-rajapinnasta. Perutun pysähdyksen näyttäminen. Mahdollisuus yrittää metatietojen lataamista uudelleen virhetilanteessa. Yksikkötestejä.
| 25.11.2019 | 2h   | Bugikorjauksia. Vain päivittyneen tiedon hakeminen rajapinnasta `version`-parametrilla.
| 3.12.2019  | 1.5h | Datan hakemisen korjaus (`version`-parametri ei toimi halutulla tavalla). Selitykset vaunujen ominaisuuksille. Pieniä korjauksia ja parannuksia. Tällä hetkellä kulussa olevien junien hakeminen rajapinnasta.
| 18.12.2019 | 1.5h | Pieniä korjauksia (asemien sijainnit, puuttuva asema, laiturinumerosta etunollat pois). Jatkoa reaaliaikaisen paikkatiedon näyttämiselle.
| 20.12.2019 | 0.5h | Metatietojen tallentaminen välimuistiin. Tuntemattoman myöhästymisen näyttäminen kaikilla seuraavilla asemilla.
| 16.1.2020  | 2.5h | Refaktorointia, korjauksia reaaliaikaisen paikkatiedon hakemiseen. React-komponentteja paikkatiedon näyttämiseen kartalla.
| 19.1.2020  | 1.5h | Junien sijainnit näkymään kartalle
| 30.1.2020  | 2.5h | Asetuksien tallentaminen sessionStorageen. Kartan keskittäminen käyttäjän sijaintiin, kun sovellus avataan. Pieniä korjauksia.
| 1.2.2020   | 0.5h | Korjaus aseman ohittaneiden junien filtteröintiin. Selkeämpi viesti, jos junaa ei löydy tai lataamisessa tapahtuu virhe.
| 5.2.2020   | 2.5h | Ilmoitus, jos juna on kokonaan peruttu. Käännösten tekeminen ja `react-i18next`:iin tutustumista.
| 6.2.2020   | 1h   | Komponenttien tekstien lataaminen käännöksistä.
| 11.2.2020  | 1h   | Oletuskielen valinta, komponentti kielen vaihtamiseen.
| 12.2.2020  | 5.5h | Bugikorjauksia. Junan operaattorin nimen näyttäminen. Matkustajakäytössä olemattomien asemien nimen näyttäminen (esim. museojunia varten). Ilmoitus, jos juna on epäsäännöllistä liikennettä. Sivu junien hakemiseen.
| 13.2.2020  | 1h   | Junahaun parantamista, linkki hakuun yläpalkkiin. Aikojen ja päivien muotoilu valitun lokaalin mukaisesti. Pientä testien säätöä.
| 22.2.2020  | 1h   | "Korjauksia" rajapinnasta tulevaan dataan: "toteutumatiedon" näyttäminen asemilta, joilla sitä ei ole saatavilla + junan kokoonpanojen yhdistäminen, jos kokoonpano ei muutu matkalla
| 29.2.2020  | 0.5h | Komponentti asemien hakemiseen
| 2.3.2020   | 2h   | Kartan tilan tallentaminen React Contextiin. Jatkoa asemien haulle: kartan siirtäminen aseman kohdalle ja popupin avaaminen, kun asema valitaan tuloksista. Refaktorointia. Pieniä bugikorjauksia.
| 6.3.2020   | 0.5h | Säätöä kartan siirtämisen kanssa, kun asema valitaan hausta.
| 8.3.2020   | 1h   | Asemahaun viimeistely. Aseman ohittaneiden junien filtteröinnin korjaus.
| 9.3.2020   | 0.5h | Korjauksia oletuslokaalin tunnistamiseen ja aikojen muotoiluun.
