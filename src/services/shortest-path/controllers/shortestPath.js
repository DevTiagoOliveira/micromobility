var geoserverUrl = "http://localhost:8080/geoserver/wfs?authkey="+geoServer.authkey+"&";

/* function to obtain vertice near to selected point */
function getVertice(pontoSelecionado) {
	var url = `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=ArqSistemas:nearest_vertex&outputformat=application/json&viewparams=x:${
		pontoSelecionado.lng
	};y:${pontoSelecionado.lat};`;
	
	$.ajax({
		url: url,
		async: false,
		success: function(data) {
			carregaVertice(
				data
			);
		}
	});
}

/* return vertice id from geoserver */
function carregaVertice(response) {
	var features = response.features;
	return features[0].properties.id;
}

/* function to obtain shortest path */
function getRota(origin, destination) {
	var url = `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=arqsistemas:shortest_path&outputformat=application/json&viewparams=source:${origem};target:${destino};`;

	$.getJSON(url, function(data) {
		//calcular a distancia caminho mais curto
		i=0;
		distancia=0;
		while (i < data.features.length) {
			distancia += data.features[i].properties.distance 
			i++;
		  }
		alert('Distancia:'+distancia.toFixed(2)+' km');
	});
}

/* Get Shortest Path */
const getShortestPath = (req, res) => {
    const origin = {};
    origin.lng = req.body.originLng;
    origin.lat = req.body.originLat;
    const destination = {};
    destination.lng = req.body.originLng;
    destination.lat = req.body.originLat;

    const originVert = getVertice(origin);
    const destinationVert = getVertice(destination);

    getRota(originVert, destinationVert);
}

/* Export */
module.exports = {
    getShortestPath
}