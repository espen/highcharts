// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['gb-ay', 0],
    ['gb-3270', 1],
    ['gb-hi', 2],
    ['gb-ab', 3],
    ['gb-ps', 4],
    ['gb-wi', 5],
    ['gb-ke', 6],
    ['gb-7398', 7],
    ['gb-gc', 8],
    ['gb-lc', 9],
    ['gb-de', 10],
    ['gb-dn', 11],
    ['gb-om', 12],
    ['gb-hl', 13],
    ['gb-7122', 14],
    ['gb-bw', 15],
    ['ie-1510', 16],
    ['ie-ky', 17],
    ['ie-dl', 18],
    ['ie-491', 19],
    ['gb-di', 20],
    ['gb-fl', 21],
    ['gb-ng', 22],
    ['gb-st', 23],
    ['gb-so', 24],
    ['gb-wr', 25],
    ['gb-7142', 26],
    ['gb-fe', 27],
    ['ie-mn', 28],
    ['ie-gy', 29],
    ['ie-ck', 30],
    ['ie-2363', 31],
    ['ie-wd', 32],
    ['ie-1528', 33],
    ['ie-dn', 34],
    ['ie-lh', 35],
    ['ie-mh', 36],
    ['ie-oy', 37],
    ['ie-ke', 38],
    ['ie-wx', 39],
    ['ie-kk', 40],
    ['ie-ls', 41],
    ['ie-ty', 42],
    ['ie-rn', 43],
    ['ie-lm', 44],
    ['ie-lk', 45],
    ['ie-ce', 46],
    ['ie-1533', 47],
    ['ie-wh', 48],
    ['ie-cn', 49],
    ['gb-do', 50],
    ['gb-er', 51],
    ['gb-ea', 52],
    ['gb-gg', 53],
    ['gb-sl', 54],
    ['gb-2458', 55],
    ['gb-ed', 56],
    ['gb-ic', 57],
    ['gb-2446', 58],
    ['gb-nn', 59],
    ['gb-rf', 60],
    ['gb-sa', 61],
    ['gb-wd', 62],
    ['gb-ar', 63],
    ['gb-fk', 64],
    ['gb-zg', 65],
    ['gb-cc', 66],
    ['gb-du', 67],
    ['gb-eb', 68],
    ['gb-ml', 69],
    ['gb-wh', 70],
    ['gb-bo', 71],
    ['gb-dh', 72],
    ['gb-da', 73],
    ['gb-hp', 74],
    ['gb-mb', 75],
    ['gb-rc', 76],
    ['gb-zt', 77],
    ['gb-ha', 78],
    ['gb-zh', 79],
    ['gb-2318', 80],
    ['gb-mk', 81],
    ['gb-bu', 82],
    ['gb-bn', 83],
    ['gb-bs', 84],
    ['gb-ns', 85],
    ['gb-sj', 86],
    ['gb-2389', 87],
    ['gb-ds', 88],
    ['gb-2391', 89],
    ['gb-ht', 90],
    ['gb-cm', 91],
    ['gb-bd', 92],
    ['gb-kh', 93],
    ['gb-ne', 94],
    ['gb-nl', 95],
    ['gb-2393', 96],
    ['gb-db', 97],
    ['gb-ba', 98],
    ['gb-xb', 99],
    ['gb-bz', 100],
    ['gb-be', 101],
    ['gb-cn', 102],
    ['gb-cy', 103],
    ['gb-eg', 104],
    ['gb-ef', 105],
    ['gb-gr', 106],
    ['gb-hf', 107],
    ['gb-hu', 108],
    ['gb-it', 109],
    ['gb-kc', 110],
    ['gb-me', 111],
    ['gb-rb', 112],
    ['gb-ru', 113],
    ['gb-su', 114],
    ['gb-th', 115],
    ['gb-wf', 116],
    ['gb-ww', 117],
    ['gb-we', 118],
    ['gb-bf', 119],
    ['gb-ld', 120],
    ['gb-nm', 121],
    ['gb-bb', 122],
    ['gb-am', 123],
    ['gb-cr', 124],
    ['gb-an', 125],
    ['gb-lb', 126],
    ['gb-2347', 127],
    ['gb-mf', 128],
    ['gb-my', 129],
    ['gb-bl', 130],
    ['gb-cf', 131],
    ['gb-nw', 132],
    ['gb-lr', 133],
    ['gb-2354', 134],
    ['gb-dw', 135],
    ['gb-nd', 136],
    ['gb-cl', 137],
    ['gb-by', 138],
    ['gb-cs', 139],
    ['gb-pe', 140],
    ['gb-2301', 141],
    ['gb-gd', 142],
    ['gb-sp', 143],
    ['gb-po', 144],
    ['gb-bj', 145],
    ['gb-cp', 146],
    ['gb-mt', 147],
    ['gb-rt', 148],
    ['gb-vg', 149],
    ['gb-ca', 150],
    ['gb-np', 151],
    ['gb-ci', 152],
    ['ie-7034', 153],
    ['gb-sw', 154],
    ['ie-7035', 155],
    ['gb-la', 156],
    ['gb-ey', 157],
    ['gb-yk', 158],
    ['ie-7033', 159],
    ['gb-wx', 160],
    ['gb-bg', 161],
    ['gb-no', 162],
    ['gb-tf', 163],
    ['gb-lm', 164],
    ['gb-sb', 165],
    ['gb-dg', 166],
    ['gb-cu', 167],
    ['gb-ny', 168],
    ['gb-2420', 169],
    ['gb-tb', 170],
    ['gb-ex', 171],
    ['gb-li', 172],
    ['gb-nf', 173],
    ['gb-bh', 174],
    ['gb-hv', 175],
    ['gb-tr', 176],
    ['gb-es', 177],
    ['gb-ss', 178],
    ['gb-ws', 179],
    ['gb-hd', 180],
    ['gb-kt', 181],
    ['gb-sr', 182],
    ['gb-ox', 183],
    ['gb-sn', 184],
    ['gb-wl', 185],
    ['gb-na', 186],
    ['gb-rl', 187],
    ['gb-nt', 188],
    ['gb-hk', 189],
    ['gb-hy', 190],
    ['gb-hr', 191],
    ['gb-lt', 192],
    ['gb-lw', 193],
    ['gb-nh', 194],
    ['gb-sq', 195],
    ['gb-he', 196],
    ['gb-wc', 197],
    ['gb-tk', 198],
    ['gb-6338', 199],
    ['gb-nb', 200],
    ['gb-2367', 201],
    ['gb-7113', 202],
    ['gb-7114', 203],
    ['gb-7115', 204],
    ['gb-7116', 205],
    ['gb-2364', 206],
    ['gb-7118', 207],
    ['gb-7119', 208],
    ['gb-wt', 209],
    ['gb-ms', 210],
    ['gb-7117', 211],
    ['gb-3265', 212],
    ['gb-7130', 213],
    ['gb-7131', 214],
    ['gb-7132', 215],
    ['gb-7133', 216],
    ['gb-3266', 217],
    ['gb-7121', 218],
    ['gb-7123', 219],
    ['gb-7124', 220],
    ['gb-7125', 221],
    ['gb-7126', 222],
    ['gb-7127', 223],
    ['gb-7128', 224],
    ['gb-7129', 225],
    ['gb-3267', 226],
    ['gb-7134', 227],
    ['gb-7135', 228],
    ['gb-7136', 229],
    ['gb-2377', 230],
    ['gb-7137', 231],
    ['gb-7138', 232],
    ['gb-7139', 233],
    ['gb-7140', 234],
    ['gb-7141', 235],
    ['gb-2381', 236],
    ['gb-2388', 237],
    ['gb-7143', 238],
    ['gb-7144', 239],
    ['gb-7145', 240],
    ['gb-7146', 241],
    ['gb-7147', 242],
    ['gb-7149', 243],
    ['gb-2366', 244],
    ['gb-7150', 245],
    ['gb-7151', 246],
    ['gb-pb', 247],
    ['ie-so', 248],
    ['gb-iw', 249],
    ['gb-as', 250],
    ['gb-mo', 251],
    ['gb-ag', 252],
    ['gb-fi', 253],
    ['gb-el', 254],
    ['gb-sm', 255],
    ['gb-3577', 256],
    ['gb-co', 257],
    ['ie-mo', 258],
    ['gb-sf', 259],
    ['gb-mw', 260],
    ['ie-ww', 261],
    ['ie-ld', 262],
    ['ie-cw', 263],
    ['gb-cw', 264],
    ['gb-lu', 265],
    ['undefined', 266],
    ['gb-3271', 267],
    ['undefined', 268]
];

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'custom/british-isles-all'
    },

    title: {
        text: 'Highmaps basic demo'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/british-isles-all.js">British Isles, admin1</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }, {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['custom/british-isles-all'], 'mapline'),
        color: 'silver',
        showInLegend: false,
        enableMouseTracking: false
    }]
});
