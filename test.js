/*
 * @Author: 749975453@qq.com
 * @Date: 2023-07-12 
 * @Last Modified by: play
 * @Last Modified time: 2023-07-12 
 */

const $ = Env('11');
//总查询多少条
var allStep = 10  
var now_step = 0
var nextId = ''
var goodsList = []

function getItemInfo(id){
    const options = {
        url: `https://mall.bilibili.com/mall-magic-c/internet/c2c/items/queryC2cItemsDetail?c2cItemsId=${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
      $.get(options, (err, resp, data) => {
        let res = JSON.parse(data);
        if (res.code === 0) {
            lockBill(res.data)
        } else {
            console.log(`查询商品详情失败`);
        }
    });
}

function lockBill(item){
    console.log('开始锁单！！！！！！！！！')
    const options = {
        url: `https://mall.bilibili.com/magic-c/c2c/order/create?buvid=C8D14199-DF6A-662E-BA20-623D70997D4663385infoc&platform=h5&uid=2054000&channel=1&vtoken=&client-type=hyg`,
        json:{
            "source":"",
            "returnUrl":`https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=${item.c2cItemsId}&from=market_mine`,
            "recId":`https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=${item.c2cItemsId}&from=market_mine`,
            "payTotalMoneyAll":Number(item.showPrice),
            "notifyPhone":"17714381606",
            "from":"",
            "failUrl":`https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=${item.c2cItemsId}&from=market_mine`,
            "deviceInfo":"WEB",
            "deviceType":2,
            "orderItems":{
                "c2cItemsId":item.c2cItemsId,
                "price":item.price,
                "showPrice":item.showPrice,
                "c2cItemsName":item.c2cItemsName,
                "c2cItemsImg":null,
                "remainSecond":item.remainSecond,
                "subItemsList":item.detailDtoList.map((subItem)=>{
                    let map = {
                        "blindBoxId": subItem.blindBoxId,
                        "subItemsSukId": subItem.skuId,
                        "subItemsSkuName": subItem.name,
                        "subItemsSkuImg": subItem.img,
                        "marketPrice": subItem.showMarketPrice,
                        "subItemsId": subItem.itemsId
                    }
                    return map
                })
            },
            "userinfo":{"id":101,"uid":null,"status":null,"provId":320000,"cityId":320100,"areaId":320105,"def":null,"name":"彭磊","phone":"17714381606","addr":"清润园","zipCode":null,"prov":"江苏省","city":"南京市","area":"建邺区","check":null}
            },
        headers: {
            "Content-Type": "application/json",
            'Cookie': "buvid4=A1ED690D-5969-BB2D-172D-2492750CEAF479304-022012420-k9ghmlaJ08frE7XQuRgsaA%3D%3D; buvid3=C8D14199-DF6A-662E-BA20-623D70997D4663385infoc; b_nut=1688824963; _uuid=451F12106-7529-194A-92ED-7AE391CDCED477125infoc; buvid_fp=7dfa9df13abda875ef37de972e4c8ac8; i-wanna-go-back=-1; FEED_LIVE_VERSION=V8; header_theme_version=CLOSE; home_feed_column=5; browser_resolution=1920-937; bp_video_offset_60992100=815121699715416000; b_ut=7; SESSDATA=bd8d636a%2C1704674353%2C10499%2A72Qow8mRxrn0ZwgNnNUaompJENT-LyYvs_VyPn7nJ7CWRtIfXf_QUXXIaFQqot1GWs7R37eQAAAAA; bili_jct=4ee9d99e18613b82d1f4ca4e82b331f1; DedeUserID=2054000; DedeUserID__ckMd5=eefb1a0b9f4fd657; CURRENT_FNVAL=4048; PVID=1; _xid=FHAFTGq0hKQDOd4ABIy0U8Nio4P3f1WdUX4ECoHDej9yXx6lS%5CL0chxhu5h5YeUXWHTF8TdEEdXsW97CFKocAIgXfgpCkE51Xq8i25mKhsrchzWCJRTp9H0pG6q1hmTM; c=eRbDYplN-1689175473786-78e74bc9df84f-1154266463; _fmdata=ZinRxYuAJdwkej9VK44V4XYzoNDhxz57%5CjfJCOeqjG99DMApT2HKksVCeo5PgFP2U94uAqGI8h0Ya7ZfutqgIB8IjZkYbhcObzhU50iyFaMdx5PGG74Iso5vmM4uNXpm; Hm_lvt_8d8d2f308d6e6dffaf586bd024670861=1689086324,1689128520,1689313661,1689418725; b_lsid=C1B3E8BC_18961A8B42E; canvasFp=99492acccf3431c906adde4a9ba459c1; webglFp=7b56da1b9cbd0a0ae2bf45cb30de8e9c; screenInfo=414*896*24; feSign=fc02484438626da32904d4778a25ce09; payParams=%7B%22customerId%22%3A11035%2C%22serviceType%22%3A0%2C%22orderId%22%3A%22402675806%22%2C%22orderCreateTime%22%3A1689564305068%2C%22orderExpire%22%3A120%2C%22feeType%22%3A%22CNY%22%2C%22payAmount%22%3A6200%2C%22originalAmount%22%3A6200%2C%22deviceType%22%3A2%2C%22deviceInfo%22%3A%22WEB%22%2C%22notifyUrl%22%3A%22http%3A//mall.bilibili.co/magic-trade/c2c/order/call-back%22%2C%22productId%22%3A%223978169385%22%2C%22productUrl%22%3A%22https%3A//mall.bilibili.com/neul-next/index.html%3Fpage%3Dmagic-market_index%26noTitleBar%3D1%22%2C%22showTitle%22%3A%22BANPRESTO%20%u65E9%u5742%u7231%20%u666F%u54C1%22%2C%22showContent%22%3A%22BANPRESTO%20%u65E9%u5742%u7231%20%u666F%u54C1%22%2C%22createIp%22%3A%22180.111.213.102%22%2C%22createUa%22%3A%22Mozilla/5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2013_2_3%20like%20Mac%20OS%20X%29%20AppleWebKit/605.1.15%20%28KHTML%2C%20like%20Gecko%29%20Version/13.0.3%20Mobile/15E148%20Safari/604.1%22%2C%22returnUrl%22%3A%22https%3A//mall.bilibili.com/neul-next/index.html%3Fpage%3Dmagic-market_detail%26noTitleBar%3D1%26itemsId%3D3978169385%26from%3Dmarket_index%22%2C%22failUrl%22%3A%22https%3A//mall.bilibili.com/neul-next/index.html%3Fpage%3Dmagic-market_detail%26noTitleBar%3D1%26itemsId%3D3978169385%26from%3Dmarket_index%22%2C%22extData%22%3A%22%7B%5C%22orderId%5C%22%3A4000656241862368%7D%22%2C%22traceId%22%3A%22107889fa732fc3387ff270d2d664b4b4%22%2C%22timestamp%22%3A1689564305083%2C%22version%22%3A%221.0%22%2C%22signType%22%3A%22MD5%22%2C%22sign%22%3A%2268facc363c5109868a1f378b9fb56cc5%22%2C%22defaultChoose%22%3A%22alipay%22%2C%22extParams%22%3A%22%7B%5C%22psExt%5C%22%3A%7B%5C%22optType%5C%22%3A%5C%22jzbps_out%5C%22%7D%2C%5C%22profitSharing%5C%22%3A%5C%22jzbPs%5C%22%7D%22%2C%22uid%22%3A2054000%2C%22mobiApp%22%3Anull%7D"
        }
    };
    $.post(options, (err, resp, res) => {
        res = JSON.parse(res)
        if(!res) { return }
        if(res.code == 0){
            let payParams  = escape(res.data.payInfo)
            console.log('锁单完成！！！！！！！！！payParams如下：')
            console.log('------------------------------------------------------------------------')
            console.log(payParams)
            console.log('------------------------------------------------------------------------')
            console.log('------------------------------------------------------------------------')
            let msg = '${item.c2cItemsName} 现在价格是${item.showPrice},锁单完成！！！！！！！！！,请去日志中提取'
            $.get({url:`http://124.220.178.216:5701/send_private_msg?user_id=749975453&message=${msg}`,})     
        }else{
            console.log('锁单失败',res)
        }
    });
}
function analysisAction(){
  let arrary = goodsList
  for(let i of arrary){
      for(let t of checkList){
          if(i.c2cItemsName == t.name){
            if(Number(i.showPrice) <= Number(t.price)){
                let msg = `https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail%26noTitleBar=1%26itemsId=${i.c2cItemsId}%26from=market_index，${i.c2cItemsName} 现在价格是${i.showPrice}` 
                $.get({url:`http://124.220.178.216:5701/send_private_msg?user_id=749975453&message=${msg}`,})
                console.log(`${i.c2cItemsName} 现在价格是${i.showPrice},开始查询商品详情`);     
                getItemInfo(i.c2cItemsId)
                // $.get({url:`https://sctapi.ftqq.com/SCT216214TOLRSnmFURebyHRcr7gaqO0yh.send?title=好价&desp=${msg}&channel=9`,})
            }
          }
      }
  } 
}
function bilibiliGoodsSearch(){
    const options = {
        url: `https://mall.bilibili.com/mall-magic-c/internet/c2c/v2/list`,
        json: {
            nextId:nextId.length == 0?null:nextId
            // categoryFilter: "2312"
        },
        headers: {
            "Content-Type": "application/json",
            // 'Cookie': "buvid3=4054D32F-ED8A-E7E1-F039-2320DBBB968B28569infoc; b_nut=1680055228; _uuid=177D99AC-67FB-2D710-C7DF-5F3247FD1048A28031infoc; home_feed_column=5; header_theme_version=CLOSE; CURRENT_FNVAL=4048; buvid4=F6F8CB97-79FB-1FB9-9D9E-F05AF2904C6319117-022012016-k9ghmlaJ08frE7XQuRgsaA%3D%3D; DedeUserID=2054000; DedeUserID__ckMd5=eefb1a0b9f4fd657; i-wanna-go-feeds=-1; b_ut=5; LIVE_BUVID=AUTO3716800552747931; i-wanna-go-back=2; rpdid=|(J~J|~l)J|)0J'uY)||lllul; buvid_fp_plain=undefined; nostalgia_conf=-1; hit-new-style-dyn=1; hit-dyn-v2=1; CURRENT_PID=a377e350-cf06-11ed-b33b-298e5b406643; is-2022-channel=1; CURRENT_QUALITY=80; Hm_lvt_8d8d2f308d6e6dffaf586bd024670861=1688458507,1688778164; SESSDATA=4270fa67%2C1704462760%2Cd4361%2A71J0hRvBJ1aR6pgMIeaXrmiElRnLewip9cUTtEUqzgnueNw1yQwclkKzNUAkyNGRRjth2IWgAAAAA; bili_jct=6ba68dc6548b509d9fc09b64b30c977b; _xid=TdQLVbxCFLM%5C49BTzP8UJxOw80B5LNLzrTf81LphQJxpaUM87pVVIjtCYXpL7JvjT1Vp5uB97D6ov0fxG1orzT4Ga7n4jCbkydzNPnLFLepBbp95flXDvaZ7n26OOjo2; c=I6T5GRYZ-1688966928577-510ce0a3f902b445327547; _fmdata=qJDlnILpNbRTy1nsaSMrrMeUwbw9q72A1lmh1%5CDedcMvsFOpRxRgALrzf62HmdGb3OZv2R2GeR1BEiORwdquNrx65IDEClHQaQFzpn4OPWVbSPz7AmTpfJdyFf4SdKBh; fingerprint=8ce4953f090f1031788feadd86f57cb7; buvid_fp=8ce4953f090f1031788feadd86f57cb7; sid=n4dbcu9h; b_lsid=85DDCC3C_1894889647B; PVID=1; bp_video_offset_2054000=817329300023804000"
        }
    };
    $.post(options, (err, resp, res) => {
        res = JSON.parse(res)
        if(!res) { return }
        if(res.code == 0){
            //精简内容 优化 数组
            res.data.data = res.data.data.map((item)=>{
                return item
            })
            let arrary = goodsList
            arrary = arrary.concat(res.data.data)
            goodsList = arrary
            nextId = res.data.nextId
            now_step += res.data.data.length
            if(now_step < allStep){
                setTimeout(()=>{
                    bilibiliGoodsSearch()
                },2000)
            }else{
                analysisAction()
            }
        }
    });
}


