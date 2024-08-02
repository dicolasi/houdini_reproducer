import { createSchema, createYoga } from 'graphql-yoga';
import type { RequestEvent } from '@sveltejs/kit';

const data = [
	{
		"averageprice": 302164,
		"averagepricesa": 299394,
		"cashindex": 146.7,
		"cashonemonthpercentchange": -0.2,
		"cashprice": 281969,
		"cashsalesvolume": null,
		"cashtwelvemonthpercentchange": -2.5,
		"detachedindex": 154.9,
		"detachedonemonthpercentchange": -1,
		"detachedprice": 473127,
		"detachedtwelvemonthpercentchange": -1.7,
		"flatindex": 127.7,
		"flatonemonthpercentchange": -0.2,
		"flatprice": 242956,
		"flattwelvemonthpercentchange": -3.6,
		"fooindex": 149.9,
		"fooonemonthpercentchange": -0.5,
		"fooprice": 344842,
		"footwelvemonthpercentchange": -2.4,
		"ftbindex": 147.9,
		"ftbonemonthpercentchange": 0.9,
		"ftbprice": 251891,
		"ftbtwelvemonthpercentchange": -2,
		"index": 149,
		"indexsa": 147.6,
		"last_update": "2024-03-09T11:11:52.550222",
		"mortgageindex": 149.9,
		"mortgageonemonthpercentchange": 0.4,
		"mortgageprice": 312160,
		"mortgagesalesvolume": null,
		"mortgagetwelvemonthpercentchange": -2,
		"newindex": null,
		"newonemonthpercentchange": null,
		"newprice": null,
		"newsalesvolume": null,
		"newtwelvemonthpercentchange": null,
		"oldindex": null,
		"oldonemonthpercentchange": null,
		"oldprice": null,
		"oldsalesvolume": null,
		"oldtwelvemonthpercentchange": null,
		"onemonthpercentchange": 0.2,
		"salesvolume": null,
		"semidetachedindex": 157,
		"semidetachedonemonthpercentchange": 0.9,
		"semidetachedprice": 294838,
		"semidetachedtwelvemonthpercentchange": -0.6,
		"terracedindex": 150.3,
		"terracedonemonthpercentchange": 0.9,
		"terracedprice": 246679,
		"terracedtwelvemonthpercentchange": -3,
		"twelvemonthpercentchange": -2.1,
		"date": "01/12/2023",
		"regionname": "England"
	},
	{
		"averageprice": 313893.77267,
		"averagepricesa": 310708.44261,
		"cashindex": 152.67350177,
		"cashonemonthpercentchange": -0.435713856,
		"cashprice": 293403.21294,
		"cashsalesvolume": null,
		"cashtwelvemonthpercentchange": 8.9800361153,
		"detachedindex": 160.88158425,
		"detachedonemonthpercentchange": -0.923545771,
		"detachedprice": 491415.50349,
		"detachedtwelvemonthpercentchange": 9.9759791573,
		"flatindex": 134.4083845,
		"flatonemonthpercentchange": 0.1160168283,
		"flatprice": 255766.20322,
		"flattwelvemonthpercentchange": 7.1278871244,
		"fooindex": 156.15601119,
		"fooonemonthpercentchange": -0.357688873,
		"fooprice": 359211.40147,
		"footwelvemonthpercentchange": 9.6432410776,
		"ftbindex": 153.38983163,
		"ftbonemonthpercentchange": -0.066073304,
		"ftbprice": 261321.23957,
		"ftbtwelvemonthpercentchange": 10.119880188,
		"index": 154.73750466,
		"indexsa": 153.16725999,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 155.64269344,
		"mortgageonemonthpercentchange": -0.156219136,
		"mortgageprice": 324056.87856,
		"mortgagesalesvolume": null,
		"mortgagetwelvemonthpercentchange": 10.15030536,
		"newindex": null,
		"newonemonthpercentchange": null,
		"newprice": null,
		"newsalesvolume": null,
		"newtwelvemonthpercentchange": null,
		"oldindex": null,
		"oldonemonthpercentchange": null,
		"oldprice": null,
		"oldsalesvolume": null,
		"oldtwelvemonthpercentchange": null,
		"onemonthpercentchange": -0.23268179,
		"salesvolume": null,
		"semidetachedindex": 160.87435438,
		"semidetachedonemonthpercentchange": 0.202126355,
		"semidetachedprice": 302166.15973,
		"semidetachedtwelvemonthpercentchange": 11.176315061,
		"terracedindex": 156.87411407,
		"terracedonemonthpercentchange": -0.20518612,
		"terracedprice": 257466.84421,
		"terracedtwelvemonthpercentchange": 9.8555306125,
		"twelvemonthpercentchange": 9.8361046263,
		"date": "01/12/2022",
		"regionname": "England"
	},
	{
		"averageprice": null,
		"averagepricesa": 283267.84224,
		"cashindex": 140.09309156,
		"cashonemonthpercentchange": 0.8676176522,
		"cashprice": 269226.56975,
		"cashsalesvolume": 20474,
		"cashtwelvemonthpercentchange": 7.8922929027,
		"detachedindex": 146.28793077,
		"detachedonemonthpercentchange": -0.066966917,
		"detachedprice": 446838.94361,
		"detachedtwelvemonthpercentchange": 10.276179936,
		"flatindex": 125.46535557,
		"flatonemonthpercentchange": 0.1866751779,
		"flatprice": 238748.48099,
		"flattwelvemonthpercentchange": 3.0173065602,
		"fooindex": 142.42192192,
		"fooonemonthpercentchange": 0.3915170112,
		"fooprice": 327618.37204,
		"footwelvemonthpercentchange": 8.4900050358,
		"ftbindex": 139.29349666,
		"ftbonemonthpercentchange": 0.7632975601,
		"ftbprice": 237306.14229,
		"ftbtwelvemonthpercentchange": 7.2109694445,
		"index": 140.8803646,
		"indexsa": 139.640104,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 141.30028322,
		"mortgageonemonthpercentchange": 0.4715876726,
		"mortgageprice": 294195.17041,
		"mortgagesalesvolume": 43748,
		"mortgagetwelvemonthpercentchange": 7.8500636627,
		"newindex": 140.35965747,
		"newonemonthpercentchange": -4.622208296,
		"newprice": 342757.93685,
		"newsalesvolume": 5736,
		"newtwelvemonthpercentchange": 8.657231244,
		"oldindex": 141.2374327,
		"oldonemonthpercentchange": 1.2267811112,
		"oldprice": 282538.72046,
		"oldsalesvolume": 60048,
		"oldtwelvemonthpercentchange": 7.6102017073,
		"onemonthpercentchange": 0.5754121144,
		"salesvolume": 65784,
		"semidetachedindex": 144.70200266,
		"semidetachedonemonthpercentchange": 0.2949058594,
		"semidetachedprice": 271790.04769,
		"semidetachedtwelvemonthpercentchange": 8.7365261033,
		"terracedindex": 142.800379,
		"terracedonemonthpercentchange": 1.7016381083,
		"terracedprice": 234368.57733,
		"terracedtwelvemonthpercentchange": 7.7487980378,
		"twelvemonthpercentchange": 7.8546914213,
		"date": "01/12/2021",
		"regionname": "England"
	},
	{
		"averageprice": 264971.1174,
		"averagepricesa": 261916.0967,
		"cashindex": 129.8453187,
		"cashonemonthpercentchange": 1.066598367,
		"cashprice": 249532.7169,
		"cashsalesvolume": 23812,
		"cashtwelvemonthpercentchange": 6.886218681,
		"detachedindex": 132.6559651,
		"detachedonemonthpercentchange": 1.035590725,
		"detachedprice": 405199.8753,
		"detachedtwelvemonthpercentchange": 7.95163918,
		"flatindex": 121.790561,
		"flatonemonthpercentchange": 0.50749809,
		"flatprice": 231755.701,
		"flattwelvemonthpercentchange": 3.056553579,
		"fooindex": 131.2765373,
		"fooonemonthpercentchange": 0.946621847,
		"fooprice": 301980.2349,
		"footwelvemonthpercentchange": 7.376653372,
		"ftbindex": 129.9246685,
		"ftbonemonthpercentchange": 1.006560491,
		"ftbprice": 221345.0205,
		"ftbtwelvemonthpercentchange": 6.222619613,
		"index": 130.6205254,
		"indexsa": 129.1145183,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 131.0154843,
		"mortgageonemonthpercentchange": 0.941916431,
		"mortgageprice": 272781.6382,
		"mortgagesalesvolume": 59267,
		"mortgagetwelvemonthpercentchange": 6.778649635,
		"newindex": 129.1765452,
		"newonemonthpercentchange": 1.246011776,
		"newprice": 315448.8044,
		"newsalesvolume": 7389,
		"newtwelvemonthpercentchange": 6.597228106,
		"oldindex": 131.2491106,
		"oldonemonthpercentchange": 0.935893981,
		"oldprice": 262557.5605,
		"oldsalesvolume": 78316,
		"oldtwelvemonthpercentchange": 7.047193921,
		"onemonthpercentchange": 0.976363085,
		"salesvolume": 85705,
		"semidetachedindex": 133.0758006,
		"semidetachedonemonthpercentchange": 0.999884022,
		"semidetachedprice": 249952.8516,
		"semidetachedtwelvemonthpercentchange": 7.177880701,
		"terracedindex": 132.5308325,
		"terracedonemonthpercentchange": 1.196031645,
		"terracedprice": 217513.8671,
		"terracedtwelvemonthpercentchange": 7.826391293,
		"twelvemonthpercentchange": 6.801530413,
		"date": "01/12/2020",
		"regionname": "England"
	},
	{
		"averageprice": 248096.742,
		"averagepricesa": 245735.0352,
		"cashindex": 121.4799441,
		"cashonemonthpercentchange": 0.065930319,
		"cashprice": 233456.3987,
		"cashsalesvolume": 18388,
		"cashtwelvemonthpercentchange": 0.535315686,
		"detachedindex": 122.8846233,
		"detachedonemonthpercentchange": -0.514230524,
		"detachedprice": 375353.1474,
		"detachedtwelvemonthpercentchange": 0.579533947,
		"flatindex": 118.1783756,
		"flatonemonthpercentchange": 1.187478009,
		"flatprice": 224882.0604,
		"flattwelvemonthpercentchange": -0.899227352,
		"fooindex": 122.2579892,
		"fooonemonthpercentchange": -0.256298316,
		"fooprice": 281234.5379,
		"footwelvemonthpercentchange": 0.683359609,
		"ftbindex": 122.3135609,
		"ftbonemonthpercentchange": 0.444657395,
		"ftbprice": 208378.4238,
		"ftbtwelvemonthpercentchange": 0.678816767,
		"index": 122.3021102,
		"indexsa": 121.138,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 122.698203,
		"mortgageonemonthpercentchange": 0.103603315,
		"mortgageprice": 255464.5887,
		"mortgagesalesvolume": 50472,
		"mortgagetwelvemonthpercentchange": 0.76761162,
		"newindex": 121.1818989,
		"newonemonthpercentchange": 0.574911901,
		"newprice": 295925.8979,
		"newsalesvolume": 13033,
		"newtwelvemonthpercentchange": -1.887583351,
		"oldindex": 122.6086419,
		"oldonemonthpercentchange": 0.0363215,
		"oldprice": 245272.7165,
		"oldsalesvolume": 57508,
		"oldtwelvemonthpercentchange": 0.994122727,
		"onemonthpercentchange": 0.0925759,
		"salesvolume": 70541,
		"semidetachedindex": 124.1634932,
		"semidetachedonemonthpercentchange": -0.33975451,
		"semidetachedprice": 233213.0939,
		"semidetachedtwelvemonthpercentchange": 1.07226,
		"terracedindex": 122.9113122,
		"terracedonemonthpercentchange": 0.34739961,
		"terracedprice": 201726.0009,
		"terracedtwelvemonthpercentchange": 1.487415737,
		"twelvemonthpercentchange": 0.696719689,
		"date": "01/12/2019",
		"regionname": "England"
	},
	{
		"averageprice": 246380.1629,
		"averagepricesa": 244639.2222,
		"cashindex": 120.8331055,
		"cashonemonthpercentchange": -0.220900321,
		"cashprice": 232213.3244,
		"cashsalesvolume": 18738,
		"cashtwelvemonthpercentchange": 1.66104996,
		"detachedindex": 122.1765686,
		"detachedonemonthpercentchange": -0.784576508,
		"detachedprice": 373190.3824,
		"detachedtwelvemonthpercentchange": 2.274073048,
		"flatindex": 119.2507106,
		"flatonemonthpercentchange": 0.576151801,
		"flatprice": 226922.6105,
		"flattwelvemonthpercentchange": -0.0913227,
		"fooindex": 121.428198,
		"fooonemonthpercentchange": -0.485327905,
		"fooprice": 279325.7386,
		"footwelvemonthpercentchange": 1.826687082,
		"ftbindex": 121.488874,
		"ftbonemonthpercentchange": 0.057141181,
		"ftbprice": 206973.4533,
		"ftbtwelvemonthpercentchange": 1.44699994,
		"index": 121.455903,
		"indexsa": 120.5976865,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 121.763532,
		"mortgageonemonthpercentchange": -0.229313006,
		"mortgageprice": 253518.5509,
		"mortgagesalesvolume": 51061,
		"mortgagetwelvemonthpercentchange": 1.645949353,
		"newindex": 123.5133157,
		"newonemonthpercentchange": 1.664665469,
		"newprice": 301619.2119,
		"newsalesvolume": 13145,
		"newtwelvemonthpercentchange": 2.478350947,
		"oldindex": 121.4017594,
		"oldonemonthpercentchange": -0.465995443,
		"oldprice": 242858.4059,
		"oldsalesvolume": 56696,
		"oldtwelvemonthpercentchange": 1.709049614,
		"onemonthpercentchange": -0.226633937,
		"salesvolume": 69841,
		"semidetachedindex": 122.8462568,
		"semidetachedonemonthpercentchange": -0.101303744,
		"semidetachedprice": 230738.9626,
		"semidetachedtwelvemonthpercentchange": 2.50410189,
		"terracedindex": 121.1099044,
		"terracedonemonthpercentchange": -0.419676574,
		"terracedprice": 198769.4725,
		"terracedtwelvemonthpercentchange": 1.536764789,
		"twelvemonthpercentchange": 1.651303656,
		"date": "01/12/2018",
		"regionname": "England"
	},
	{
		"averageprice": 242377.7699,
		"averagepricesa": 240701.655,
		"cashindex": 118.8588014,
		"cashonemonthpercentchange": 0.443534203,
		"cashprice": 228419.1679,
		"cashsalesvolume": 21469,
		"cashtwelvemonthpercentchange": 4.673980943,
		"detachedindex": 119.4599618,
		"detachedonemonthpercentchange": 0.503411997,
		"detachedprice": 364892.4613,
		"detachedtwelvemonthpercentchange": 4.431493069,
		"flatindex": 119.3597131,
		"flatonemonthpercentchange": -0.040496578,
		"flatprice": 227130.0318,
		"flattwelvemonthpercentchange": 3.232515159,
		"fooindex": 119.2498759,
		"fooonemonthpercentchange": 0.488144068,
		"fooprice": 274314.8644,
		"footwelvemonthpercentchange": 4.499251178,
		"ftbindex": 119.7560047,
		"ftbonemonthpercentchange": 0.591398919,
		"ftbprice": 204021.2657,
		"ftbtwelvemonthpercentchange": 4.476428066,
		"index": 119.4828779,
		"indexsa": 118.656618,
		"last_update": "2024-03-04T03:26:42.049934",
		"mortgageindex": 119.7918193,
		"mortgageonemonthpercentchange": 0.577798815,
		"mortgageprice": 249413.3337,
		"mortgagesalesvolume": 55017,
		"mortgagetwelvemonthpercentchange": 4.435155077,
		"newindex": 120.5262522,
		"newonemonthpercentchange": 1.380580087,
		"newprice": 294324.8102,
		"newsalesvolume": 12875,
		"newtwelvemonthpercentchange": 3.921466947,
		"oldindex": 119.3618069,
		"oldonemonthpercentchange": 0.484165618,
		"oldprice": 238777.5787,
		"oldsalesvolume": 63647,
		"oldtwelvemonthpercentchange": 4.515021839,
		"onemonthpercentchange": 0.535788743,
		"salesvolume": 76522,
		"semidetachedindex": 119.8452106,
		"semidetachedonemonthpercentchange": 0.608593503,
		"semidetachedprice": 225102.1748,
		"semidetachedtwelvemonthpercentchange": 5.247955705,
		"terracedindex": 119.2768991,
		"terracedonemonthpercentchange": 0.881038062,
		"terracedprice": 195761.0851,
		"terracedtwelvemonthpercentchange": 4.759664646,
		"twelvemonthpercentchange": 4.508364954,
		"date": "01/12/2017",
		"regionname": "England"
	}
];

