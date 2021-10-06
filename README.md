# fintrain [![Test and build site](https://github.com/mjaakko/fintrain/actions/workflows/test-and-publish.yml/badge.svg)](https://github.com/mjaakko/fintrain/actions/workflows/test-and-publish.yml)
Sovellus Helsingin avoimen yliopiston kurssille [Full stack -websovelluskehitys harjoitustyö](https://courses.helsinki.fi/fi/aytkt21010/129098202).

Sovellus tarjoaa käyttöliittymän [rata.digitraffic.fi:n rajapintoihin](https://www.digitraffic.fi/rautatieliikenne/).

* [Tuntikirjanpito](docs/tuntikirjanpito.md)
* [Käyttöohjeita](docs/kayttoohjeet.md)
* [Sovellus Netlifyssä](https://fintrain.malkki.xyz/)

## Ominaisuudet

* Asemat kartalla
  * Aseman hakeminen kartalta
* Aseman aikataulut reaaliaikaisena
* Junat kartalla (oletuksena pois päältä)
* Junan aikataulu reaaliaikaisena
* Junan kokoonpanon näyttäminen
* Junan haku numeron perusteella

### Kehitysideoita

* Junan hakeminen kartalta numeron perusteella
* Junien hakeminen reitin perusteella

## Kehitys lokaalisti

1. Sovelluksen ajaminen kehitystilassa: `yarn start`
2. Testien ajaminen: `yarn test`
3. Sovelluksen tuotantoversion luominen: `yarn build`
