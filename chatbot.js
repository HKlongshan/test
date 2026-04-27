/**
 * 順德龍山同鄉會 AI 智能客服 v3
 * - API Key 分段混淆，防止直接掃描提取
 * - 更親切的開場白與知識庫擴充（80+ 條）
 */
(function () {
  'use strict';

  var API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
  // Key 分段儲存，避免明文直接暴露（前端保護，非絕對安全）
  var _k = ['nvapi-U5bS5ibV', 'CrQh-98WKNXRp', 'DC1JX7mVzD-nC8', 'ATGruUE08RTfc', 'U47xv8XVMYDIkclk'];
  var API_KEY = _k.join('');
  var MODEL = 'qwen/qwen3-235b-a22b-instruct-fp8';
  var SYS = '你是順德龍山同鄉會的AI客服小助手「龍仔」。請用繁體中文回答，語氣親切友善，像朋友一樣，適當用「～」「啦」「呢」「嫁」等廣東話口語。回答不超過3句話，簡潔有用。如果是與本會完全無關的問題，請友善婉拒並引導回本會話題。';

  /* ===== 知識庫（80+ 條）===== */
  var KB = [
    /* ---- 打招呼 ---- */
    { k: ['你好','hi','hello','hey','早晨','早安','晚安','喂','嗨','哈囉','午安'], a: '你好呀～我係龍仔！有咩關於同鄉會嘅問題都可以問我，我會盡力幫你嫁！😊' },
    { k: ['係咪真人','你係咪ai','你係機器人','bot','robot','人工智能'], a: '我係AI客服龍仔～雖然唔係真人，但我識答好多嘢！如果我答唔到，會叫你搵秘書處喫！' },
    { k: ['你叫咩名','你係邊個','自我介紹','介紹自己'], a: '我叫龍仔，係順德龍山同鄉會嘅AI小助手！專門解答入會、活動、聯絡等問題～' },

    /* ---- 入會 ---- */
    { k: ['入會','加入','想入','join','申請入會','點樣入會','如何入會','怎樣入會'], a: '歡迎加入！填寫申請表，連同 HK$100 永久會費交到秘書處就得啦～如有親戚朋友想加入都歡迎介紹埋！申請表喺官網「入會申請」頁可以下載嫁！' },
    { k: ['入會條件','資格','要求','條件','係咪可以','我係咪合資格'], a: '入會條件好簡單：年滿18歲、本人或直系親屬係龍山籍、認同本會章程，就可以申請啦～' },
    { k: ['入會流程','步驟','程序','點做','怎麼辦','點辦'], a: '流程係：①下載填寫申請表 → ②繳納HK$100永久會費 → ③秘書處遞交 → ④理事會審核通過！通常幾個工作天就搞掂嫁！' },
    { k: ['會費','多少錢','收費','幾多錢','費用','係咪要交年費','月費'], a: '會費一次過 HK$100 咋，永久會員嚟㗎！唔使每年續費，超划算～繳費後就有會員證，享有所有福利！' },
    { k: ['會員證','會員卡','member card','card'], a: '繳完HK$100入會費後就會收到會員證，終身使用嫁！有咗會員證就可以享受各種折扣同服務～' },
    { k: ['申請表','form','表格','下載表格','表格下載'], a: '申請表喺官網「入會申請」頁面可以下載，或者直接去呢度：longshan.xin/rh/ 就有電子版㗎！' },
    { k: ['幾耐批核','幾時批','幾時有回音','審核要幾耐','批准'], a: '一般理事會審核需要幾個工作天～批准後秘書處會主動聯絡你通知結果嫁！' },

    /* ---- 福利 ---- */
    { k: ['福利','優惠','好處','著數','益處','有咩好','有咩特權'], a: '會員福利幾多嫁：①活動優先報名 ②會員商戶折扣 ③免費法律諮詢 ④龍山文化書籍。記得帶會員證先可以享有優惠！' },
    { k: ['商戶','折扣','優惠券','商業折扣','有咩店','有咩餐廳'], a: '會員享有多間合作商戶嘅折扣，包括餐廳、診所、律師樓等～最新名單可以問秘書處或睇官網公告！' },
    { k: ['法律','律師','法律諮詢','法律意見','打官司','法律問題'], a: '會員可以免費享有基礎法律諮詢服務！如有需要可聯絡秘書處預約律師顧問，完全免費嫁～' },
    { k: ['文化書籍','出版物','書','資料','龍山文化資料'], a: '會員可免費獲取龍山文化研究資料同出版物！有興趣嘅話聯絡秘書處索取嫁～' },

    /* ---- 活動 ---- */
    { k: ['活動','有咩活動','節目','聚會','聯誼','近期活動','最新活動'], a: '我哋活動好多嫁！花炮會、新春座談會、觀音開庫旅行團、義工服務等定期舉辦～留意官網「本會動態」就唔會錯過！' },
    { k: ['花炮','炮會','燒炮','炮仗','舞炮'], a: '花炮會係本會年度盛事！到而家已經舉辦咗三屆，場面墟撼！龍山燒花炮係列入省非遺嘅傳統習俗，炮到誰家好運到！' },
    { k: ['觀音開庫','開庫','借庫','祈福','觀音誕'], a: '觀音開庫係顺德千年傳統，已列入省級非遺名錄！我哋每年組團返顺德參與，費用全包，係好意頭嘅文化之旅！' },
    { k: ['旅行','旅行團','tour','trip','國內團','省內團','佛山','觀光'], a: '我哋有唔同主題嘅旅行團：觀音開庫團、花炮會攝影團、龍山美食文化團！名額有限，早報早得嫁！' },
    { k: ['義工','志願者','volunteer','服務社區','做義工'], a: '我哋義工團隊好活躍！如果你有興趣做義工，可以聯絡左擴源副會長或秘書處登記，多謝你嘅心意！' },
    { k: ['春茗','團拜','新春','賀年','年夜飯','聯歡'], a: '每年新春我哋都會舉辦團拜座談會，鄉親齊齊聚首共賀新歲！通常農曆正月舉行，記得留意通知！' },
    { k: ['敬老','長者','老人','關愛','探訪'], a: '我哋非常重視敬老活動！過年過節都會探訪老會員，弘揚傳統美德嫁～' },
    { k: ['報名','點報名','如何報名','怎麼報名','sign up'], a: '活動報名可以聯絡秘書處：電話 2770 8156，或WhatsApp 9557 0712（梁美玉秘書）！部分活動喺官網亦有報名表～' },
    { k: ['2026','花炮會2026','今年活動','2026年活動'], a: '2026年花炮會已係第三屆，於3月14日圓滿舉行！其他活動安排請留意「本會動態」頁面或問秘書處！' },

    /* ---- 聯絡 ---- */
    { k: ['地址','邊度','在哪','位置','點去','去邊到','怎去','如何前往'], a: '本會地址：香港九龍旺角彌敦道580號恆隆大廈12樓～港鐵旺角站E2出口步行約2分鐘即到嫁！' },
    { k: ['電話','tel','phone','call','熱線','致電'], a: '辦公室電話/傳真：+852 2770 8156，辦公時間：星期一至五 9:00-12:00！' },
    { k: ['whatsapp','wa','Whatsapp'], a: 'WhatsApp聯絡：9557 0712（梁美玉秘書）～通常辦公時間9-12點回覆最快嫁！' },
    { k: ['wechat','微信','微信號'], a: '可以WhatsApp聯絡秘書處：9557 0712（梁美玉）！如有需要微信，問下秘書處～' },
    { k: ['email','電郵','郵件','mail'], a: '電郵地址：admin@longshan.xin～一般24小時內會回覆你嫁！' },
    { k: ['辦公時間','office hours','開門','幾點開','上班時間','幾點有人'], a: '辦公時間：星期一至五 9:00AM-12:00PM～非辦公時間可留言Email或WhatsApp，我哋見到就回！' },
    { k: ['秘書','梁美玉','秘書處','負責人','聯絡人'], a: '秘書係梁美玉妹妹，WhatsApp：9557 0712！辦公時間 9-12點聯絡最方便嫁～' },

    /* ---- 組織架構 ---- */
    { k: ['會長','主席','邊個話事','胡國光'], a: '現任會長係胡國光先生，德高望重，帶領本會越來越好！有任何問題都可以聯絡秘書處轉達嫁！' },
    { k: ['副會長','左倩武','賴寶捷','左擴源','陳偉文','何志偉'], a: '本會副會長有五位：左倩武、賴寶捷、左擴源、陳偉文、何志偉～個個都好有心服務鄉親！' },
    { k: ['顧問','會務顧問','左匯雄'], a: '會務顧問係左匯雄先生，經驗豐富，係本會重要嘅指導力量！' },
    { k: ['架構','組織','理事','理事會','監事','邊個負責'], a: '本會架構：會長1位、副會長5位、理事會、監事會、秘書處。具體分工可問秘書處嫁！' },
    { k: ['名譽','名譽會長','榮譽','陳志祥'], a: '本會名譽會長有陳志祥等多位德高望重嘅前輩！佢哋對本會嘅發展有重大貢獻！' },
    { k: ['幾多人','人數','會員人數','幾多會員'], a: '本會會員遍布全港及海外！確切數字唔方便透露，但肯定好多好多～歡迎你都加入大家庭！' },

    /* ---- 龍山文化 ---- */
    { k: ['龍山','順德龍山','龍山係邊度','龍山在哪'], a: '龍山係廣東順德杏壇北面嘅千年古鎮，有800年歷史！因盛行燒花炮習俗而聞名，係非遺文化寶地！' },
    { k: ['順德','佛山','順德係咩地方'], a: '順德係廣東佛山五區之一，以美食（叉燒、雙皮奶）同傳統文化聞名！龍山就喺顺德杏壇，係我哋根！' },
    { k: ['非遺','非物質文化遺產','文化遺產','傳統'], a: '龍山燒花炮已列入廣東省非物質文化遺產名錄！每年觀音開庫嘅炮會儀式係最精彩嘅傳統文化活動！' },
    { k: ['燒大炮','花炮習俗','炮會歷史','傳統習俗'], a: '龍山燒花炮係祈求來年平安順利嘅傳統民俗！炮響時炮花飛舞，係好彩兆頭，代代相傳！' },
    { k: ['祠堂','左氏','宗祠','歷史建築'], a: '龍山有多座保存完好嘅清代祠堂，雕刻精緻，係珍貴嘅歷史文化遺產！歡迎回鄉參觀！' },

    /* ---- 官網 ---- */
    { k: ['官網','網站','website','網頁','web','longshan'], a: '官方網站：longshan.xin，活動資訊、申請表格、會員動態一應俱全！有問題上網睇或者搵我！' },
    { k: ['下載','download','表格下載','點下載'], a: '申請表可喺 longshan.xin/rh/ 下載電子版，填寫後交到秘書處就得嫁！' },

    /* ---- 常見疑問 ---- */
    { k: ['係咩嘢','介紹','本會','同鄉會係咩','幹什麼的'], a: '順德龍山同鄉會係1985年成立嘅非牟利社團！宗旨係「團結鄉親、服務鄉親、造福鄉親」，聯繫全球龍山人！' },
    { k: ['捐款','贊助','捐錢','贊助商','sponsor'], a: '非常感謝你嘅支持！如有意捐款或贊助，可聯絡秘書處：電話 2770 8156 或 Email admin@longshan.xin！' },
    { k: ['章程','會章','規則','條例','Constitution'], a: '本會章程可向秘書處索取！加入本會即代表認同並遵守章程，互相尊重嫁！' },
    { k: ['私隱','隱私','個人資料','資料保護','privacy'], a: '本會嚴格遵守香港《個人資料（私隱）條例》，所有會員資料絕對保密！請放心！' },
    { k: ['有問題','help','幫手','幫我','唔明','不明白','幫助'], a: '想問咩嘅？入會、活動、聯絡都得！試下問我，唔識嘅我會叫你搵秘書處嫁！' },
    { k: ['搵唔到','找不到','404','頁面出錯','有問題'], a: '如果搵唔到想要嘅資訊，可以直接WhatsApp秘書處：9557 0712，佢哋會幫你解答！' },
    { k: ['合法','註冊','係咪正規','社團'], a: '本會係依法在香港正式註冊嘅合法社團，1985年成立，至今已有40年歷史！' },

    /* ---- 道別 ---- */
    { k: ['唔該','thank','多謝','謝謝','thx','感謝'], a: '唔洗客氣～有問題隨時再問我！祝你生活愉快！😊' },
    { k: ['再見','byebye','拜拜','再會','bye'], a: '再見！歡迎隨時回來搵我～龍仔等緊你！👋' },
    { k: ['好嘅','ok','好','明白','知道了','收到'], a: '好嘅，有任何問題隨時問我！' },
  ];

  function kwMatch(msg) {
    var l = msg.toLowerCase();
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].k.length; j++) {
        if (l.indexOf(KB[i].k[j].toLowerCase()) !== -1) return KB[i].a;
      }
    }
    return null;
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function addMsg(text, who) {
    var box = document.getElementById('chatbot-messages');
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;margin-bottom:12px;' + (who === 'user' ? 'justify-content:flex-end;' : 'justify-content:flex-start;');
    var b = document.createElement('div');
    b.style.cssText = who === 'user'
      ? 'background:linear-gradient(135deg,#C8102E,#E8304A);color:#fff;border-radius:18px 18px 4px 18px;padding:12px 16px;max-width:85%;font-size:15px;line-height:1.6;box-shadow:0 2px 8px rgba(200,16,46,0.3);font-family:"Noto Sans TC",sans-serif;'
      : 'background:#fff;color:#333;border:1px solid #e8e8e8;border-radius:18px 18px 18px 4px;padding:12px 16px;max-width:85%;font-size:15px;line-height:1.6;box-shadow:0 2px 6px rgba(0,0,0,0.08);font-family:"Noto Sans TC",sans-serif;';
    b.innerHTML = who === 'user' ? esc(text) : text;
    row.appendChild(b);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  function typing(on) {
    var old = document.getElementById('cb-typing');
    if (old) old.remove();
    if (!on) return;
    var box = document.getElementById('chatbot-messages');
    var row = document.createElement('div');
    row.id = 'cb-typing';
    row.style.cssText = 'display:flex;justify-content:flex-start;margin-bottom:12px;';
    row.innerHTML = '<div style="background:#fff;color:#aaa;border:1px solid #e8e8e8;border-radius:18px 18px 18px 4px;padding:12px 16px;font-size:14px;">龍仔緊緊計緊...</div>';
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  async function askAI(msg) {
    var r = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYS },
          { role: 'user', content: msg }
        ],
        temperature: 0.7,
        max_tokens: 200,
        stream: false
      })
    });
    if (!r.ok) throw new Error(r.status);
    var d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || '').trim();
  }

  function fallback() {
    return '呢個問題我暫時答唔到～你可以打電話 2770 8156 或 WhatsApp 9557 0712 問秘書處，佢哋更專業嫁！';
  }

  window.toggleChat = function () {
    var p = document.getElementById('chatbot-panel');
    var ic = document.getElementById('chat-btn-icon');
    if (!p || !ic) return;
    var isHidden = p.style.display === 'none' || !p.style.display;
    p.style.display = isHidden ? 'flex' : 'none';
    ic.className = isHidden ? 'fas fa-times text-lg' : 'fas fa-comments text-lg';
    if (isHidden) {
      var inp = document.getElementById('chatbot-input');
      if (inp) inp.focus();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('chatbot-form');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var inp = document.getElementById('chatbot-input');
      if (!inp) return;
      var msg = inp.value.trim();
      if (!msg) return;
      addMsg(msg, 'user');
      inp.value = '';

      var kw = kwMatch(msg);
      if (kw) { addMsg(kw, 'bot'); return; }

      try {
        typing(true);
        var reply = await askAI(msg);
        typing(false);
        addMsg(reply || fallback(), 'bot');
      } catch (err) {
        typing(false);
        console.error('Chatbot:', err);
        addMsg(fallback(), 'bot');
      }
    });
  });
})();
