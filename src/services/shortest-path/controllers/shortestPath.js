
const axios = require('axios')

const geoserverUrl = 'http://geoserver:8080/geoserver/wfs?authkey=' + "fb9f8cea-7e7d-4bff-84c1-f4185e293e66" + '&'

/* function to obtain vertice near to selected point */
function getVertice (pontoSelecionado) {
  return `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=arqsistemas:nearest_vertex&outputformat=application/json&viewparams=x:${pontoSelecionado.x};y:${pontoSelecionado.y};`
  
}

/* function to obtain shortest path */
function getRota (origin, destination) {
  return `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=arqsistemas:shortest_path&outputformat=application/json&viewparams=source:${origin};target:${destination};`

}

/* function to calculate distance */
function getDistance (response) {
  var data = response.data
  var i = 0
  var distancia = 0
  while (i < data.features.length) {
    distancia += data.features[i].properties.distance
    i++
  }
  return distancia  
}

/* Get Shortest Path */
const getShortestPath = (req, res) => {
  const origin = {}
  origin.x = req.query.xorigin
  origin.y = req.query.yorigin

  const destination = {}
  destination.x = req.query.xdestination
  destination.y = req.query.ydestination
  var originVertUrl = getVertice(origin)
  var destinationVertUrl = getVertice(destination)

  axios.get(originVertUrl)
    .then((response1) => {
    const originalVert = response1.data.features[0].properties.id
    axios.get(destinationVertUrl)
      .then((response2) => {
        const destinationVert = response2.data.features[0].properties.id
        const rotaUrl = getRota(originalVert, destinationVert)
        axios.get(rotaUrl)
          .then((response3) => {
            try {
              res.status(200)
              res.send(response3.data);
            } catch (err) {
              console.error(err);
            }
          }).catch(error => {
            console.log(error)
          })
    }).catch(error => {
      console.log(error)
    })
  }).catch(error => {
    console.log(error)
  })
}

/* Get Shortest Path Distance */
const getShortestPathDistance = (req, res) => {
  const origin = {}
  origin.x = req.query.xorigin
  origin.y = req.query.yorigin
  const destination = {}
  destination.x = req.query.xdestination
  destination.y = req.query.ydestination

  var originVertUrl = getVertice(origin)
  var destinationVertUrl = getVertice(destination)

  axios.get(originVertUrl)
    .then((response1) => {
    const originalVert = response1.data.features[0].properties.id
    axios.get(destinationVertUrl)
      .then((response2) => {
        const destinationVert = response2.data.features[0].properties.id
        const rotaUrl = getRota(originalVert, destinationVert)
        axios.get(rotaUrl)
          .then((response3) => {
            try {
              res.status(200)
              var value = getDistance(response3)
              res.send({ result: value});
            } catch (err) {
              console.error(err);
            }
          }).catch(error => {
            console.log(error)
          })
    }).catch(error => {
      console.log(error)
    })
  }).catch(error => {
    console.log(error)
  })
}

/* Export */
module.exports = {
  getShortestPath,
  getShortestPathDistance
}