//检查数组 名称匹配
const checkList=[
  {
    "name": " F:NEX 初音未来  2021Ver. 手办 附独家特典",
    "price": 1000
  },
  {
    "name": "WINGSinc. RFB 手办",
    "price": 450
  },
  {
    "name": "BANPRESTO 食蜂操祈  Relax time 景品",
    "price": 60
  },
  {
    "name": "赛琳娜 Q版手办 进阶大礼包",
    "price": 110
  },
  {
    "name": "F:NEX 魔女之旅 伊蕾娜 针织连衣裙ver. 手办",
    "price": 600
  },
  {
    "name": "Knead 黛朵 重装版 手办",
    "price": 1100
  },
  {
    "name": "Union Creative 马尾辫女孩 手办",
    "price": 300
  },
  {
    "name": " F:NEX 初音未来  真夏花火Ver. 手办",
    "price": 900
  },
  {
    "name": "BANPRESTO 朱菜 景品手办",
    "price": 60
  },
  {
    "name": "RIBOSE RISE UP 明日方舟 阿米娅 庆典时光Ver. 手办 再版",
    "price": 120
  },
  {
    "name": "Union Creative 原创 一夜酱 手办",
    "price": 600
  },
  {
    "name": "TAITO 千反田爱瑠 景品手办",
    "price": 80
  },
  {
    "name": "菲娜・法姆・阿修莱特 15周年纪念 手办 进阶大礼包",
    "price": 450
  },
  {
    "name": "阅文好物 萧薰儿 手办",
    "price": 180
  },
  {
    "name": "RIBOSE 阿米娅 庆典时光Ver. 手办 再版",
    "price": 120
  },
  {
    "name": "Union Creative 海军娘 绯红 手办 再版",
    "price": 300
  },
  {
    "name": "GSC 初音未来 Rose Cage Ver.  手办",
    "price": 1000
  },
  {
    "name": "BANPRESTO 由比滨结衣 景品手办",
    "price": 60
  },
  {
    "name": "TAITO 喜多川海梦 ～黒江雫 ver.～ 景品",
    "price": 80
  },
  {
    "name": "F:NEX Re:从零开始的异世界生活 雷姆&拉姆 手办",
    "price": 1400
  },
  {
    "name": "Union Creative 赫敏 泳装Ver. 手办",
    "price": 500
  },
  {
    "name": "世嘉 香风智乃 景品手办",
    "price": 60
  },
  {
    "name": "WAVE 碧蓝航线 天狼星 纯白蔷薇ver. 手办",
    "price": 650
  },
  {
    "name": "APEX 鹬 散花舞鹤Ver. 手办",
    "price": 450
  },
  {
    "name": "elCOCO 国见玉　手办",
    "price": 80
  },
  {
    "name": "GOLDEN HEAD 碧蓝航线 光辉 μ兵装 手办",
    "price": 1600
  },
  {
    "name": "阅文好物 萧薰儿 少女 手办",
    "price": 180
  },
  {
    "name": "哔哩哔哩 阿梓 手办",
    "price": 95
  },
  {
    "name": "BANPRESTO 市川雏菜 景品",
    "price": 55
  },
  {
    "name": "ALTER 天狼星 碧波青云Ver.手办",
    "price": 900
  },
  {
    "name": "BEMOE Vsinger 洛天依 亚克力流沙立牌 恋人",
    "price": 45
  },
  {
    "name": "Phat! 葛饰北斋 手办",
    "price": 1600
  },
  {
    "name": "不知火 夜火离歌 手办&式波·明日香·兰格雷 Q版手办 进阶大礼包",
    "price": 900
  },
  {
    "name": "APEX 花园 正比手办",
    "price": 1200
  },
  {
    "name": "RIBOSE 明日方舟 温蒂 庆典时光 VER. 手办",
    "price": 100
  },
  {
    "name": "GSC 彼岸的新娘 手办",
    "price": 2500
  },
  {
    "name": " F:NEX 初音未来 2022新春 Ver.  手办",
    "price": 1000
  },
  {
    "name": "neonmax 肇和 手办 特典版",
    "price": 900
  },
  {
    "name": "FuRyu  伊蕾娜 手办",
    "price": 180
  },
  {
    "name": "明日方舟 风暴预测 天气瓶 再版",
    "price": 100
  },
  {
    "name": "F:NEX NO GAME NO LIFE 游戏人生 白 白无垢ver. 手办",
    "price": 800
  },
  {
    "name": "Union Creative 白 手办",
    "price": 250
  },
  {
    "name": "APEX 95式 春杪梦鸢人 Ver. 手办",
    "price": 350
  },
  {
    "name": "2233 拜年纪2021 限定Ver.手办 进阶大礼包",
    "price": 900
  },
  {
    "name": "Hobbymax 肇和 花枝映梅Ver. 手办",
    "price": 900
  },
  {
    "name": "BROCCOLI RIDDLE JOKER 三司绫濑 手办 再版",
    "price": 650
  },
  {
    "name": "WINGSinc. Kanzarin 天使 索妮娅 手办",
    "price": 520
  },
  {
    "name": "2233拜年纪2021展示盒 进阶大礼包",
    "price": 150
  },
  {
    "name": " F:NEX 罗德尼 幸福殿堂Ver. 手办",
    "price": 900
  },
  {
    "name": "Hobbymax AN-94 狼与赋格 Ver. 手办",
    "price": 650
  },
  {
    "name": "Wing A-Z:[A] 手办",
    "price": 1300
  },
  {
    "name": "Myethos 初音未来 韶华 手办",
    "price": 600
  },
  {
    "name": "擎苍 初音未来 荷塘嬉戏 Q版手办",
    "price": 150
  },
  {
    "name": "FLARE 紫色之心 吊带睡衣Ver. 手办 等2个商品",
    "price": 1400
  },
  {
    "name": "HEALING  理想的女友 家庭女仆 安妮莉娅 手办",
    "price": 320
  },
  {
    "name": "elCOCO 国见玉 手办",
    "price": 80
  },
  {
    "name": "FuRyu 初音未来 奶油汽水 景品手办",
    "price": 70
  },
  {
    "name": "BEMOE Vsinger 洛天依 亚克力流沙立牌 祭司",
    "price": 45
  },
  {
    "name": "MIMEYOI 碧蓝航线 标枪 幸福纯白ver, 手办",
    "price": 800
  },
  {
    "name": "GOOD SMILE ARTS SHANGHAI 斯洛卡伊 手办",
    "price": 400
  },
  {
    "name": "Union Creative 伊莉丝 手办",
    "price": 450
  },
  {
    "name": "Solarain  Bibi 啦啦队兔女郎 ver.  正比手办",
    "price": 500
  },
  {
    "name": "maxcute 口罩少女-尤娜 手办",
    "price": 350
  },
  {
    "name": "Union Creative 原创 Biya原画 尤娜酱 手办",
    "price": 400
  },
  {
    "name": "TAITO   伊蕾娜 景品",
    "price": 100
  },
  {
    "name": "KT model+ Fate/Samurai Remnant 宫本武藏 Berserker 手办",
    "price": 850
  },
  {
    "name": "BROCCOLI 三司绫濑 手办",
    "price": 600
  },
  {
    "name": "擎苍 初音未来 月西江 Q版手办",
    "price": 140
  },
  {
    "name": "quesQ G36 手办",
    "price": 550
  },
  {
    "name": "碧蓝航线 天狼星 碧波青云Ver. 手办 进阶大礼包",
    "price": 900
  },
  {
    "name": "neonmax 应瑞 手办",
    "price": 850
  },
  {
    "name": "Hobbymax 碧蓝航线 应瑞&肇和 比例手办",
    "price": 850
  },
  {
    "name": "ALTER 可畏 手办",
    "price": 1200
  },
  {
    "name": " F:NEX 初音未来 真夏花火Ver. 手办 特典版",
    "price": 950
  },
  {
    "name": " F:NEX 可可萝 6星Ver. 手办",
    "price": 900
  },
  {
    "name": " F:NEX 初音未来  手办",
    "price": 900
  },
  {
    "name": "APEX 碧蓝航线 花园 白雪之仪Ver. 手办",
    "price": 1200
  },
  {
    "name": "maxcute 口罩少女-尤娜  手办",
    "price": 350
  },
  {
    "name": "Oriental Forest 少女前线 FX-05 她从雨中来ver. 手办",
    "price": 500
  },
  {
    "name": "WINGSinc. 少女前线 刘易斯 迎寒客 Ver. 手办",
    "price": 500
  },
  {
    "name": "Alumina 神崎兰子 祝宴的白姬ver.手办",
    "price": 600
  },
  {
    "name": "Phat! 斯卡哈  第一再临 手办",
    "price": 700
  },
  {
    "name": "SSF M950A 正比手办",
    "price": 900
  },
  {
    "name": "WINGSinc. 佩内洛珀 盐系女仆ver. 手办",
    "price": 600
  },
  {
    "name": "HEALING 安妮莉娅  手办",
    "price": 350
  },
  {
    "name": "Plum 保登心爱 夏日祭Ver. 手办 再版",
    "price": 500
  },
  {
    "name": "Union Creative 出包王女 菈菈・萨塔琳・戴比路克 Darkness 手办 再版",
    "price": 450
  },
  {
    "name": " F:NEX 雷姆&拉姆 幼夏Ver. 手办",
    "price": 700
  },
  {
    "name": "Reverse Studio  赵灵儿 拾花集 仙灵仙踪 ver. 手办",
    "price": 720
  },
  {
    "name": "Reverse Studio 樱木真乃  花风Smiley ver. 手办",
    "price": 450
  },
  {
    "name": "Hobbymax AK-12 无冬咏叹调 Ver. 手办",
    "price": 600
  },
  {
    "name": "2233&绫波零 进阶大礼包",
    "price": 500
  },
  {
    "name": "Plum 偶像大师 灰姑娘女孩 游佐梢 甜蜜小仙子Ver. 手办 再版",
    "price": 450
  },
  {
    "name": "Myethos [C] 手办",
    "price": 400
  },
  {
    "name": "TAITO 初音未来 小美人鱼Ver.  景品手办 再版",
    "price": 90
  },
  {
    "name": "BROCCOLI RIDDLE JOKER 三司绫濑 手办 再版 ",
    "price": 600
  },
  {
    "name": "WAVE 两个人的节日 碧蓝航线 火奴鲁鲁 手办 ",
    "price": 800
  },
  {
    "name": "雷姆 古风ver. 手办 进阶大礼包",
    "price": 450
  },
  {
    "name": "Miyuki 长门有希 正比手办",
    "price": 800
  },
  {
    "name": "AOWOBOX  皮洛莎 新年Ver. 手办",
    "price": 350
  },
  {
    "name": "企业 誓约的星光Ver.普通版 进阶大礼包",
    "price": 500
  },
  {
    "name": "ANIPLEX+ 樱岛麻衣 婚纱异色版ver. 手办",
    "price": 600
  },
  {
    "name": "Phat! 约会大作战 冰芽川四糸乃 反转ver. 手办",
    "price": 650
  },
  {
    "name": "SHIBUYA SCRAMBLE FIGURE 爱蜜莉雅  手办",
    "price": 950
  },
  {
    "name": "Phat! DP-12 花月夜行灯 手办",
    "price": 600
  },
  {
    "name": "仟秋动漫 战术绵姬 手办",
    "price": 450
  },
  {
    "name": "Solarain 芦毛酱 Lucky Dealer Ver. 手办",
    "price": 400
  },
  {
    "name": "Brilliant Journey! 光辉 钟情春日Ver. 手办",
    "price": 800
  },
  {
    "name": "Union Creative 初濑伊纲 手办",
    "price": 300
  },
  {
    "name": "FuRyu 初音未来 圣诞糖果 景品手办",
    "price": 70
  },
  {
    "name": "TAITO 喜多川海梦 ～黒江雫 ver.～ 景品手办",
    "price": 70
  },
  {
    "name": "TAITO 初音未来 sporty 景品手办",
    "price": 70
  },
  {
    "name": "AniMester大漫匠 不知火 手办",
    "price": 1800
  }
]



bilibiliGoodsSearch()
// getItemInfo()

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

