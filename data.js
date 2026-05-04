// data.js - 網站內容管理文件
const siteData = {
    // 1. 網站基本信息 
    basic: {
        name: "順德龍山同鄉會",
        copyrightYear: "2026",
        logo: "pict/icon.jpg" 
    },

    // 2. 主視覺輪播 
    hero: {
        slides: [
            {
                image: "pict/banner1.jpg", 
                title: "龍山情濃，家國同心",
                subtitle: "全球龍山鄉親的網上家園"
            },
            {
                image: "pict/banner2.jpg", 
                title: "鄉親團結，共創未來",
                subtitle: "歡迎新會員，共創美好未來"
            },
            {
                image: "pict/banner3.jpg", 
                title: "弘揚文化，建設家鄉",
                subtitle: "了解最新活動，參與公益事業"
            }
        ]
    },

    // 3. 會長獻辭
    president: {
        name: "胡國光",
        title: "順德龍山同鄉會會長",
        nameClass: "text-primary font-bold mt-6 text-3xl",
        photo: "pict/huizhang.jpeg", 
        paragraphs: [
            "歡迎訪問順德龍山同鄉會官方網站！作為全球龍山鄉親的橋樑和紐帶，本會始終秉承\"團結鄉親、服務鄉親、造福鄉親\"的宗旨，致力於傳承龍山文化，促進家鄉發展。",
            "近年來，在各位鄉親的大力支持下，同鄉會各項工作取得了長足進步。我們成功舉辦了多場文化交流活動，建立了完善的會員服務體系，並積極參與家鄉建設。這些成績的取得，離不開每一位鄉親的熱心參與和無私奉獻。",
            "展望未來，我們將繼續創新服務方式，拓展服務領域，為全球龍山鄉親搭建更廣闊的交流平台。衷心希望各位鄉親一如既往地關心支持同鄉會工作，共同為傳承龍山文化、促進家鄉發展貢獻力量！"
        ]
    },

    // 4. 本會動態 (6 項，包含詳情 content 和 detailImages 供彈窗使用)
    news: [
        {
            id: 1,
            date: "2026-04-25",
            title: "2026年創會62週年暨敬老大會",
            summary: "4月25日，喜迎創會六十二載華誕 弘揚敬老美德 情暖桑榆共譜和諧新篇...",
            image: "P4/P1.jpeg",
            content: "本會隆重舉行創會62週年暨敬老大會，回顧發展歷程，致敬長者奉獻，傳遞關愛溫暖，傳承孝老美德，凝心聚力共促事業新發展。",
            detailImages: [
                "P4/P1.jpeg",
                "P4/P2.jpeg",
                "P4/P3.jpeg",
                "P4/P4.jpeg",
                "P4/P5.jpeg",
                "P4/P6.jpeg",
                "P4/P7.jpeg",
                "P4/P8.jpeg",
            ]
        },
        {
            id: 2,
            date: "2026-03-14",
            title: "僑港順德龍山同鄉會第三屆花炮會",
            summary: "龍山鄉親齊聚香江 第三屆花炮盛會續寫鄉情華章...",
            image: "P3/P1.jpeg",
            content: "僑港順德龍山同鄉會第三節花炮會圓滿舉行，鄉賢雲集共敘桑梓，傳承民俗風華，凝聚鄉親向心力，同祈家邦興旺、萬事順遂。",
            detailImages: [
                "P3/P1.jpeg",
                "P3/P2.jpeg",
                "P3/P3.jpeg",
                "P3/P4.jpeg",
                "P3/P5.jpeg",
                "P3/P6.jpeg",
                "P3/P7.jpeg",
                "P3/P8.jpeg" 
            ]
        },
        {
            id: 3,
            date: "2026-02-28",
            title: "僑港順德龍山同鄉會參與香港順德人聯會新春義工頒獎禮",
            summary: "僑港順德龍山同鄉會成員齊赴新春義工頒獎禮 弘揚奉獻凝聚鄉情。",
            image: "P5/P1.jpeg",
            content: "丙午年新春，僑港順德龍山同鄉會成員齊聚香江，參與香港順德人聯會義工頒獎禮。鄉親們手持會旗合影，弘揚奉獻精神，凝聚鄉情鄉誼，展現團結風貌，共祈家邦興旺、萬事順遂。",
            detailImages: [
                "P5/P1.jpeg",
                "P5/P2.jpeg",
                "P5/P3.jpeg",
                "P5/P4.jpeg",
                "P5/P5.jpeg",
                "P5/P6.jpeg"
            ]
        },
        {
            id: 4, 
            date: "2025-02-02",
            title: "龍山觀音開庫、燒大炮民俗盛會熱鬧啟幕",
            summary: "傳統「觀音開庫」「燒大炮」民俗儀式，邀鄉親與市民共赴充滿年味與福氣的文化之約，重溫本土非遺風情。",
            image: "P1/P1.jpeg",
            content: "傳承數載的「觀音開庫」祈福儀式、熱鬧「燒大炮」民俗登場，鄉親與遊客可沉浸式體驗本土非遺風情，共赴年味濃郁的春日歡會。",
            detailImages: [
                "P1/P1.jpeg",
                "P1/P2.jpeg",
                "P1/P3.jpeg",
                "P1/P4.jpeg",
                "P1/P5.jpeg"
            ]
        },
        {
            id: 5,
            date: "2025-01-15",
            title: "僑港順德龍山同鄉會2025新春座談會於香港順利舉辦",
            summary: "繼 2024 年 4 月建會 60 週年慶典圓滿落幕后，僑港順德龍山同鄉會 2025 新春座談會於香港順利舉辦。",
            image: "P2/P1.jpeg",
            content: "海內外龍山鄉親齊聚一堂，共賀新春、暢敘鄉情，圍繞會務發展、鄉梓建設等議題建言獻策，現場暖意融融，盡顯僑心向聚的深厚情誼。",
            detailImages: [
                "P2/P1.jpeg",
                "P2/P2.jpeg",
                "P2/P3.jpeg",
                "P2/P4.jpeg",
                "P2/P5.jpeg"
            ]
        },
         {
            id: 6,
            date: "2024-03-06",
            title: "第一屆僑港順德龍山同鄉花炮會燃情启幕",
            summary: "鑼鼓喧天慶盛世，煙花璀璨映龍山。順德龍山花炮會在龍山金紫公園隆重舉行。",
            image: "P6/P1.jpeg",
            content: "來自海內外的龍山鄉親、市民遊客齊聚一堂，在漫天絢爛與歡聲笑語中，共赴這場承載著百年鄉愁與美好祈願的非遺之約，沉浸式感受順德本土民俗文化的獨特魅力。",
            detailImages: [
                "P6/P1.jpeg",
                "P6/P2.jpeg",
                "P6/P3.jpeg",
                "P6/P4.jpeg"
            ]
          }
    ],

    // 5. 龍山風采 (不變)
    gallery: [
        "pict/P21.jpg",
        "pict/P22.jpg",
        "pict/P23.jpg",
        "pict/P24.jpg",
        "pict/P25.jpg",
        "pict/P26.jpg",
        "pict/P27.jpg",
        "pict/P28.jpg"
    ],

    // 6. 聯繫我們 (不變)
    contact: {
        address: "香港九龍旺角彌敦道580號恆隆大廈12樓",
        phone: "+852 2770 8156",
        fax: "+852 2770 8156",
        email: "admin@longshan.xin",
        hours: "週一至週五 9:00-12:00",
        qrCode: "pict/huiyuan.png"
    }
};
