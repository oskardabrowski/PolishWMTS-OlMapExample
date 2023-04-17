import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj";
import { get as getProjection } from "ol/proj.js";
import WMTSTileGrid from "ol/tilegrid/WMTS.js";
import { getTopLeft, getWidth } from "ol/extent.js";
import { transformExtent } from "ol/proj.js";
import { register } from "ol/proj/proj4.js";
import proj4 from "proj4/dist/proj4";

import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

const proj = getProjection("EPSG:3857");
const projectionExtent = proj.getExtent();

proj4.defs(
	"EPSG:2180",
	"+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +axis=neu +no_defs "
);
register(proj4);

const map = new Map({
	view: new View({
		projection: "EPSG:2180",
		center: fromLonLat([19, 52], "EPSG:2180"),
		zoom: 5.75,
	}),
	layers: [
		new TileLayer({
			source: new OSM(),
		}),
		new TileLayer({
			opacity: 1,
			// prettier-ignore
			extent: [
    850000.0,
    850000.0,
    100000.0,
    100000.0,
  ],
			zIndex: 1000,
			source: new WMTS({
				url: "https://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/BDOT10k",
				layer: "BDOT10k",
				matrixSet: "EPSG:2180",
				format: "image/jpeg",
				projection: getProjection("EPSG:2180"),
				tileGrid: new WMTSTileGrid({
					origin: [850000.0, 100000.0],
					matrixIds: [
						"EPSG:2180:0",
						"EPSG:2180:1",
						"EPSG:2180:2",
						"EPSG:2180:3",
						"EPSG:2180:4",
						"EPSG:2180:5",
						"EPSG:2180:6",
						"EPSG:2180:7",
						"EPSG:2180:8",
						"EPSG:2180:9",
						"EPSG:2180:10",
						"EPSG:2180:11",
						"EPSG:2180:12",
					],
					resolutions: [
						7559538.928571429, 3779769.4642857146, 1889884.7321428573,
						944942.3660714286, 472471.1830357143, 236235.59151785716,
						94494.23660714286, 47247.11830357143, 23623.559151785714,
						9449.423660714287, 4724.711830357143, 1889.8847321428573,
						944.9423660714286,
					],
				}),
				style: "default",
				tileSize: 512,
			}),
		}),
		new TileLayer({
			// extent: [850000.0, 100000.0, 850000.0, 16245085.090106],
			source: new WMTS({
				url: "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution",
				layer: "ORTOFOTOMAPA",
				matrixSet: "EPSG:2180",
				format: "image/png",
				projection: "EPSG:2180",
				tileGrid: new WMTSTileGrid({
					origin: [850000.0, 100000.0],
					resolutions: [
						8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1,
					],
					matrixIds: [
						"2180:0",
						"2180:1",
						"2180:2",
						"2180:3",
						"2180:4",
						"2180:5",
						"2180:6",
						"2180:7",
						"2180:8",
						"2180:9",
						"2180:10",
						"2180:11",
						"2180:12",
						"2180:13",
					],
					tileSize: 512,
				}),
			}),
		}),
		new TileLayer({
			opacity: 1,
			// prettier-ignore
			extent: [
				-20037508.342789244,
		    -20037508.342789244,
		    20037508.342789244,
				20037508.342789244,
			],
			zIndex: 1000,
			source: new WMTS({
				url: "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution",
				layer: "ORTOFOTOMAPA",
				matrixSet: "EPSG:3857",
				format: "image/jpeg",
				projection: getProjection("EPSG:3857"),
				tileGrid: new WMTSTileGrid({
					origin: getTopLeft(getProjection("EPSG:3857").getExtent()),
					matrixIds: [
						"EPSG:3857:0",
						"EPSG:3857:1",
						"EPSG:3857:2",
						"EPSG:3857:3",
						"EPSG:3857:4",
						"EPSG:3857:5",
						"EPSG:3857:6",
						"EPSG:3857:7",
						"EPSG:3857:8",
						"EPSG:3857:9",
						"EPSG:3857:10",
						"EPSG:3857:11",
						"EPSG:3857:12",
						"EPSG:3857:13",
						"EPSG:3857:14",
						"EPSG:3857:15",
						"EPSG:3857:16",
						"EPSG:3857:17",
						"EPSG:3857:18",
						"EPSG:3857:19",
						"EPSG:3857:20",
						"EPSG:3857:21",
						"EPSG:3857:22",
						"EPSG:3857:23",
						"EPSG:3857:24",
					],
					resolutions: [
						156543.033928041, 78271.51696402048, 39135.75848201024,
						19567.87924100512, 9783.93962050256, 4891.96981025128,
						2445.98490512564, 1222.99245256282, 611.49622628141,
						305.748113140705, 152.8740565703525, 76.43702828517625,
						38.21851414258813, 19.109257071294063, 9.554628535647032,
						4.777314267823516, 2.388657133911758, 1.194328566955879,
						0.5971642834779395, 0.2985821417389698, 0.1492910708694849,
						0.0746455354347424, 0.0373227677173712,
					],
				}),
				style: "default",
				tileSize: 512,
			}),
		}),
	],
	target: "map",
});

const map1 = new Map({
	layers: [
		new TileLayer({
			source: new OSM(),
			//  opacity: 0.3
		}),
		// new TileLayer({ source: wmtsSource, opacity: 1 }),
	],
	target: "map1",
	view: new View({
		center: fromLonLat([20, 52]),
		zoom: 5,
		projection: "EPSG:3857",
	}),
});

const wmtsParser = new WMTSCapabilities();

fetch(
	"https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution?SERVICE=WMTS&REQUEST=GetCapabilities"
)
	.then((response) => response.text())
	.then((caps) => {
		const capabilites = wmtsParser.read(caps);
		const options = optionsFromCapabilities(capabilites, {
			layer: "ORTOFOTOMAPA",
		});
		const wmtsSource = new WMTS(options);
		map1.addLayer(new TileLayer({ source: wmtsSource, opacity: 1 }));
	});

const map2 = new Map({
	layers: [
		new TileLayer({
			source: new OSM(),
			//  opacity: 0.3
		}),
		// new TileLayer({ source: wmtsSource, opacity: 1 }),
	],
	target: "map1",
	view: new View({
		center: fromLonLat([20, 52]),
		zoom: 5,
		projection: "EPSG:2180",
	}),
});

fetch(
	"https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution?SERVICE=WMTS&REQUEST=GetCapabilities"
)
	.then((response) => response.text())
	.then((caps) => {
		const capabilites = wmtsParser.read(caps);
		const options = optionsFromCapabilities(capabilites, {
			layer: "ORTOFOTOMAPA",
		});
		const wmtsSource = new WMTS(options);
		map2.addLayer(new TileLayer({ source: wmtsSource, opacity: 1 }));
	});