const yogaApp = createYoga<RequestEvent>({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
        type Query {
            uk_data_house_price_index(where: WhereInput, order_by: OrderByInput, limit: Int): [HousePriceIndex!]!
        }

        type HousePriceIndex {
            averageprice: Float
            detachedprice: Float
            semidetachedprice: Float
            terracedprice: Float
            flatprice: Float
            ftbprice: Float
            fooprice: Float
            cashprice: Float
            mortgageprice: Float
            salesvolume: Int
            cashsalesvolume: Int
            mortgagesalesvolume: Int
            newprice: Float
            oldprice: Float
            date: String
            regionname: String
        }

        input WhereInput {
            regionname: StringComparisonExp
        }

        input StringComparisonExp {
            _in: [String!]
        }

        input OrderByInput {
            date: OrderBy
        }

        enum OrderBy {
            asc
            desc
        }
		`,
		resolvers: {
			Query: {
				uk_data_house_price_index: (_, { where, order_by, limit }) => {
					console.log('Resolver called with arguments:', { where, order_by, limit });
					let filteredData = data;

					if (where?.regionname?._in) {
						filteredData = filteredData.filter(item => where.regionname._in.includes(item.regionname));
					}

					if (order_by?.date) {
						filteredData.sort((a, b) => {
							if (order_by.date === 'desc') {
								return new Date(b.date).getTime() - new Date(a.date).getTime();
							} else {
								return new Date(a.date).getTime() - new Date(b.date).getTime();
							}
						});
					}

					if (limit) {
						filteredData = filteredData.slice(0, limit);
					}

					console.log('Filtered data:', filteredData);
					return filteredData;
				}
			}
		}
	}),
	graphqlEndpoint: '/api/graphql',
	fetchAPI: { Response },
	logging: true // Enable logging
});

export const GET = yogaApp;
export const POST = yogaApp;
export const OPTIONS = yogaApp;